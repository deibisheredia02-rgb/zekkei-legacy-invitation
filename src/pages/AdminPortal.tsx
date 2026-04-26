import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MantaRayLogo from "@/components/MantaRayLogo";
import { mockLeads, mockCampaigns, getStoredLeads, type Lead } from "@/lib/mockData";
import { supabase } from "@/lib/supabase";

type AdminUser = { name: string; role: string; color: string; phone: string; email: string };

const CESAR: AdminUser = {
  name: 'Cesar Cantillo Cervantes',
  role: 'Asesor Senior · Real Estate Internacional',
  color: '#C9A84C',
  phone: '+573107677429',
  email: 'cesarcantillocervantes@zohomail.com',
};

// ── Login Screen ──
const LoginScreen = ({ onLogin }: { onLogin: (user: AdminUser) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });
    setLoading(false);
    if (authError) {
      setError(true);
      setTimeout(() => setError(false), 600);
    } else {
      onLogin(CESAR);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-deep grain-overlay px-6">
      <div className="w-full max-w-md rounded-2xl p-10 text-center" style={{ background: 'hsla(220,40%,12%,0.8)', backdropFilter: 'blur(16px)', border: '1px solid hsla(41,52%,54%,0.2)' }}>
        <Link to="/" className="inline-block font-subhead text-[10px] tracking-[0.15em] text-white-soft/50 hover:text-gold transition-colors mb-6">← Volver al sitio</Link>
        <MantaRayLogo size={80} className="text-gold mx-auto mb-6" />
        <h1 className="font-display text-gold text-3xl mb-1">Portal Privado Zekkei</h1>
        <p className="font-body text-white-soft/60 text-sm mb-8">Acceso exclusivo para asesores</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={`input-luxury w-full ${error ? 'animate-[shake_0.3s_ease-in-out] !border-destructive' : ''}`}
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className={`input-luxury w-full pr-10 ${error ? 'animate-[shake_0.3s_ease-in-out] !border-destructive' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white-soft/40 hover:text-gold transition-colors text-lg pb-2"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? '🙈' : '👁'}
            </button>
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full py-3 text-[12px] rounded-lg disabled:opacity-50">
            {loading ? 'Verificando...' : 'INGRESAR'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ── Priority badge ──
const PriorityBadge = ({ priority }: { priority: Lead['priority'] }) => {
  const colors: Record<string, string> = {
    URGENTE: 'bg-red-500/20 text-red-400 border-red-500/30',
    ALTA: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    MEDIA: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    BAJA: 'bg-green-500/20 text-green-400 border-green-500/30',
  };
  return <span className={`font-subhead text-[9px] tracking-wider px-3 py-1 rounded-full border ${colors[priority]}`}>{priority}</span>;
};

const SourceBadge = ({ source, leadName }: { source: string; leadName?: string }) => {
  const config: Record<string, { color: string; url: string }> = {
    LinkedIn:     { color: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30', url: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(leadName || '')}` },
    Instagram:    { color: 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30', url: `https://www.instagram.com/explore/` },
    Plataformas:  { color: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30', url: 'https://www.jamesedition.com/real_estate/' },
    'Web Form':   { color: 'bg-emerald-500/20 text-emerald-400', url: '' },
    'Agente IA':  { color: 'bg-violet-500/20 text-violet-400 hover:bg-violet-500/30', url: 'https://app.apollo.io/#/people' },
  };
  const { color, url } = config[source] || { color: 'bg-muted text-muted-foreground', url: '' };
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        className={`font-subhead text-[9px] tracking-wider px-3 py-1 rounded-full transition-all cursor-pointer ${color}`}>
        {source} ↗
      </a>
    );
  }
  return <span className={`font-subhead text-[9px] tracking-wider px-3 py-1 rounded-full ${color}`}>{source}</span>;
};

const ScoreBar = ({ score }: { score: number }) => (
  <div className="flex items-center gap-2">
    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full bg-gold" style={{ width: `${score}%` }} />
    </div>
    <span className="font-body text-white-soft text-[12px]">{score}</span>
  </div>
);

