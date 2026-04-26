import type { VercelRequest, VercelResponse } from '@vercel/node';

export const maxDuration = 30;

const DATASET_IDS = [
  'qYxhlWPvSRk5ReW7Y',
  '6r1QLX7B2QGv6kTgQ',
  'xiLtTWBb6derBhCDm',
];

const ICP_TITLES = [
  'ceo','cfo','cto','coo','founder','co-founder','cofounder',
  'managing director','managing partner','president','owner',
  'director general','director ejecutivo','director financiero',
  'vp','vice president','vicepresidente',
  'investor','inversionist','emprendedor','entrepreneur',
  'partner','socio','gerente general','chairman',
];

const ICP_LOCATIONS = [
  'colombia','mexico','méxico','panama','panamá','peru','perú',
  'chile','argentina','brazil','brasil','venezuela','ecuador',
  'spain','españa','miami','florida','bogota','bogotá',
  'medellin','medellín','cdmx','lima','santiago','buenos aires',
  'madrid','barcelona','new york','houston','dallas',
];

interface ApifyContact {
  full_name?: string;
  job_title?: string;
  job_company_name?: string;
  location_name?: string;
  work_email?: string | null;
  personal_emails?: string[];
  linkedin_url?: string | null;
  industry?: string | null;
}

function isICP(p: ApifyContact): boolean {
  if (!p.full_name || p.full_name.trim().length < 4) return false;
  const title = (p.job_title || '').toLowerCase();
  const loc = (p.location_name || '').toLowerCase();
  const hasTitle = ICP_TITLES.some(t => title.includes(t));
  const hasLoc = ICP_LOCATIONS.some(l => loc.includes(l));
  return hasTitle && hasLoc;
}

function getEmail(p: ApifyContact): string {
  return p.work_email || (p.personal_emails || [])[0] || '';
}

function scoreContact(p: ApifyContact): number {
  let score = 65;
  const title = (p.job_title || '').toLowerCase();
  if (['ceo','cfo','cto','president','founder'].some(t => title.includes(t))) score += 15;
  else if (['director','vp','managing','owner'].some(t => title.includes(t))) score += 8;
  if (getEmail(p)) score += 10;
  if (p.linkedin_url) score += 5;
  if (p.job_company_name) score += 3;
  return Math.min(score, 96);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.APIFY_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'APIFY_API_KEY not configured' });

  try {
    const allContacts: ApifyContact[] = [];

    for (const datasetId of DATASET_IDS) {
      const r = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?token=${apiKey}&limit=500&fields=full_name,job_title,job_company_name,location_name,work_email,personal_emails,linkedin_url,industry`
      );
      if (r.ok) {
        const data = await r.json();
        allContacts.push(...(Array.isArray(data) ? data : []));
      }
    }

    // Deduplicate by name+email
    const seen = new Set<string>();
    const unique = allContacts.filter(p => {
      const key = `${p.full_name}|${getEmail(p)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Filter by ICP
    const filtered = unique.filter(isICP);

    const leads = filtered.map((p, i) => ({
      id: 500 + i + 1,
      name: p.full_name!.trim().replace(/\b\w/g, c => c.toUpperCase()),
      email: getEmail(p),
      phone: '',
      location: p.location_name || '—',
      source: 'Agente IA' as const,
      priority: (() => {
        const s = scoreContact(p);
        if (s >= 90) return 'URGENTE' as const;
        if (s >= 82) return 'ALTA' as const;
        if (s >= 74) return 'MEDIA' as const;
        return 'BAJA' as const;
      })(),
      score: scoreContact(p),
      interest: (p.job_title || '—') + (p.job_company_name ? ' · ' + p.job_company_name : ''),
      unitType: '',
      budget: '',
      buyingSignals: [
        p.industry ? `Industria: ${p.industry}` : '',
        p.job_company_name ? `Empresa: ${p.job_company_name}` : '',
      ].filter(Boolean),
      message: '',
      date: new Date().toISOString().split('T')[0],
      project: 'Cap Cana' as const,
      linkedin: p.linkedin_url || '',
    }));

    return res.status(200).json({
      success: true,
      total: allContacts.length,
      filtered: leads.length,
      leads,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Import failed', details: String(error) });
  }
}
