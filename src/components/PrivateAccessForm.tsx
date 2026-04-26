import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MantaRayLogo from "./MantaRayLogo";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";
import { saveLeadToStorage } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
  "United States", "Colombia", "Panama", "Mexico", "Venezuela",
  "Spain", "Argentina", "Brazil", "Canada", "Dominican Republic",
  "Chile", "Peru", "Ecuador", "United Kingdom", "Other"
];

const unitTypes = {
  es: ["Suite Estudio (Tipo 1)", "Suite 1 Hab (Tipo 2)", "Residencia 2 Hab (Tipo 3)", "Suite Premium (Tipo 4-5)", "Quiero una recomendación"],
  en: ["Studio Suite (Type 1)", "1BR Suite (Type 2)", "2BR Residence (Type 3)", "Premium Suite (Type 4-5)", "I want a recommendation"],
};

const investmentRanges = ["$400K – $600K", "$600K – $1M", "$1M – $2M", "$2M+"];

const sources = {
  es: ["Instagram", "Referido", "Agente Inmobiliario", "Búsqueda Online", "Evento", "Otro"],
  en: ["Instagram", "Referral", "Real Estate Agent", "Online Search", "Event", "Other"],
};

const projectOptions = {
  es: ["Zekkei Cap Cana", "Ambar Residences Orlando", "Ambos Proyectos"],
  en: ["Zekkei Cap Cana", "Ambar Residences Orlando", "Both Projects"],
};

