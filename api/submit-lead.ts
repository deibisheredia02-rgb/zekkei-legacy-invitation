import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const lead = req.body;
  const score = lead.budget?.includes('2M') ? 95 : lead.budget?.includes('1M') ? 88 : lead.budget?.includes('750') ? 80 : 72;
  const priority = score >= 90 ? 'URGENTE' : score >= 82 ? 'ALTA' : score >= 74 ? 'MEDIA' : 'BAJA';

  // 1. Guardar en Supabase
  const { data: saved, error: supabaseError } = await supabase
    .from('leads')
    .insert([{
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      country: lead.country,
      source: 'Web Form',
      priority,
      score,
      interest: lead.interest || '',
      unit_type: lead.unitType || lead.unit_type || '',
      budget: lead.budget || lead.investmentRange || '',
      hear_about: lead.hearAbout || lead.source || '',
      message: lead.message || '',
      project: lead.project || 'Cap Cana',
    }])
    .select()
    .single();

  if (supabaseError) console.error('Supabase error:', supabaseError);

  // 2. Google Sheets (si está configurado)
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
          nombre: lead.name,
          email: lead.email,
          telefono: lead.phone,
          pais: lead.country,
          proyecto: lead.project || 'Cap Cana',
          interes: lead.interest || '',
          tipoUnidad: lead.unitType || '',
          presupuesto: lead.budget || lead.investmentRange || '',
          fuente: lead.hearAbout || lead.source || '',
          mensaje: lead.message || '',
          prioridad: priority,
          score,
        }),
      });
    } catch (e) {
      console.error('Google Sheets error:', e);
    }
  }

  // 3. Email a Cesar
  try {
    await resend.emails.send({
      from: 'Zekkei Leads <onboarding@resend.dev>',
      to: 'cesarcantillocervantes@zohomail.com',
      subject: `🏡 Nuevo Lead — ${lead.name} | ${lead.project || 'Cap Cana'} | ${priority}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0a0f1e; color: #e8e0d0; padding: 40px; border: 1px solid rgba(193,154,76,0.3);">
          <div style="text-align: center; margin-bottom: 32px;">
            <p style="color: #C9A84C; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; margin: 0;">Zekkei Legacy</p>
            <h1 style="color: #ffffff; font-size: 28px; font-weight: 300; margin: 8px 0;">Nuevo Lead Recibido</h1>
            <span style="background: ${priority === 'URGENTE' ? '#ef4444' : priority === 'ALTA' ? '#f97316' : '#eab308'}; color: white; font-size: 10px; letter-spacing: 2px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase;">${priority} · Score ${score}</span>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            ${[
              ['Nombre', lead.name],
              ['Email', lead.email],
              ['Teléfono', lead.phone],
              ['País', lead.country],
              ['Proyecto', lead.project || 'Cap Cana'],
              ['Interés', lead.interest || '—'],
              ['Tipo de Unidad', lead.unitType || '—'],
              ['Presupuesto', lead.budget || lead.investmentRange || '—'],
              ['Cómo nos conoció', lead.hearAbout || lead.source || '—'],
            ].map(([label, value]) => `
              <tr style="border-bottom: 1px solid rgba(193,154,76,0.15);">
                <td style="padding: 12px 0; color: #C9A84C; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; width: 140px;">${label}</td>
                <td style="padding: 12px 0; color: #e8e0d0; font-size: 15px;">${value}</td>
              </tr>
            `).join('')}
          </table>
          ${lead.message ? `<div style="margin-top: 24px; padding: 20px; background: rgba(193,154,76,0.08); border-left: 2px solid #C9A84C;"><p style="color: #C9A84C; font-size: 10px; letter-spacing: 2px; margin: 0 0 8px;">MENSAJE</p><p style="color: #e8e0d0; font-size: 15px; margin: 0; line-height: 1.6;">${lead.message}</p></div>` : ''}
          <div style="margin-top: 32px; text-align: center; padding-top: 24px; border-top: 1px solid rgba(193,154,76,0.2);">
            <p style="color: #C9A84C; font-size: 10px; letter-spacing: 3px; margin: 0;">ZEKKEI CAP CANA · SISTEMA DE GESTIÓN DE LEADS</p>
          </div>
        </div>
      `,
    });
  } catch (e) {
    console.error('Resend error:', e);
  }

  return res.status(200).json({ success: true, id: saved?.id });
}
