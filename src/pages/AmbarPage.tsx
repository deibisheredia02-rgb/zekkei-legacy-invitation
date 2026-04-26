import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import MantaRayLogo from "@/components/MantaRayLogo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "@/lib/LangContext";
import ambarHero from "@/assets/ambar-hero.jpg";
import ambarExterior from "@/assets/ambar-exterior.jpg";
import ambarInterior from "@/assets/ambar-interior.jpg";
import ambarLobby from "@/assets/ambar-lobby.jpg";
import ambarPool from "@/assets/ambar-pool.jpg";
import ambarFitness from "@/assets/ambar-fitness.jpg";
import ambarLogoLight from "@/assets/ambar-logo-light.png";
import ambarLogoDark from "@/assets/ambar-logo-dark.png";

const t = {
  es: {
    back: '← Volver a Zekkei',
    micro: 'ORLANDO · FLORIDA · APARTMENTS BY MARRIOTT BONVOY',
    headline1: 'Donde el confort',
    headline2: 'se convierte en estilo de vida',
    subline: 'Residencias totalmente amuebladas con diseño moderno. Studios, apartamentos de 1, 2 y 3 dormitorios desde USD $360,000.',
    cta1: 'Solicitar Información',
    cta2: 'Ver Residencias',
    stat1: 'Residencias',
    stat2: 'Torres Contemporáneas',
    stat3: 'Acres de Terreno',
    stat4: 'Desde USD',
    // About
    aboutMarker: 'El Proyecto',
    aboutH1: 'Un nuevo estándar de vida',
    aboutH2: 'residencial en Orlando',
    aboutBody1: 'Ambar Residences Orlando es un nuevo desarrollo residencial en un terreno de 11 acres, compuesto por tres torres contemporáneas con un total de 322 residencias.',
    aboutBody2: 'Ubicado a solo minutos de Walt Disney World®, Ambar combina diseño moderno y estilo de vida resort con el servicio confiable de Apartments by Marriott Bonvoy.',
    aboutQuote: 'Diseño moderno.\nHospitalidad Marriott.\nTu hogar en Orlando.',
    // Residences
    resMarker: 'Las Residencias',
    resH1: 'Tu hogar en Orlando',
    resH2: 'listo para habitar',
    resSub: 'Residencias modernas, totalmente amuebladas, diseñadas con estilo para el confort. Con un número limitado de penthouses disponibles.',
    resFeatures: [
      'Ventanales de piso a techo con luz natural',
      'Acabados contemporáneos por Sixteenfifty Creative Intelligence',
      'Entregadas totalmente amuebladas y listas para habitar',
      'Lavadora/secadora y paquete completo de electrodomésticos',
    ],
    // Types
    studio: 'Studio',
    oneBed: '1 Dormitorio',
    twoBed: '2 Dormitorios',
    threeBed: '3 Dormitorios',
    penthouse: 'Penthouse',
    fromPrice: 'Desde',
    // Amenities
    amenMarker: 'Estilo de Vida Resort',
    amenH1: 'Todos los días se sienten',
    amenH2: 'como vacaciones',
    amenItems: [
      'Piscina Estilo Resort',
      'Centro de Fitness & Bienestar',
      'Spa & Sauna',
      'Restaurante & Bar',
      'Cafetería & Mercado',
      'Yoga & Meditación',
      'Servicio de Limpieza Semanal',
      'Recepción Dedicada',
      'Concierge Internacional',
    ],
    amenNote: 'Administrado por Coury Hospitality, empresa de gestión galardonada.',
    // Location
    locMarker: 'Ubicación Privilegiada',
    locH1: 'Cerca de la magia,',
    locH2: 'lejos del ruido',
    locDist: [
      '8 KM · Walt Disney World®',
      '3 KM · SeaWorld',
      '10 KM · Hollywood Studios',
      '27 KM · Universal Studios',
      '14 KM · Aeropuerto Internacional',
    ],
    // Benefits
    benMarker: 'Beneficios Marriott Bonvoy',
    benH1: 'Una experiencia de propiedad',
    benH2: 'extraordinaria',
    benItems: [
      'Estatus elevado en Marriott Bonvoy',
      'Acceso preferencial a hoteles con tarifas especiales',
      'Alianzas de estilo de vida exclusivas',
      'Reservas de yate con The Ritz-Carlton',
      'Experiencias gastronómicas exclusivas',
      'Servicios de concierge internacional',
    ],
    // Form
    formHeadline1: 'Solicitar',
    formHeadline2: 'Información Exclusiva',
    formBody: 'Nuestros asesores trabajan exclusivamente con compradores calificados. Complete este formulario — un especialista le contactará personalmente en menos de 24 horas.',
    formTrust: ['ESTRICTAMENTE CONFIDENCIAL', 'SIN COMPROMISO', 'ASESOR PERSONAL ASIGNADO', 'APARTMENTS BY MARRIOTT BONVOY'],
    formName: 'Nombre Completo',
    formCountry: 'País de Residencia',
    formEmail: 'Correo Electrónico',
    formPhone: 'WhatsApp / Teléfono',
    formInterest: 'Estoy Interesado En',
    formInterestOpts: ['Residencia Personal', 'Inversión', 'Ambos'],
    formUnit: 'Tipo de Unidad',
    formUnitOpts: ['Studio', '1 Dormitorio', '2 Dormitorios', '3 Dormitorios', 'Penthouse', 'Quiero una recomendación'],
    formBudget: 'Presupuesto',
    formBudgetOpts: ['$360K – $500K', '$500K – $750K', '$750K – $1M', '$1M+', 'Prefiero discutirlo'],
    formSource: '¿Cómo nos conociste?',
    formSourceOpts: ['Instagram', 'Referido', 'Agente Inmobiliario', 'Búsqueda Online', 'Evento', 'Otro'],
    formMessage: 'Tu Mensaje (Opcional)',
    formMessagePlaceholder: 'Cuéntanos sobre el estilo de vida que imaginas...',
    formSubmit: 'ENVIAR — SOLICITAR CONSULTA PRIVADA',
    formSelectCountry: 'Selecciona tu país',
    formSelectUnit: 'Selecciona tipo de unidad',
    formSelectBudget: 'Selecciona rango',
    formSelectSource: 'Selecciona uno',
    formSuccessTitle: 'Tu solicitud ha sido recibida.',
    formSuccessBody: 'Un especialista de Ambar se pondrá en contacto en menos de 24 horas.',
  },
  en: {
    back: '← Back to Zekkei',
    micro: 'ORLANDO · FLORIDA · APARTMENTS BY MARRIOTT BONVOY',
    headline1: 'Where Comfort',
    headline2: 'Becomes a Lifestyle',
    subline: 'Fully furnished residences with modern design. Studios, 1, 2 & 3 bedroom apartments from USD $360,000.',
    cta1: 'Request Information',
    cta2: 'View Residences',
    stat1: 'Residences',
    stat2: 'Contemporary Towers',
    stat3: 'Acres of Land',
    stat4: 'From USD',
    aboutMarker: 'The Project',
    aboutH1: 'A new standard of',
    aboutH2: 'residential living in Orlando',
    aboutBody1: 'Ambar Residences Orlando is a new residential development on 11 acres of land, composed of three contemporary towers with a total of 322 residences.',
    aboutBody2: 'Located just minutes from Walt Disney World®, Ambar combines modern design and resort-style living with the trusted service of Apartments by Marriott Bonvoy.',
    aboutQuote: 'Modern design.\nMarriott hospitality.\nYour home in Orlando.',
    resMarker: 'The Residences',
    resH1: 'Your home in Orlando',
    resH2: 'ready to live in',
    resSub: 'Modern, fully furnished residences designed with style for comfort. With a limited number of penthouses available.',
    resFeatures: [
      'Floor-to-ceiling windows with natural light',
      'Contemporary finishes by Sixteenfifty Creative Intelligence',
      'Delivered fully furnished and ready to move in',
      'Washer/dryer and full appliance package',
    ],
    studio: 'Studio',
    oneBed: '1 Bedroom',
    twoBed: '2 Bedrooms',
    threeBed: '3 Bedrooms',
    penthouse: 'Penthouse',
    fromPrice: 'From',
    amenMarker: 'Resort Lifestyle',
    amenH1: 'Every day feels',
    amenH2: 'like vacation',
    amenItems: [
      'Resort-Style Pool',
      'Fitness & Wellness Center',
      'Spa & Sauna',
      'Restaurant & Bar',
      'Café & Market',
      'Yoga & Meditation',
      'Weekly Housekeeping',
      'Dedicated Front Desk',
      'International Concierge',
    ],
    amenNote: 'Managed by Coury Hospitality, an award-winning management company.',
    locMarker: 'Prime Location',
    locH1: 'Close to the magic,',
    locH2: 'away from the noise',
    locDist: [
      '8 KM · Walt Disney World®',
      '3 KM · SeaWorld',
      '10 KM · Hollywood Studios',
      '27 KM · Universal Studios',
      '14 KM · International Airport',
    ],
    benMarker: 'Marriott Bonvoy Benefits',
    benH1: 'An extraordinary',
    benH2: 'ownership experience',
    benItems: [
      'Elevated Marriott Bonvoy status',
      'Preferred hotel access with special rates',
      'Exclusive lifestyle partnerships',
      'Yacht reservations with The Ritz-Carlton',
      'Exclusive dining experiences',
      'International concierge services',
    ],
    formHeadline1: 'Request',
    formHeadline2: 'Exclusive Information',
    formBody: 'Our advisors work exclusively with qualified buyers. Complete this form — a specialist will contact you personally within 24 hours.',
    formTrust: ['STRICTLY CONFIDENTIAL', 'NO OBLIGATION', 'PERSONAL ADVISOR ASSIGNED', 'APARTMENTS BY MARRIOTT BONVOY'],
    formName: 'Full Name',
    formCountry: 'Country of Residence',
    formEmail: 'Email Address',
    formPhone: 'WhatsApp / Phone',
    formInterest: 'I Am Interested In',
    formInterestOpts: ['Personal Residence', 'Investment', 'Both'],
    formUnit: 'Unit Type',
    formUnitOpts: ['Studio', '1 Bedroom', '2 Bedrooms', '3 Bedrooms', 'Penthouse', 'I want a recommendation'],
    formBudget: 'Budget',
    formBudgetOpts: ['$360K – $500K', '$500K – $750K', '$750K – $1M', '$1M+', 'Prefer to discuss'],
    formSource: 'How Did You Hear About Us?',
    formSourceOpts: ['Instagram', 'Referral', 'Real Estate Agent', 'Online Search', 'Event', 'Other'],
    formMessage: 'Your Message (Optional)',
    formMessagePlaceholder: 'Tell us about the lifestyle you envision...',
    formSubmit: 'SUBMIT — REQUEST PRIVATE CONSULTATION',
    formSelectCountry: 'Select your country',
    formSelectUnit: 'Select unit type',
    formSelectBudget: 'Select range',
    formSelectSource: 'Select one',
    formSuccessTitle: 'Your request has been received.',
    formSuccessBody: 'An Ambar specialist will contact you within 24 hours.',
  },
};