// ── Dashboard Tab ──
const DashboardTab = ({ leads, onCampaign }: { leads: Lead[]; onCampaign: (type: string) => void }) => {
  const urgentCount = leads.filter(l => l.priority === 'URGENTE' || l.priority === 'ALTA').length;
  const avgScore = Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length);
  const thisWeek = leads.filter(l => new Date(l.date) > new Date(Date.now() - 7 * 86400000)).length;

  const metrics = [
    { label: 'Total Leads', value: leads.length },
    { label: 'Alta Prioridad', value: urgentCount },
    { label: 'Score Promedio', value: avgScore },
    { label: 'Leads Esta Semana', value: thisWeek },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="rounded-xl p-6" style={{ background: 'hsla(220,40%,14%,0.6)', border: '1px solid hsla(41,52%,54%,0.15)' }}>
            <p className="font-display text-foreground text-4xl">{m.value}</p>
            <p className="font-subhead text-gold/70 text-[9px] tracking-[0.2em] uppercase mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Acciones Rápidas</p>
        <div className="flex flex-wrap gap-3">
          {['Campaña Completa', 'LinkedIn', 'Instagram', 'Plataformas'].map(t => (
            <button key={t} className="btn-ghost-gold px-4 py-2 text-[10px] rounded-lg" onClick={() => onCampaign(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Leads Recientes</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-gold/10">
              {['Nombre', 'Fuente', 'Prioridad', 'Score'].map(h => (
                <th key={h} className="font-subhead text-gold/50 text-[9px] tracking-[0.15em] uppercase pb-3 pr-4">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {leads.slice(0, 5).map(l => (
                <tr key={l.id} className="border-b border-gold/5 hover:bg-gold/5 transition-colors">
                  <td className="py-3 pr-4 font-body text-foreground text-[14px]">{l.name}</td>
                  <td className="py-3 pr-4"><SourceBadge source={l.source} leadName={l.name} /></td>
                  <td className="py-3 pr-4"><PriorityBadge priority={l.priority} /></td>
                  <td className="py-3"><ScoreBar score={l.score} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Leads Tab ──
const LeadsTab = ({ leads, setLeads }: { leads: Lead[]; setLeads: (l: Lead[]) => void }) => {
  const [filter, setFilter] = useState<string>('TODOS');
  const [sourceFilter, setSourceFilter] = useState<string>('TODOS');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [contactLead, setContactLead] = useState<Lead | null>(null);

  const filtered = leads.filter(l => {
    if (filter !== 'TODOS' && l.priority !== filter) return false;
    if (sourceFilter !== 'TODOS' && l.source !== sourceFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="font-subhead text-gold/50 text-[9px] tracking-[0.15em] uppercase">Prioridad:</span>
        {['TODOS', 'URGENTE', 'ALTA', 'MEDIA', 'BAJA'].map(p => (
          <button key={p} onClick={() => setFilter(p)} className={`font-subhead text-[9px] tracking-wider px-3 py-1 rounded-full border transition-all ${filter === p ? 'border-gold bg-gold/20 text-gold' : 'border-gold/20 text-white-soft/50 hover:border-gold/40'}`}>{p}</button>
        ))}
        <span className="font-subhead text-gold/50 text-[9px] tracking-[0.15em] uppercase ml-4">Fuente:</span>
        {['TODOS', 'LinkedIn', 'Instagram', 'Plataformas'].map(s => (
          <button key={s} onClick={() => setSourceFilter(s)} className={`font-subhead text-[9px] tracking-wider px-3 py-1 rounded-full border transition-all ${sourceFilter === s ? 'border-gold bg-gold/20 text-gold' : 'border-gold/20 text-white-soft/50 hover:border-gold/40'}`}>{s}</button>
        ))}
        <input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="input-luxury ml-auto max-w-[200px] text-[13px] py-2" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-gold/10">
            {['#', 'Nombre', 'Email', 'Teléfono', 'Ubicación', 'Fuente', 'Prioridad', 'Score', 'Acciones'].map(h => (
              <th key={h} className="font-subhead text-gold/50 text-[9px] tracking-[0.15em] uppercase pb-3 pr-3">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b border-gold/5 hover:bg-gold/5 transition-colors group">
                <td className="py-3 pr-3 font-body text-white-soft/50 text-[13px]">{l.id}</td>
                <td className="py-3 pr-3 font-body text-foreground text-[14px]">{l.name}</td>
                <td className="py-3 pr-3 font-body text-white-soft/70 text-[13px]">{l.email}</td>
                <td className="py-3 pr-3 font-body text-white-soft/70 text-[13px]">{l.phone}</td>
                <td className="py-3 pr-3 font-body text-white-soft/70 text-[13px]">{l.location}</td>
                <td className="py-3 pr-3"><SourceBadge source={l.source} leadName={l.name} /></td>
                <td className="py-3 pr-3"><PriorityBadge priority={l.priority} /></td>
                <td className="py-3 pr-3"><ScoreBar score={l.score} /></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedLead(l)} className="text-[12px] hover:text-gold transition-colors">👁</button>
                    <button onClick={() => setContactLead(l)} className="text-[12px] hover:text-gold transition-colors">✉</button>
                    <button onClick={() => setLeads(leads.filter(x => x.id !== l.id))} className="text-[12px] hover:text-destructive transition-colors">🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelectedLead(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-md bg-navy-deep border-l border-gold/20 p-8 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedLead(null)} className="absolute top-4 right-4 text-white-soft/50 hover:text-gold text-xl">✕</button>
            <h3 className="font-display text-foreground text-2xl mb-2">{selectedLead.name}</h3>
            <PriorityBadge priority={selectedLead.priority} />
            <div className="mt-6 space-y-4 font-body text-white-soft text-[14px]">
              <p><span className="text-gold/60">Email:</span> {selectedLead.email}</p>
              <p><span className="text-gold/60">Phone:</span> {selectedLead.phone}</p>
              <p><span className="text-gold/60">Location:</span> {selectedLead.location}</p>
              <p><span className="text-gold/60">Source:</span> {selectedLead.source}</p>
              <p><span className="text-gold/60">Interest:</span> {selectedLead.interest}</p>
              <p><span className="text-gold/60">Unit:</span> {selectedLead.unitType || '—'}</p>
              <p><span className="text-gold/60">Budget:</span> {selectedLead.budget || '—'}</p>
              <p><span className="text-gold/60">Score:</span> {selectedLead.score}</p>
              {selectedLead.message && <p><span className="text-gold/60">Message:</span> {selectedLead.message}</p>}
              <div>
                <span className="text-gold/60">Buying Signals:</span>
                <ul className="list-disc list-inside mt-1">
                  {selectedLead.buyingSignals.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(selectedLead.name.split(' ')[0])}%2C%20le%20escribe%20Cesar%20Cantillo%20de%20Zekkei.%20Me%20gustar%C3%ADa%20presentarle%20nuestra%20colecci%C3%B3n%20exclusiva.%20%C2%BFTiene%20disponibilidad%20esta%20semana%3F`} target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-2 text-[10px] rounded-lg">WhatsApp</a>
              <a href={`mailto:${selectedLead.email}`} className="btn-ghost-gold px-6 py-2 text-[10px] rounded-lg">Email</a>
            </div>
          </div>
        </div>
      )}

      {/* Contact modal */}
      {contactLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setContactLead(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-lg rounded-2xl p-8" style={{ background: 'hsla(220,40%,14%,0.95)', border: '1px solid hsla(41,52%,54%,0.2)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setContactLead(null)} className="absolute top-4 right-4 text-white-soft/50 hover:text-gold text-xl">✕</button>
            <h3 className="font-display text-foreground text-xl mb-4">Contactar a {contactLead.name}</h3>
            <div className="font-body text-white-soft text-[14px] p-4 rounded-lg mb-6" style={{ background: 'hsla(220,40%,10%,0.6)', border: '1px solid hsla(41,52%,54%,0.1)' }}>
              <p>Estimado/a {contactLead.name},</p>
              <br />
              <p>Gracias por su interés en Zekkei Cap Cana. Me gustaría presentarle nuestra colección exclusiva de {contactLead.unitType || 'residencias'}. ¿Le convendría una consulta privada esta semana?</p>
              <br />
              <p>Quedo a su disposición.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { navigator.clipboard.writeText(`Estimado/a ${contactLead.name}...`); }} className="btn-ghost-gold px-6 py-2 text-[10px] rounded-lg">📋 Copiar</button>
              <a href={`https://wa.me/${contactLead.phone.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(contactLead.name.split(' ')[0])}%2C%20le%20escribe%20Cesar%20Cantillo%20de%20Zekkei.%20Gracias%20por%20su%20inter%C3%A9s%20en%20nuestros%20proyectos.%20%C2%BFTiene%20disponibilidad%20para%20una%20consulta%20privada%3F`} target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-2 text-[10px] rounded-lg">WhatsApp</a>
              <a href={`mailto:${contactLead.email}`} className="btn-ghost-gold px-6 py-2 text-[10px] rounded-lg">Email</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Campaigns Tab ──
const CampaignsTab = ({ onCampaign }: { onCampaign: (type: string) => void }) => (
  <div className="space-y-8">
    <div>
      <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Historial de Campañas</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-gold/10">
            {['Fecha', 'Tipo', 'Total Leads', 'Alta Prioridad', 'Score Prom.', 'Estado'].map(h => (
              <th key={h} className="font-subhead text-gold/50 text-[9px] tracking-[0.15em] uppercase pb-3 pr-4">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {mockCampaigns.map(c => (
              <tr key={c.id} className="border-b border-gold/5">
                <td className="py-3 pr-4 font-body text-white-soft text-[13px]">{c.date}</td>
                <td className="py-3 pr-4"><SourceBadge source={c.type} /></td>
                <td className="py-3 pr-4 font-display text-foreground text-lg">{c.totalLeads}</td>
                <td className="py-3 pr-4 font-display text-foreground text-lg">{c.highPriority}</td>
                <td className="py-3 pr-4"><ScoreBar score={c.avgScore} /></td>
                <td className="py-3 pr-4 font-body text-green-400 text-[13px]">✅ {c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Nueva Campaña</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { type: 'LinkedIn', desc: 'Targeting C-suite executives and investors on LinkedIn Sales Navigator.' },
          { type: 'Instagram', desc: 'Luxury lifestyle targeting via Instagram Ads and influencer partnerships.' },
          { type: 'Plataformas', desc: 'Premium real estate platforms: Zillow Luxury, Mansion Global, JamesEdition.' },
        ].map(c => (
          <div key={c.type} className="rounded-xl p-6" style={{ background: 'hsla(220,40%,14%,0.6)', border: '1px solid hsla(41,52%,54%,0.15)' }}>
            <SourceBadge source={c.type} />
            <p className="font-body text-white-soft text-[13px] mt-3 mb-4">{c.desc}</p>
            <button onClick={() => onCampaign(c.type)} className="btn-gold px-4 py-2 text-[10px] rounded-lg w-full">Ejecutar</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Analytics Tab ──
const AnalyticsTab = ({ leads }: { leads: Lead[] }) => {
  const bySrc = { LinkedIn: leads.filter(l => l.source === 'LinkedIn').length, Instagram: leads.filter(l => l.source === 'Instagram').length, Plataformas: leads.filter(l => l.source === 'Plataformas').length };
  const byPri = { URGENTE: leads.filter(l => l.priority === 'URGENTE').length, ALTA: leads.filter(l => l.priority === 'ALTA').length, MEDIA: leads.filter(l => l.priority === 'MEDIA').length, BAJA: leads.filter(l => l.priority === 'BAJA').length };
  const maxSrc = Math.max(...Object.values(bySrc));
  const maxPri = Math.max(...Object.values(byPri));
  const priColors: Record<string, string> = { URGENTE: '#ef4444', ALTA: '#f97316', MEDIA: '#eab308', BAJA: '#22c55e' };

  const funnel = [
    { label: 'Leads Generados', value: leads.length },
    { label: 'Contactados', value: Math.round(leads.length * 0.7) },
    { label: 'Respondieron', value: Math.round(leads.length * 0.45) },
    { label: 'Reunión Agendada', value: Math.round(leads.length * 0.25) },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Source bar chart */}
      <div className="rounded-xl p-6" style={{ background: 'hsla(220,40%,14%,0.6)', border: '1px solid hsla(41,52%,54%,0.15)' }}>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-6">Leads por Fuente</p>
        <div className="space-y-4">
          {Object.entries(bySrc).map(([k, v]) => (
            <div key={k}>
              <div className="flex justify-between mb-1"><span className="font-body text-white-soft text-[13px]">{k}</span><span className="font-display text-foreground">{v}</span></div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-gold transition-all duration-700" style={{ width: `${(v / maxSrc) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority distribution */}
      <div className="rounded-xl p-6" style={{ background: 'hsla(220,40%,14%,0.6)', border: '1px solid hsla(41,52%,54%,0.15)' }}>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-6">Distribución por Prioridad</p>
        <div className="space-y-4">
          {Object.entries(byPri).map(([k, v]) => (
            <div key={k}>
              <div className="flex justify-between mb-1"><span className="font-body text-white-soft text-[13px]">{k}</span><span className="font-display text-foreground">{v}</span></div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${(v / maxPri) * 100}%`, backgroundColor: priColors[k] }} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly trend */}
      <div className="rounded-xl p-6" style={{ background: 'hsla(220,40%,14%,0.6)', border: '1px solid hsla(41,52%,54%,0.15)' }}>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-6">Tendencia Mensual</p>
        <div className="flex items-end gap-4 h-40">
          {[{ m: 'Dic', v: 32 }, { m: 'Ene', v: 45 }, { m: 'Feb', v: 56 }, { m: 'Mar', v: leads.length }].map(d => (
            <div key={d.m} className="flex-1 flex flex-col items-center gap-2">
              <span className="font-display text-foreground text-[14px]">{d.v}</span>
              <div className="w-full rounded-t-lg bg-gold transition-all duration-700" style={{ height: `${(d.v / 60) * 100}%` }} />
              <span className="font-subhead text-gold/50 text-[9px] tracking-wider">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel */}
      <div className="rounded-xl p-6" style={{ background: 'hsla(220,40%,14%,0.6)', border: '1px solid hsla(41,52%,54%,0.15)' }}>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-6">Embudo de Conversión</p>
        <div className="space-y-3">
          {funnel.map((f, i) => (
            <div key={f.label}>
              <div className="flex justify-between mb-1"><span className="font-body text-white-soft text-[13px]">{f.label}</span><span className="font-display text-foreground">{f.value}</span></div>
              <div className="w-full h-6 rounded-lg bg-muted overflow-hidden"><div className="h-full rounded-lg bg-gold/80 transition-all duration-700" style={{ width: `${(f.value / funnel[0].value) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Config Tab ──
const ConfigTab = ({ user }: { user: AdminUser }) => {
  const [minScore, setMinScore] = useState(75);

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Perfil del Broker</p>
        <div className="space-y-4">
          <div><label className="font-subhead text-gold/60 text-[9px] tracking-wider uppercase block mb-1">Nombre</label><input className="input-luxury" defaultValue={user.name} /></div>
          <div><label className="font-subhead text-gold/60 text-[9px] tracking-wider uppercase block mb-1">Rol</label><input className="input-luxury" defaultValue={user.role} /></div>
          <button className="btn-gold px-6 py-2 text-[10px] rounded-lg mt-2">Guardar Cambios</button>
        </div>
      </div>

      <div>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Parámetros de Targeting</p>
        <label className="font-body text-white-soft text-[14px] block mb-2">Score Mínimo: {minScore}</label>
        <input type="range" min={60} max={95} value={minScore} onChange={e => setMinScore(+e.target.value)} className="w-full accent-gold" />
      </div>

      <div>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Notificaciones</p>
        <div className="space-y-3">
          {['Alertas por Email', 'Alertas por WhatsApp'].map(n => (
            <label key={n} className="flex items-center gap-3 font-body text-white-soft text-[14px] cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-gold w-4 h-4" /> {n}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-4">Cambiar Contraseña</p>
        <div className="space-y-4">
          <input type="password" placeholder="Contraseña actual" className="input-luxury" />
          <input type="password" placeholder="Nueva contraseña" className="input-luxury" />
          <input type="password" placeholder="Confirmar contraseña" className="input-luxury" />
          <button className="btn-gold px-6 py-2 text-[10px] rounded-lg">Actualizar Contraseña</button>
        </div>
      </div>
    </div>
  );
};

// ── ICP Definition ──
const ICP = {
  title: 'Perfil de Cliente Ideal (ICP)',
  segments: [
    { label: 'Ejecutivos C-Suite', desc: 'CEOs, CFOs, CTOs de empresas medianas/grandes en LatAm y USA', icon: '🏢' },
    { label: 'Inversionistas HNW', desc: 'Patrimonio neto $1M+. Buscan diversificación en bienes raíces premium', icon: '💎' },
    { label: 'Emprendedores 35-55', desc: 'Dueños de negocios exitosos en Colombia, México, Panamá, Venezuela', icon: '🚀' },
    { label: 'Profesionales Expat', desc: 'Latinoamericanos residentes en USA, España, Canadá buscando retorno', icon: '✈️' },
    { label: 'Inversores Europeos', desc: 'Franceses, españoles, italianos con interés en mercados caribeños', icon: '🇪🇺' },
  ],
  triggers: ['Búsqueda activa de propiedades de lujo', 'Seguimiento de cuentas de lifestyle', 'Visitas a plataformas de real estate', 'Conexiones en redes con agentes inmobiliarios', 'Indicadores de liquidez y diversificación'],
};

// ── Agent definitions ──
type AgentState = 'idle' | 'running' | 'done';

const AGENTS = [
  {
    id: 'nexus',
    name: 'NEXUS-1',
    specialty: 'LinkedIn Intelligence',
    description: 'Analiza LinkedIn Sales Navigator para identificar C-Suite, directivos de finanzas e inversores de alto patrimonio neto con historial de inversiones en bienes raíces.',
    skills: ['C-Suite Targeting', 'Investment Profiling', 'Network Mapping', 'Sales Navigator'],
    targetMarket: 'Ejecutivos y directivos en LatAm, USA y Europa',
    icon: '🔵',
    accentColor: '#3b82f6',
    prospects: [],
  },
  {
    id: 'aurora',
    name: 'AURORA-2',
    specialty: 'Instagram Luxury Targeting',
    description: 'Monitorea Instagram para detectar audiencias de lifestyle de lujo, emprendedores y HNW con engagement en cuentas de viajes, real estate y bienes de lujo.',
    skills: ['Lifestyle Analysis', 'Engagement Scoring', 'Influencer Network', 'Story Analytics'],
    targetMarket: 'Emprendedores y profesionales 30-50 años en LatAm',
    icon: '💫',
    accentColor: '#ec4899',
    prospects: [],
  },
  {
    id: 'atlas',
    name: 'ATLAS-3',
    specialty: 'Real Estate Platform Scout',
    description: 'Rastrea plataformas premium (JamesEdition, Mansion Global, Zillow Luxury) para identificar compradores activos con presupuesto $400K+ buscando propiedades en el Caribe y Florida.',
    skills: ['JamesEdition', 'Mansion Global', 'Zillow Luxury', 'Intent Detection'],
    targetMarket: 'Compradores activos con $400K+ de presupuesto declarado',
    icon: '🌐',
    accentColor: '#8b5cf6',
    prospects: [],
  },
  {
    id: 'hermes',
    name: 'HERMES-4',
    specialty: 'Referral Network Intelligence',
    description: 'Mapea redes de referidos de clientes existentes y conexiones de segundo grado para identificar leads cálidos con alta probabilidad de conversión.',
    skills: ['Network Analysis', 'Referral Tracking', 'Warm Introductions', 'Client Graph'],
    targetMarket: 'Segundo grado de conexión de clientes actuales',
    icon: '🔗',
    accentColor: '#f59e0b',
    prospects: [],
  },
];

// ── Agents Tab ──
const AGENT_ID_MAP: Record<string, string> = {
  nexus: 'NEXUS-1',
  aurora: 'AURORA-2',
  atlas: 'ATLAS-3',
  hermes: 'HERMES-4',
};

const AgentsTab = ({ leads, setLeads }: { leads: Lead[]; setLeads: (l: Lead[]) => void }) => {
  const [agentStates, setAgentStates] = useState<Record<string, AgentState>>({ nexus: 'idle', aurora: 'idle', atlas: 'idle', hermes: 'idle' });
  const [agentResults, setAgentResults] = useState<Record<string, typeof AGENTS[0]['prospects']>>({});
  const [agentAnalysis, setAgentAnalysis] = useState<Record<string, string>>({});
  const [agentErrors, setAgentErrors] = useState<Record<string, string>>({});
  const [agentSearchLinks, setAgentSearchLinks] = useState<Record<string, { label: string; url: string }[]>>({});
  const [importingApify, setImportingApify] = useState(false);
  const [importMsg, setImportMsg] = useState('');
  const [showIcp, setShowIcp] = useState(false);
  const [addedAgents, setAddedAgents] = useState<Set<string>>(new Set());

  const runAgent = async (agentId: string) => {
    setAgentStates(prev => ({ ...prev, [agentId]: 'running' }));
    try {
      const res = await fetch('/api/run-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: AGENT_ID_MAP[agentId] }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        const { prospects, analysis, searchLinks, linkedinSearch } = data.result;
        const mapped = prospects.map((p: { name: string; title: string; company: string; location: string; why: string; score: number; message_es: string; googleSearch?: string; linkedinSearch?: string }) => ({
          name: p.name,
          email: '',
          phone: '',
          location: p.location,
          source: 'Agente IA' as const,
          priority: (p.score >= 90 ? 'URGENTE' : p.score >= 82 ? 'ALTA' : p.score >= 74 ? 'MEDIA' : 'BAJA') as Lead['priority'],
          score: p.score,
          interest: p.title + ' · ' + p.company,
          unitType: '',
          budget: '',
          buyingSignals: [p.why.substring(0, 80)],
          message: p.message_es,
          date: new Date().toISOString().split('T')[0],
          project: 'Cap Cana' as const,
          linkedin: p.googleSearch || linkedinSearch || '',
        }));
        setAgentResults(prev => ({ ...prev, [agentId]: mapped }));
        setAgentAnalysis(prev => ({ ...prev, [agentId]: analysis }));
        setAgentSearchLinks(prev => ({ ...prev, [agentId]: searchLinks || [] }));
      }
    } catch (err) {
      console.error('Agent error:', err);
      setAgentErrors(prev => ({ ...prev, [agentId]: 'Error de conexión. Reintenta.' }));
      setAgentStates(prev => ({ ...prev, [agentId]: 'idle' }));
      return;
    }
    setAgentStates(prev => ({ ...prev, [agentId]: 'done' }));
  };

  const addToLeads = (agentId: string) => {
    const agent = AGENTS.find(a => a.id === agentId)!;
    const prospects = agentResults[agentId] || [];
    const maxId = leads.length > 0 ? Math.max(...leads.map(l => l.id)) : 200;
    const newLeads: Lead[] = prospects.map((p, i) => ({
      ...p,
      id: maxId + i + 1,
      date: new Date().toISOString().split('T')[0],
      agentId,
      buyingSignals: p.buyingSignals || [],
    }));
    setLeads([...leads, ...newLeads]);
    setAddedAgents(prev => new Set([...prev, agentId]));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-1">Sistema de Prospección IA</p>
          <h2 className="font-display text-foreground text-2xl">Agentes Prospectores</h2>
          <p className="font-body text-white-soft/60 text-[13px] mt-1">4 agentes especializados buscando clientes con tu perfil de cliente ideal</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setShowIcp(!showIcp)} className="btn-ghost-gold px-4 py-2 text-[10px] rounded-lg">
            {showIcp ? '✕ Cerrar ICP' : '🎯 Ver Perfil ICP'}
          </button>
          <button
            onClick={async () => {
              setImportingApify(true);
              try {
                const r = await fetch('/api/import-apify', { method: 'POST' });
                const d = await r.json();
                if (d.success && d.leads?.length) {
                  const maxId = leads.length > 0 ? Math.max(...leads.map((l: Lead) => l.id)) : 500;
                  const newLeads = d.leads.map((l: Lead, i: number) => ({ ...l, id: maxId + i + 1 }));
                  setLeads([...leads, ...newLeads]);
                  setImportMsg(`${d.leads.length} contactos importados de ${d.total} en Apify`);
                } else {
                  setImportMsg(d.filtered === 0 ? 'Sin coincidencias ICP en Apify' : d.error || 'Error al importar');
                }
              } catch { setImportMsg('Error de conexión'); }
              setImportingApify(false);
              setTimeout(() => setImportMsg(''), 4000);
            }}
            disabled={importingApify}
            className="px-4 py-2 text-[10px] rounded-lg font-subhead tracking-[0.12em] uppercase transition-all hover:opacity-80 disabled:opacity-40"
            style={{ background: 'hsla(210,60%,20%,0.7)', border: '1px solid hsla(210,60%,40%,0.5)', color: 'hsla(210,80%,75%,1)' }}
          >
            {importingApify ? 'Importando...' : '⬇ Importar de Apify'}
          </button>
          {importMsg && <span className="font-body text-[11px] text-green-400">{importMsg}</span>}
        </div>
      </div>

      {/* ICP Panel */}
      {showIcp && (
        <div className="rounded-xl p-6 space-y-5" style={{ background: 'hsla(220,40%,13%,0.8)', border: '1px solid hsla(41,52%,54%,0.2)' }}>
          <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase">{ICP.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ICP.segments.map(s => (
              <div key={s.label} className="rounded-lg p-4" style={{ background: 'hsla(220,40%,10%,0.6)', border: '1px solid hsla(41,52%,54%,0.1)' }}>
                <span className="text-xl">{s.icon}</span>
                <p className="font-subhead text-foreground text-[11px] tracking-wide mt-2 mb-1">{s.label}</p>
                <p className="font-body text-white-soft/60 text-[12px]">{s.desc}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-subhead text-gold/70 text-[9px] tracking-[0.2em] uppercase mb-2">Señales de Compra Detectadas</p>
            <div className="flex flex-wrap gap-2">
              {ICP.triggers.map(t => (
                <span key={t} className="font-subhead text-[9px] tracking-wide px-3 py-1 rounded-full" style={{ background: 'hsla(41,52%,54%,0.1)', border: '1px solid hsla(41,52%,54%,0.2)', color: 'hsl(41,52%,64%)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Agents Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {AGENTS.map(agent => {
          const state = agentStates[agent.id];
          const results = agentResults[agent.id];
          const isAdded = addedAgents.has(agent.id);
          return (
            <div key={agent.id} className="rounded-xl overflow-hidden" style={{ background: 'hsla(220,40%,13%,0.7)', border: `1px solid ${agent.accentColor}25` }}>
              {/* Agent Header */}
              <div className="p-5 flex items-start justify-between gap-4" style={{ borderBottom: `1px solid ${agent.accentColor}20` }}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{ background: `${agent.accentColor}15` }}>
                    {agent.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-display text-foreground text-lg">{agent.name}</span>
                      <span className="font-subhead text-[8px] tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${agent.accentColor}${state === 'idle' ? '30' : state === 'done' ? '35' : '20'}`, border: `1px solid ${agent.accentColor}${state === 'idle' ? '60' : state === 'done' ? '70' : '30'}`, color: agent.accentColor }}>
                        {state === 'running' ? '⟳ EJECUTANDO' : state === 'done' ? '✓ COMPLETADO' : '● LISTO'}
                      </span>
                    </div>
                    <p className="font-subhead text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: `${agent.accentColor}99` }}>{agent.specialty}</p>
                    <p className="font-body text-white-soft/60 text-[12px] leading-relaxed">{agent.description}</p>
                  </div>
                </div>
              </div>

              {/* Skills + Target */}
              <div className="px-5 py-4 space-y-3" style={{ borderBottom: `1px solid ${agent.accentColor}15` }}>
                <div className="flex flex-wrap gap-1.5">
                  {agent.skills.map(s => (
                    <span key={s} className="font-subhead text-[8px] tracking-wide px-2.5 py-1 rounded-full" style={{ background: `${agent.accentColor}15`, border: `1px solid ${agent.accentColor}30`, color: agent.accentColor }}>{s}</span>
                  ))}
                </div>
                <p className="font-body text-white-soft/50 text-[12px]">🎯 {agent.targetMarket}</p>
              </div>

              {/* Results */}
              {state === 'running' && (
                <div className="px-5 py-4 flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0" style={{ borderColor: agent.accentColor, borderTopColor: 'transparent' }} />
                  <span className="font-body text-white-soft/60 text-[13px]">Analizando perfiles y señales de compra...</span>
                </div>
              )}

              {state === 'done' && results && (
                <div className="px-5 py-4 space-y-3">
                  {agentAnalysis[agent.id] && (
                    <p className="font-body text-white-soft/60 text-[12px] leading-relaxed pb-2 border-b border-gold/10">{agentAnalysis[agent.id]}</p>
                  )}
                  {/* Search links per platform */}
                  {agentSearchLinks[agent.id]?.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="font-subhead text-[8px] tracking-[0.15em] uppercase text-white-soft/40">Buscar prospectos reales →</p>
                      {agentSearchLinks[agent.id].map((link, li) => (
                        <a key={li} href={link.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all hover:opacity-90"
                          style={{ background: `${agent.accentColor}12`, border: `1px solid ${agent.accentColor}30` }}>
                          <span className="font-body text-white-soft/70 text-[11px]">{link.label}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={agent.accentColor} strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      ))}
                    </div>
                  )}
                  <p className="font-subhead text-[9px] tracking-[0.15em] uppercase" style={{ color: agent.accentColor }}>
                    {results.length} Perfiles ICP · Mensaje listo para cada uno
                  </p>
                  {results.map((p: Lead & { linkedin?: string }, i) => (
                    <div key={i} className="rounded-lg p-3 space-y-2" style={{ background: 'hsla(220,40%,10%,0.6)', border: '1px solid hsla(41,52%,54%,0.12)' }}>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-body text-foreground text-[13px] font-medium">{p.name}</span>
                            <PriorityBadge priority={p.priority} />
                          </div>
                          <p className="font-body text-white-soft/60 text-[11px] mt-0.5">{p.interest}</p>
                          <p className="font-body text-white-soft/40 text-[11px]">{p.location}</p>
                        </div>
                        <ScoreBar score={p.score} />
                      </div>

                      {/* Contact info */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.email && (
                          <a href={`mailto:${p.email}`}
                            className="flex items-center gap-1 font-subhead text-[8px] tracking-wide px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                            style={{ background: 'hsla(220,60%,20%,0.6)', border: '1px solid hsla(220,60%,40%,0.4)', color: 'hsla(210,80%,75%,1)' }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                            {p.email}
                          </a>
                        )}
                        {p.phone && (
                          <a href={`tel:${p.phone}`}
                            className="flex items-center gap-1 font-subhead text-[8px] tracking-wide px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                            style={{ background: 'hsla(140,40%,15%,0.6)', border: '1px solid hsla(140,40%,35%,0.4)', color: 'hsla(140,60%,70%,1)' }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17v-.08Z"/></svg>
                            {p.phone}
                          </a>
                        )}
                        {p.linkedin && (
                          <a href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 font-subhead text-[8px] tracking-wide px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                            style={{ background: 'hsla(210,70%,18%,0.7)', border: '1px solid hsla(210,70%,40%,0.5)', color: 'hsla(210,80%,72%,1)' }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                            LinkedIn
                          </a>
                        )}
                        {!p.email && !p.phone && !p.linkedin && (
                          <span className="font-subhead text-[8px] text-white-soft/30 italic">Sin datos de contacto en Apollo</span>
                        )}
                      </div>

                      {/* Message */}
                      {p.message && (
                        <div className="rounded-md p-2.5" style={{ background: 'hsla(220,40%,8%,0.8)', border: '1px solid hsla(41,52%,54%,0.12)' }}>
                          <p className="font-body text-white-soft/60 text-[11px] leading-relaxed line-clamp-3">{p.message}</p>
                          <button
                            onClick={() => navigator.clipboard.writeText(p.message)}
                            className="mt-2 font-subhead text-[8px] tracking-wide px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                            style={{ background: `${agent.accentColor}20`, border: `1px solid ${agent.accentColor}40`, color: agent.accentColor }}
                          >
                            Copiar mensaje →
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action */}
              <div className="px-5 py-4">
                {state === 'idle' && (
                  <button onClick={() => runAgent(agent.id)} className="w-full py-2.5 rounded-lg font-subhead text-[10px] tracking-[0.15em] uppercase transition-all hover:opacity-90" style={{ background: `${agent.accentColor}20`, border: `1px solid ${agent.accentColor}40`, color: agent.accentColor }}>
                    ▶ Ejecutar Agente
                  </button>
                )}
                {state === 'running' && (
                  <div className="w-full py-2.5 rounded-lg font-subhead text-[10px] tracking-[0.15em] uppercase text-center" style={{ background: `${agent.accentColor}10`, border: `1px solid ${agent.accentColor}20`, color: `${agent.accentColor}60` }}>
                    Procesando...
                  </div>
                )}
                {state === 'done' && (
                  <div className="flex gap-2">
                    {!isAdded ? (
                      <button onClick={() => addToLeads(agent.id)} className="flex-1 py-2.5 rounded-lg font-subhead text-[10px] tracking-[0.15em] uppercase transition-all hover:opacity-90" style={{ background: `${agent.accentColor}25`, border: `1px solid ${agent.accentColor}50`, color: agent.accentColor }}>
                        + Agregar a Leads
                      </button>
                    ) : (
                      <span className="flex-1 py-2.5 rounded-lg font-subhead text-[10px] tracking-[0.15em] uppercase text-center text-green-400 bg-green-500/10 border border-green-500/20">
                        ✓ Agregados a Leads
                      </span>
                    )}
                    <button onClick={() => { setAgentStates(prev => ({ ...prev, [agent.id]: 'idle' })); setAgentResults(prev => ({ ...prev, [agent.id]: [] })); }} className="px-4 py-2.5 rounded-lg font-subhead text-[9px] tracking-wide uppercase text-white-soft/40 hover:text-white-soft border border-white/10 transition-all">
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Admin Portal ──
const AdminPortal = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [tab, setTab] = useState('dashboard');
  const [leads, setLeads] = useState<Lead[]>(() => {
    const web = getStoredLeads();
    const webIds = new Set(web.map(l => l.id));
    return [...mockLeads.filter(l => !webIds.has(l.id)), ...web];
  });
  const [campaignResult, setCampaignResult] = useState<string | null>(null);
  const [campaignLoading, setCampaignLoading] = useState(false);

  useEffect(() => {
    // noindex for admin
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) { meta = document.createElement('meta'); (meta as HTMLMetaElement).name = 'robots'; document.head.appendChild(meta); }
    (meta as HTMLMetaElement).content = 'noindex, nofollow';
    return () => { if (meta) (meta as HTMLMetaElement).content = 'index, follow'; };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(CESAR);
    });
  }, []);

  const handleCampaign = (type: string) => {
    setCampaignLoading(true);
    setCampaignResult(null);
    setTimeout(() => {
      const n = Math.floor(Math.random() * 10) + 8;
      setCampaignLoading(false);
      setCampaignResult(`✅ Campaña completada: ${n} leads generados vía ${type}`);
      setTimeout(() => setCampaignResult(null), 5000);
    }, 2000);
  };

  if (!user) return <LoginScreen onLogin={setUser} />;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    )},
    { id: 'leads', label: 'Leads', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )},
    { id: 'agentes', label: 'Agentes IA', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>
    )},
    { id: 'campaigns', label: 'Campañas', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2"/><path d="M12 2v2"/></svg>
    )},
    { id: 'analytics', label: 'Analytics', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    )},
    { id: 'config', label: 'Config', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-black-deep grain-overlay flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-gold/10 py-6 px-4" style={{ background: 'hsla(220,40%,10%,0.8)' }}>
        <div className="flex items-center gap-2 mb-10 px-2">
          <MantaRayLogo size={28} className="text-gold" />
          <span className="font-display text-foreground text-lg">Zekkei</span>
        </div>
        <nav className="space-y-1 flex-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-subhead text-[10px] tracking-[0.1em] uppercase transition-all ${tab === t.id ? 'bg-gold/15 text-gold border-l-2 border-gold' : 'text-white-soft/50 hover:text-white-soft hover:bg-gold/5'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-gold/10">
          {/* Mobile tabs */}
          <div className="flex md:hidden gap-2 overflow-x-auto">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`p-2 rounded-lg text-white-soft/50 ${tab === t.id ? 'bg-gold/15 text-gold' : ''}`}>{t.icon}</button>
            ))}
          </div>
          <div className="hidden md:block">
            <p className="font-display text-foreground text-lg">Bienvenido, {user.name.split(' ')[0]}</p>
            <p className="font-body text-white-soft/50 text-[12px]">{user.role}</p>
          </div>
          <a href="/" className="font-subhead text-[10px] tracking-[0.15em] text-white-soft/50 hover:text-gold transition-colors mr-4">← Sitio Web</a>
          <button onClick={() => { supabase.auth.signOut(); setUser(null); }} className="btn-ghost-gold px-4 py-1.5 text-[9px] rounded-lg">Cerrar Sesión</button>
        </header>

        {/* Campaign result toast */}
        {campaignLoading && (
          <div className="mx-6 md:mx-8 mt-4 p-4 rounded-lg flex items-center gap-3" style={{ background: 'hsla(41,52%,54%,0.1)', border: '1px solid hsla(41,52%,54%,0.2)' }}>
            <MantaRayLogo size={24} className="text-gold animate-spin" />
            <span className="font-body text-gold text-[14px]">Ejecutando campaña...</span>
          </div>
        )}
        {campaignResult && (
          <div className="mx-6 md:mx-8 mt-4 p-4 rounded-lg" style={{ background: 'hsla(120,40%,20%,0.2)', border: '1px solid hsla(120,40%,40%,0.3)' }}>
            <span className="font-body text-green-400 text-[14px]">{campaignResult}</span>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {tab === 'dashboard' && <DashboardTab leads={leads} onCampaign={handleCampaign} />}
          {tab === 'leads' && <LeadsTab leads={leads} setLeads={setLeads} />}
          {tab === 'agentes' && <AgentsTab leads={leads} setLeads={setLeads} />}
          {tab === 'campaigns' && <CampaignsTab onCampaign={handleCampaign} />}
          {tab === 'analytics' && <AnalyticsTab leads={leads} />}
          {tab === 'config' && <ConfigTab user={user} />}
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
