export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  source: 'LinkedIn' | 'Instagram' | 'Plataformas' | 'Web Form' | 'Agente IA';
  priority: 'URGENTE' | 'ALTA' | 'MEDIA' | 'BAJA';
  score: number;
  interest: string;
  unitType: string;
  budget: string;
  buyingSignals: string[];
  message: string;
  date: string;
  project?: 'Cap Cana' | 'Ambar Orlando' | 'Ambos';
  agentId?: string;
}

// No mock leads — only real leads from Web Form (localStorage) and AI Agents
export const mockLeads: Lead[] = [];

// ── localStorage Lead Storage ──
const LEADS_STORAGE_KEY = 'zekkei_web_leads';

export function saveLeadToStorage(data: {
  name: string; country: string; email: string; phone: string;
  unitType: string; investmentRange: string; message: string;
  interest: string; hearAbout: string; project: string;
}): void {
  const existing = getStoredLeads();
  const maxId = existing.length > 0 ? Math.max(...existing.map(l => l.id)) : 150;
  const newLead: Lead = {
    id: maxId + 1,
    name: data.name,
    email: data.email,
    phone: data.phone,
    location: data.country,
    source: 'Web Form',
    priority: 'MEDIA',
    score: 72,
    interest: data.interest || 'Información General',
    unitType: data.unitType || '',
    budget: data.investmentRange || '',
    buyingSignals: ['Formulario web', data.hearAbout ? `Fuente: ${data.hearAbout}` : ''].filter(Boolean),
    message: data.message || '',
    date: new Date().toISOString().split('T')[0],
    project: (data.project as Lead['project']) || undefined,
  };
  const updated = [...existing, newLead];
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
}

export function getStoredLeads(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export const mockCampaigns = [
  { id: 1, date: "2026-03-01", type: "LinkedIn", totalLeads: 18, highPriority: 6, avgScore: 84, status: "Completada" },
  { id: 2, date: "2026-02-25", type: "Instagram", totalLeads: 24, highPriority: 8, avgScore: 76, status: "Completada" },
  { id: 3, date: "2026-02-18", type: "Plataformas", totalLeads: 12, highPriority: 4, avgScore: 79, status: "Completada" },
  { id: 4, date: "2026-02-10", type: "LinkedIn", totalLeads: 15, highPriority: 5, avgScore: 82, status: "Completada" },
  { id: 5, date: "2026-02-01", type: "Instagram", totalLeads: 20, highPriority: 7, avgScore: 74, status: "Completada" },
];