const countries = [
  "United States", "Colombia", "Panama", "Mexico", "Venezuela",
  "Spain", "Argentina", "Brazil", "Canada", "Dominican Republic",
  "Chile", "Peru", "Ecuador", "United Kingdom", "Other"
];

const AmbarPage = () => {
  const { lang, setLang } = useLang();
  const c = t[lang];
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interest, setInterest] = useState("");
  const [form, setForm] = useState({ name: "", country: "", email: "", phone: "", unitType: "", budget: "", source: "", message: "" });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, interest, project: 'Ambar Orlando' }),
      });
    } catch (err) {
      console.error('Lead submission error:', err);
    }
    setFormSubmitted(true);
  };
  const labelClass = "font-subhead text-[#F5A623] text-[10px] tracking-[0.3em] uppercase block mb-2";
  const selectTriggerClass = "w-full bg-transparent border-0 border-b border-[#F5A623]/30 hover:border-[#F5A623]/60 text-foreground font-body text-[16px] py-3 h-auto rounded-none px-0 ring-0 focus:ring-0 shadow-none data-[placeholder]:text-white-soft/30";
  const selectContentClass = "bg-[hsl(220,40%,10%)] border border-[#F5A623]/20 text-foreground";
  const selectItemClass = "font-body text-[15px] text-foreground focus:bg-[#F5A623]/15 focus:text-[#F5A623] cursor-pointer";

  return (
    <div className="overflow-x-hidden" style={{ '--ambar-orange': '#F5A623', '--ambar-dark': '#1A1A1A' } as React.CSSProperties}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black-deep/80 backdrop-blur-md border-b border-[#F5A623]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-subhead text-[10px] tracking-[0.15em] text-white-soft/50 hover:text-gold transition-colors">
              {c.back}
            </Link>
          </div>
          <div className="flex items-center">
            <img src={ambarLogoLight} alt="Ambar" className="w-28 sm:w-36 md:w-44" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0 font-subhead text-[10px] tracking-[0.15em]">
              <button onClick={() => setLang('es')} className={`px-2 py-1 transition-all duration-300 ${lang === 'es' ? 'text-[#F5A623] border-b border-[#F5A623]' : 'text-white-soft/50 hover:text-white-soft'}`}>ES</button>
              <span className="text-[#F5A623]/30 mx-1">|</span>
              <button onClick={() => setLang('en')} className={`px-2 py-1 transition-all duration-300 ${lang === 'en' ? 'text-[#F5A623] border-b border-[#F5A623]' : 'text-white-soft/50 hover:text-white-soft'}`}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay">
        <div className="absolute inset-0">
          <img src={ambarHero} alt="Ambar Residences Orlando" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0.75) 50%, rgba(26,26,26,0.92) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-8 flex-1 flex flex-col justify-center">
          <motion.p className="font-micro text-[#F5A623] text-[9px] md:text-[11px] tracking-[0.2em] sm:tracking-[0.5em] uppercase mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
            {c.micro}
          </motion.p>
          <motion.h1 className="font-display text-foreground text-[40px] sm:text-5xl md:text-7xl lg:text-[88px] font-light leading-[1.1] tracking-[-0.02em] mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
            {c.headline1}<br />{c.headline2}
          </motion.h1>
          <motion.p className="font-body italic text-white-soft text-lg md:text-[22px] leading-relaxed max-w-xl mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
            {c.subline}
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.4 }}>
            <a href="#ambar-contact" className="inline-block px-8 py-4 text-[12px] md:text-[13px] rounded-lg text-center font-subhead uppercase tracking-[0.15em]" style={{ background: 'linear-gradient(90deg, #C9841A, #F5A623, #C9841A)', color: '#1A1A1A' }}>{c.cta1}</a>
            <a href="#ambar-residences" className="inline-block px-8 py-4 text-[12px] md:text-[13px] rounded-lg text-center font-subhead uppercase tracking-[0.15em] border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623]/10 transition-colors">{c.cta2}</a>
          </motion.div>
        </div>
        <motion.div className="relative z-10 border-t border-[#F5A623]/30 backdrop-blur-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.4 }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            {[
              { num: '322', label: c.stat1 },
              { num: '3', label: c.stat2 },
              { num: '11', label: c.stat3 },
              { num: '$360K', label: c.stat4 },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-foreground text-3xl md:text-4xl tabular-nums">{s.num}</p>
                <p className="font-subhead text-[#F5A623] text-[9px] tracking-[0.2em] uppercase mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-black-deep grain-overlay overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2 relative overflow-hidden">
            <span className="font-display text-[80px] md:text-[120px] lg:text-[160px] text-[#F5A623]/10 leading-none select-none absolute -top-8 -left-4">01</span>
            <ScrollReveal>
              <p className="font-subhead text-[#F5A623] text-[11px] tracking-[0.3em] uppercase relative z-10 pt-16">{c.aboutMarker}</p>
              <div className="w-px h-20 bg-[#F5A623]/40 mt-4" />
            </ScrollReveal>
          </div>
          <div className="lg:col-span-3">
            <ScrollReveal>
              <h2 className="font-display text-foreground text-3xl md:text-[48px] font-light leading-[1.15] mb-8">
                {c.aboutH1}<br />{c.aboutH2}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-body text-white-soft text-[18px] leading-[1.8] mb-4">{c.aboutBody1}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="font-body text-white-soft text-[18px] leading-[1.8] mb-10">{c.aboutBody2}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="border-t border-b border-[#F5A623]/30 py-8 my-8">
                <p className="font-body italic text-[#F5A623] text-[22px] md:text-[26px] leading-relaxed text-center whitespace-pre-line">{c.aboutQuote}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Residences */}
      <section id="ambar-residences" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden" style={{ background: '#F5EDD8' }}>
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="font-subhead text-[#C9841A] text-[11px] tracking-[0.3em] uppercase text-center mb-4">{c.resMarker}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-[#1A2540] text-4xl md:text-[52px] font-light leading-[1.1] text-center mb-4">
              {c.resH1}<br />{c.resH2}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="font-body italic font-medium text-[#1A2540] text-[18px] md:text-[20px] text-center max-w-2xl mx-auto mb-16">{c.resSub}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ScrollReveal>
              <img src={ambarInterior} alt="Ambar interior" className="w-full h-80 object-cover rounded-2xl" loading="lazy" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <img src={ambarExterior} alt="Ambar exterior" className="w-full h-80 object-cover rounded-2xl" loading="lazy" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {c.resFeatures.map((f, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div className="bg-white rounded-xl p-6 text-center border border-[#C9841A]/20 hover:-translate-y-1 transition-transform">
                  <p className="font-body text-[#1A2540] text-[15px] leading-relaxed">{f}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Unit Types */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: c.studio, icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
                  <rect x="3" y="9" width="18" height="13" rx="1"/><path d="M3 9l9-6 9 6"/>
                </svg>
              )},
              { name: c.oneBed, icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
                  <path d="M2 9h20v8H2z"/><path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"/><path d="M2 14h20"/>
                </svg>
              )},
              { name: c.twoBed, icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
                  <path d="M2 9h20v8H2z"/><path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"/><path d="M2 14h20"/><path d="M12 9V5"/>
                </svg>
              )},
              { name: c.threeBed, icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
                  <rect x="3" y="9" width="18" height="13" rx="1"/><path d="M3 9l9-6 9 6"/><path d="M9 22V12h6v10"/>
                </svg>
              )},
              { name: c.penthouse, icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
                  <path d="M3 12l9-9 9 9"/><rect x="5" y="12" width="14" height="10"/><path d="M9 22v-6h6v6"/>
                </svg>
              )},
            ].map((u, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div className="bg-white rounded-xl p-5 text-center border border-[#C9841A]/20 hover:border-[#C9841A]/50 transition-all">
                  <span className="mb-2 block text-[#C9841A]">{u.icon}</span>
                  <p className="font-subhead text-[#1A2540] text-[11px] tracking-[0.15em] uppercase">{u.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-black-deep grain-overlay overflow-hidden" style={{ borderTop: '3px solid #F5A623' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={ambarPool} alt="Ambar resort pool" className="w-full h-[500px] object-cover rounded-2xl" loading="lazy" />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <p className="font-subhead text-[#F5A623] text-[11px] tracking-[0.3em] uppercase mb-4">{c.amenMarker}</p>
                <h2 className="font-display text-foreground text-3xl md:text-[48px] font-light leading-[1.1] mb-12">
                  {c.amenH1}<br />{c.amenH2}
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {c.amenItems.map((a, i) => (
                  <ScrollReveal key={i} delay={0.06 * i}>
                    <div className="text-center py-4 px-2 rounded-xl hover:-translate-y-1 transition-transform" style={{ background: 'hsla(33,60%,60%,0.08)', border: '1px solid hsla(33,60%,60%,0.15)' }}>
                      <p className="font-subhead text-[#F5A623] text-[10px] tracking-[0.15em] uppercase">{a}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal delay={0.3}>
                <p className="font-body italic font-medium text-white-soft/90 text-[15px]">{c.amenNote}</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden" style={{ background: '#1A2540' }}>
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="font-subhead text-[#F5A623] text-[11px] tracking-[0.3em] uppercase text-center mb-4">{c.locMarker}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-foreground text-4xl md:text-[52px] font-light leading-[1.1] text-center mb-16">
              {c.locH1}<br />{c.locH2}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-[#F5A623]/20 pt-8 mb-16">
              {c.locDist.map((d, i) => (
                <span key={i} className="font-subhead text-[#F5A623]/70 text-[10px] tracking-[0.15em] uppercase">
                  {d}{i < c.locDist.length - 1 && <span className="ml-6 text-[#F5A623]/30">|</span>}
                </span>
              ))}
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <img src={ambarLobby} alt="Ambar lobby" className="w-full h-72 object-cover rounded-2xl" loading="lazy" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <img src={ambarFitness} alt="Ambar fitness center" className="w-full h-72 object-cover rounded-2xl" loading="lazy" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-black-deep grain-overlay overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <p className="font-subhead text-[#F5A623] text-[11px] tracking-[0.3em] uppercase mb-4">{c.benMarker}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-foreground text-3xl md:text-[48px] font-light leading-[1.1] mb-16">
              {c.benH1}<br />{c.benH2}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {c.benItems.map((b, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div className="rounded-xl p-6 text-center hover:-translate-y-1 transition-transform" style={{ background: 'hsla(33,60%,60%,0.06)', border: '1px solid hsla(33,60%,60%,0.15)' }}>
                  <p className="font-subhead text-[#F5A623] text-[10px] tracking-[0.12em] uppercase mb-2">✓</p>
                  <p className="font-body text-white-soft text-[15px]">{b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="ambar-contact" className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden" style={{ background: '#1A2540', borderTop: '3px solid #F5A623' }}>
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div key="success" className="text-center py-24" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                <img src={ambarLogoLight} alt="Ambar" className="h-24 sm:h-32 md:h-48 mx-auto mb-8 max-w-full" />
                <h3 className="font-display text-foreground text-3xl md:text-[40px] font-light mb-4">{c.formSuccessTitle}</h3>
                <p className="font-body italic text-white-soft text-lg">{c.formSuccessBody}</p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                  <div className="lg:col-span-4">
                    <ScrollReveal>
                      <img src={ambarLogoLight} alt="Ambar" className="h-20 sm:h-32 md:h-40 mb-8 max-w-full" />
                      <h2 className="font-display text-foreground text-3xl md:text-[42px] font-light leading-[1.15] mb-6">
                        {c.formHeadline1}<br />{c.formHeadline2}
                      </h2>
                      <p className="font-body text-white-soft text-[16px] md:text-[17px] leading-relaxed mb-10">{c.formBody}</p>
                      <div className="space-y-4">
                        {c.formTrust.map((s) => (
                          <div key={s} className="flex items-center gap-3">
                            <span className="text-[#F5A623] text-sm">✓</span>
                            <span className="font-subhead text-[#F5A623] text-[10px] tracking-[0.2em] uppercase">{s}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>
                  </div>

                  <div className="lg:col-span-8">
                    <ScrollReveal delay={0.15}>
                      <form onSubmit={handleFormSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className={labelClass}>{c.formName} *</label>
                            <input type="text" required placeholder={c.formName} className="input-luxury" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                          </div>
                          <div>
                            <label className={labelClass}>{c.formCountry} *</label>
                            <Select value={form.country} onValueChange={(val) => setForm({ ...form, country: val })}>
                              <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={c.formSelectCountry} /></SelectTrigger>
                              <SelectContent className={selectContentClass}>
                                {countries.map((co) => <SelectItem key={co} value={co} className={selectItemClass}>{co}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className={labelClass}>{c.formEmail} *</label>
                            <input type="email" required placeholder="your@email.com" className="input-luxury" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                          </div>
                          <div>
                            <label className={labelClass}>{c.formPhone} *</label>
                            <input type="tel" required placeholder="+1 (000) 000-0000" className="input-luxury" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                          </div>
                        </div>

                        <div>
                          <label className={labelClass}>{c.formInterest} *</label>
                          <div className="flex flex-wrap gap-3 mt-2">
                            {c.formInterestOpts.map((opt) => (
                              <button key={opt} type="button" className={`px-5 py-2.5 rounded-lg border text-[11px] font-subhead uppercase tracking-[0.15em] transition-all ${interest === opt ? 'border-[#F5A623] bg-[#F5A623]/15 text-[#F5A623]' : 'border-[#F5A623]/30 text-white-soft/60 hover:border-[#F5A623]/60'}`} onClick={() => setInterest(opt)}>{opt}</button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label className={labelClass}>{c.formUnit}</label>
                            <Select value={form.unitType} onValueChange={(val) => setForm({ ...form, unitType: val })}>
                              <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={c.formSelectUnit} /></SelectTrigger>
                              <SelectContent className={selectContentClass}>
                                {c.formUnitOpts.map((u) => <SelectItem key={u} value={u} className={selectItemClass}>{u}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className={labelClass}>{c.formBudget}</label>
                            <Select value={form.budget} onValueChange={(val) => setForm({ ...form, budget: val })}>
                              <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={c.formSelectBudget} /></SelectTrigger>
                              <SelectContent className={selectContentClass}>
                                {c.formBudgetOpts.map((r) => <SelectItem key={r} value={r} className={selectItemClass}>{r}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className={labelClass}>{c.formSource}</label>
                          <Select value={form.source} onValueChange={(val) => setForm({ ...form, source: val })}>
                            <SelectTrigger className={selectTriggerClass}><SelectValue placeholder={c.formSelectSource} /></SelectTrigger>
                            <SelectContent className={selectContentClass}>
                              {c.formSourceOpts.map((h) => <SelectItem key={h} value={h} className={selectItemClass}>{h}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className={labelClass}>{c.formMessage}</label>
                          <textarea rows={3} placeholder={c.formMessagePlaceholder} className="input-luxury resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                        </div>

                        <button type="submit" className="w-full py-4 text-[13px] md:text-[14px] rounded-lg font-subhead uppercase tracking-[0.2em]" style={{ background: 'linear-gradient(90deg, #C9841A, #F5A623, #C9841A)', color: '#1A1A1A', height: 56 }}>
                          {c.formSubmit}
                        </button>
                      </form>
                    </ScrollReveal>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 text-center" style={{ background: '#050505', borderTop: '1px solid hsla(33,60%,60%,0.2)' }}>
        <img src={ambarLogoLight} alt="Ambar" className="w-48 sm:w-64 md:w-80 mx-auto mb-6" />
        <div className="w-16 h-px bg-[#F5A623]/30 mx-auto mb-6" />
        <p className="font-body text-foreground/50 text-[12px] max-w-2xl mx-auto mb-4">
          Las declaraciones orales no pueden considerarse como representaciones correctas del desarrollador. Los bocetos e ilustraciones son representaciones artísticas.
        </p>
        <p className="font-body text-foreground/50 text-[12px] mb-4">© 2026 Ambar Residences Orlando. Apartments by Marriott Bonvoy.</p>
        <Link to="/" className="font-subhead text-foreground/20 text-[10px] tracking-[0.2em] uppercase hover:text-gold/40 transition-colors">
          Zekkei Cap Cana ←
        </Link>
      </footer>
    </div>
  );
};

export default AmbarPage;