const PrivateAccessForm = () => {
  const { lang } = useLang();
  const t = translations.form[lang];
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState("");
  const [project, setProject] = useState("");
  const [form, setForm] = useState({ name: "", country: "", email: "", phone: "", unitType: "", investmentRange: "", hearAbout: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    saveLeadToStorage({ ...form, interest, project });
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, interest, project }),
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    }
    setSubmitted(true);
  };

  const labelClass = "font-subhead text-gold text-[9px] tracking-[0.35em] uppercase block mb-3";
  const fieldClass = "w-full bg-transparent border-0 border-b border-gold/30 focus:border-gold/80 text-foreground font-body text-[16px] py-3 outline-none transition-colors duration-300 placeholder:text-white-soft/30";
  const selectTriggerClass = "w-full bg-transparent border-0 border-b border-gold/30 hover:border-gold/60 text-foreground font-body text-[16px] py-3 h-auto rounded-none px-0 ring-0 focus:ring-0 shadow-none data-[placeholder]:text-white-soft/30";
  const selectContentClass = "bg-[hsl(220,40%,10%)] border border-gold/20 text-foreground";
  const selectItemClass = "font-body text-[15px] text-foreground focus:bg-gold/15 focus:text-gold cursor-pointer";

  return (
    <section id="private-access" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, hsl(220,40%,10%) 0%, hsl(220,40%,14%) 50%, hsl(220,40%,10%) 100%)', borderTop: '1px solid hsla(41,52%,54%,0.3)' }}>

      {/* Decorative radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center top, hsla(41,52%,54%,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" className="text-center py-24" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <MantaRayLogo size={100} className="text-gold mx-auto mb-8" />
              <p className="font-subhead text-gold text-[10px] tracking-[0.4em] uppercase mb-4">{lang === 'es' ? 'Solicitud Recibida' : 'Request Received'}</p>
              <h3 className="font-display text-foreground text-3xl md:text-[44px] font-light mb-4">{t.successTitle}</h3>
              <p className="font-body italic font-medium text-white-soft text-lg">{t.successBody}</p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                {/* Left column */}
                <div className="lg:col-span-4">
                  <ScrollReveal>
                    <MantaRayLogo size={96} className="text-gold mb-8" />
                    <p className="font-subhead text-gold text-[9px] tracking-[0.4em] uppercase mb-5">
                      {lang === 'es' ? 'Acceso Privado' : 'Private Access'}
                    </p>
                    <h2 className="font-display text-foreground text-[36px] md:text-[44px] font-light leading-[1.1] mb-2">
                      {t.headline1}
                    </h2>
                    <h2 className="font-display gold-shimmer text-[36px] md:text-[44px] font-light leading-[1.1] mb-8">
                      {t.headline2}
                    </h2>
                    <div className="w-12 h-px mb-8" style={{ background: 'linear-gradient(90deg, hsl(41,52%,54%), transparent)' }} />
                    <p className="font-body text-white-soft/80 text-[16px] leading-[1.8] mb-10">{t.body}</p>
                    <div className="space-y-5">
                      {t.trust.map((s) => (
                        <div key={s} className="flex items-center gap-4">
                          <span className="text-gold text-xs shrink-0">✦</span>
                          <span className="font-subhead text-white-soft/70 text-[10px] tracking-[0.2em] uppercase">{s}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right column — form */}
                <div className="lg:col-span-8">
                  <ScrollReveal delay={0.15}>
                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <div>
                          <label className={labelClass}>{t.name} *</label>
                          <input type="text" required placeholder={t.name} className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelClass}>{t.country} *</label>
                          <Select value={form.country} onValueChange={(val) => setForm({ ...form, country: val })}>
                            <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={t.selectCountry} /></SelectTrigger>
                            <SelectContent className={selectContentClass}>
                              {countries.map((c) => <SelectItem key={c} value={c} className={selectItemClass}>{c}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className={labelClass}>{t.email} *</label>
                          <input type="email" required placeholder="your@email.com" className={fieldClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelClass}>{t.phone} *</label>
                          <input type="tel" required placeholder="+1 (000) 000-0000" className={fieldClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>{lang === 'es' ? 'Proyecto de Interés' : 'Project of Interest'} *</label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {projectOptions[lang].map((opt) => (
                            <button key={opt} type="button" className={`radio-pill ${project === opt ? "active" : ""}`} onClick={() => setProject(opt)}>{opt}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>{t.interest} *</label>
                        <div className="flex flex-wrap gap-3 mt-2">
                          {t.interestOpts.map((opt) => (
                            <button key={opt} type="button" className={`radio-pill ${interest === opt ? "active" : ""}`} onClick={() => setInterest(opt)}>{opt}</button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <div>
                          <label className={labelClass}>{t.unitType}</label>
                          <Select value={form.unitType} onValueChange={(val) => setForm({ ...form, unitType: val })}>
                            <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={t.selectUnit} /></SelectTrigger>
                            <SelectContent className={selectContentClass}>
                              {unitTypes[lang].map((u) => <SelectItem key={u} value={u} className={selectItemClass}>{u}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className={labelClass}>{t.budget}</label>
                          <Select value={form.investmentRange} onValueChange={(val) => setForm({ ...form, investmentRange: val })}>
                            <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={t.selectRange} /></SelectTrigger>
                            <SelectContent className={selectContentClass}>
                              {investmentRanges.map((r) => <SelectItem key={r} value={r} className={selectItemClass}>{r}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>{t.source}</label>
                        <Select value={form.hearAbout} onValueChange={(val) => setForm({ ...form, hearAbout: val })}>
                          <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={t.selectSource} /></SelectTrigger>
                          <SelectContent className={selectContentClass}>
                            {sources[lang].map((h) => <SelectItem key={h} value={h} className={selectItemClass}>{h}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className={labelClass}>{t.message}</label>
                        <textarea rows={4} placeholder={t.messagePlaceholder} className={`${fieldClass} resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      </div>

                      <div className="pt-2">
                        <button type="submit" className="btn-gold w-full py-5 text-[12px] md:text-[13px] rounded-none tracking-[0.3em]">
                          {t.submit}
                        </button>
                        <p className="font-subhead text-white-soft/30 text-[9px] tracking-[0.2em] uppercase text-center mt-4">
                          {lang === 'es' ? 'Estrictamente confidencial · Sin compromiso' : 'Strictly confidential · No commitment'}
                        </p>
                      </div>
                    </form>
                  </ScrollReveal>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PrivateAccessForm;
