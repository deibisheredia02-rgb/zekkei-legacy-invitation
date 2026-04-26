import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 30;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const AGENT_CONFIG: Record<string, {
  googleSearches: { label: string; query: string }[];
  linkedinSearch: string;
  platform: string;
  icpPrompt: string;
}> = {
  'NEXUS-1': {
    googleSearches: [
      { label: 'CEO/CFO Colombia · Real Estate', query: 'site:linkedin.com/in CEO OR CFO Colombia "real estate" OR "inversión" OR "bienes raíces"' },
      { label: 'Founder Mexico · Inversión', query: 'site:linkedin.com/in Founder OR "Managing Director" Mexico "inversión" OR "private equity" OR "patrimonio"' },
      { label: 'C-Suite Panamá/Perú · Lujo', query: 'site:linkedin.com/in CEO OR President Panama OR Peru "luxury" OR "investment" OR "portafolio"' },
    ],
    linkedinSearch: 'https://www.linkedin.com/search/results/people/?keywords=CEO%20real%20estate%20investment&geoUrn=%5B%22101441606%22%2C%22103323778%22%5D',
    platform: 'LinkedIn',
    icpPrompt: 'Genera 4 perfiles ICP de CEOs/CFOs latinoamericanos con patrimonio $1M+ interesados en diversificación patrimonial en el Caribe. Enfócate en Colombia, México, Panamá.',
  },
  'AURORA-2': {
    googleSearches: [
      { label: 'Instagram · Empresarios lujo Colombia/México', query: 'site:instagram.com CEO OR empresario OR emprendedor Colombia OR Mexico lujo OR luxury OR "bienes raíces"' },
      { label: 'Instagram · Lifestyle LatAm inversiones', query: 'site:instagram.com entrepreneur OR founder Argentina OR Chile OR Panama luxury lifestyle "real estate" OR inversiones' },
      { label: 'Instagram · Influencers alto patrimonio España/Miami', query: 'site:instagram.com "luxury real estate" OR "inversión" Colombia OR Spain OR Miami entrepreneur lifestyle' },
    ],
    linkedinSearch: 'https://www.instagram.com/explore/tags/luxuryrealestate/',
    platform: 'Instagram',
    icpPrompt: 'Genera 4 perfiles ICP de emprendedores latinoamericanos 30-55 años con lifestyle de lujo visible en Instagram (viajes, autos, eventos), con capacidad de inversión $400K+. Incluye el tipo de contenido que publican en Instagram como señal de compra.',
  },
  'ATLAS-3': {
    googleSearches: [
      { label: 'JamesEdition · Compradores Caribe/Florida', query: 'site:jamesedition.com caribbean OR "cap cana" OR "dominican republic" OR florida luxury real estate' },
      { label: 'Mansion Global · Inversionistas LatAm', query: 'site:mansionglobal.com caribbean OR florida luxury real estate "latin america" OR colombia OR mexico buyer' },
      { label: 'Google · Compradores activos $400K+ Caribe', query: '"looking for" OR "busco" "luxury property" OR "propiedad de lujo" Caribbean OR "Cap Cana" OR "Dominican Republic" site:reddit.com OR site:quora.com' },
    ],
    linkedinSearch: 'https://www.jamesedition.com/real_estate/caribbean/',
    platform: 'JamesEdition / Mansion Global / Zillow Luxury',
    icpPrompt: 'Genera 4 perfiles ICP de compradores activos con presupuesto $400K-$2M+ buscando propiedades en el Caribe o Florida. Incluye qué plataformas de real estate consultan y qué buscan específicamente.',
  },
  'HERMES-4': {
    googleSearches: [
      { label: 'LinkedIn · Wealth Managers Colombia/México', query: 'site:linkedin.com/in "wealth manager" OR "banca privada" Colombia OR Mexico OR Panama "alto patrimonio" OR "HNW"' },
      { label: 'LinkedIn · Asesores financieros LatAm', query: 'site:linkedin.com/in "financial advisor" OR "asesor de inversiones" Colombia OR Peru OR Chile OR Argentina' },
      { label: 'LinkedIn · Private Bankers Miami/España · LatAm', query: 'site:linkedin.com/in "private banker" OR "private banking" Miami OR Spain "latin america" OR "latinoamérica"' },
    ],
    linkedinSearch: 'https://www.linkedin.com/search/results/people/?keywords=wealth%20manager%20banca%20privada%20colombia%20mexico',
    platform: 'LinkedIn (red de referidos)',
    icpPrompt: 'Genera 4 perfiles ICP de wealth managers, asesores de banca privada o financial advisors con carteras de clientes de alto patrimonio en LatAm que podrían ser aliados estratégicos para referir inversionistas a Zekkei Cap Cana y Ambar Orlando.',
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { agentId } = req.body;
  const config = AGENT_CONFIG[agentId];
  if (!config) return res.status(400).json({ error: 'Agent not found' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: 'Ejecuta el análisis ahora con perfiles frescos y específicos.' }] }],
      systemInstruction: `Eres un agente de prospección de lujo para Zekkei Cap Cana (Cap Cana RD, desde $450K, retorno 8-12%) y Ambar Residences Orlando (desde $400K).
${config.icpPrompt}
Para cada perfil incluye: nombre realista, cargo exacto, empresa del sector, ciudad y país, score (75-98), señal de compra específica, mensaje personalizado listo para enviar.
Responde SOLO JSON: {"analysis":"análisis estratégico de 2 oraciones","prospects":[{"name":"nombre","title":"cargo","company":"empresa","location":"ciudad, país","score":88,"why":"señal de compra concreta","message_es":"mensaje listo para copiar"}],"strategy":"táctica de contacto"}`,
      generationConfig: { maxOutputTokens: 3000, temperature: 0.8, responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    const jsonMatch = text.replace(/```(?:json)?\n?/g, '').trim().match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    const parsed = JSON.parse(jsonMatch[0]);

    // Attach Google search links to each prospect
    const prospects = (parsed.prospects || []).map((p: Record<string, unknown>, i: number) => ({
      ...p,
      googleSearch: `https://www.google.com/search?q=site:linkedin.com/in+${encodeURIComponent(`"${p.name}" "${p.title}"`)}`,
      linkedinSearch: config.linkedinSearch,
    }));

    // Include all Google search links for the agent
    const searchLinks = config.googleSearches.map(s => ({
      label: s.label,
      url: `https://www.google.com/search?q=${encodeURIComponent(s.query)}`,
    }));

    return res.status(200).json({
      success: true,
      result: { ...parsed, prospects, searchLinks, linkedinSearch: config.linkedinSearch },
    });

  } catch (error) {
    console.error('Agent error:', error);
    return res.status(500).json({ error: 'Agent failed', details: String(error) });
  }
}
