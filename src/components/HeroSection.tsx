import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MantaRayLogo from "./MantaRayLogo";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";
import heroImage from "@/assets/hero-night-real.jpg";

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-0 font-subhead text-[10px] tracking-[0.15em]">
      <button
        onClick={() => setLang('es')}
        className={`px-2 py-1 transition-all duration-300 ${lang === 'es' ? 'text-gold border-b border-gold' : 'text-white-soft/50 hover:text-white-soft'}`}
      >
        ES
      </button>
      <span className="text-gold/30 mx-1">|</span>
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 transition-all duration-300 ${lang === 'en' ? 'text-gold border-b border-gold' : 'text-white-soft/50 hover:text-white-soft'}`}
      >
        EN
      </button>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang } = useLang();
  const t = translations.nav[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.residences, href: '#residences' },
    { label: t.amenities, href: '#amenities' },
    { label: t.capCana, href: '#capcana' },
    { label: 'Ambar Orlando', href: '/ambar', isRoute: true },
    { label: t.brokers, href: '#brokers' },
    { label: t.contact, href: '#private-access' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? "bg-black-deep/95 backdrop-blur-md border-b border-gold/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <MantaRayLogo size={40} className="text-gold" />
          <div className="flex items-baseline gap-2">
            <span className="font-display text-foreground text-xl sm:text-2xl tracking-tight gold-shimmer">Zekkei</span>
            <span className="font-subhead text-gold text-[9px] tracking-[0.3em] uppercase hidden sm:block">Cap Cana</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            l.isRoute ? (
              <Link key={l.href} to={l.href} className="font-subhead text-[10px] tracking-[0.15em] uppercase text-white-soft/70 hover:text-gold transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="font-subhead text-[10px] tracking-[0.15em] uppercase text-white-soft/70 hover:text-gold transition-colors">
                {l.label}
              </a>
            )
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangToggle />
          <Link to="/admin-portal" className="btn-gold px-5 py-2 text-[10px] rounded-lg hidden lg:inline-block">
            {t.access}
          </Link>
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menú"
          >
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black-deep/98 border-t border-gold/10 px-6 py-6 space-y-5">
          {links.map((l) => (
            l.isRoute ? (
              <Link key={l.href} to={l.href} onClick={() => setMobileOpen(false)} className="block font-subhead text-[11px] tracking-[0.2em] uppercase text-white-soft/70 hover:text-gold transition-colors py-1">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block font-subhead text-[11px] tracking-[0.2em] uppercase text-white-soft/70 hover:text-gold transition-colors py-1">
                {l.label}
              </a>
            )
          ))}
          <Link to="/admin-portal" onClick={() => setMobileOpen(false)} className="btn-gold inline-block px-6 py-2.5 text-[10px] rounded-lg mt-2">
            {t.access}
          </Link>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  const { lang } = useLang();
  const t = translations.hero[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Zekkei Cap Cana beachfront residence at twilight" className="w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(8,8,8,0.45) 0%, rgba(8,8,8,0.70) 50%, rgba(8,8,8,0.90) 100%)" }} />
      </div>

      <Navbar />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-8 flex-1 flex flex-col justify-center">
        <motion.p className="font-micro text-gold text-[9px] md:text-[11px] tracking-[0.25em] sm:tracking-[0.5em] uppercase mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
          {t.micro}
        </motion.p>

        <motion.h1 className="font-display text-foreground text-[40px] sm:text-5xl md:text-7xl lg:text-[88px] font-light leading-[1.1] tracking-[-0.02em] mb-6 gold-shimmer" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
          {t.headline1}<br />{t.headline2}
        </motion.h1>

        <motion.p className="font-body italic text-white-soft text-lg md:text-[22px] leading-relaxed max-w-xl mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
          {t.subline}
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.4 }}>
          <a href="#private-access" className="btn-gold px-8 py-4 text-[12px] md:text-[13px] rounded-lg text-center">{t.cta1}</a>
          <a href="#residences" className="btn-ghost-gold px-8 py-4 text-[12px] md:text-[13px] rounded-lg text-center">{t.cta2}</a>
        </motion.div>
      </div>

      <motion.div className="relative z-10 border-t border-gold/30 backdrop-blur-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.4 }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-3 gap-8 py-8">
          {[
            { num: "48", label: t.stat1 },
            { num: "4", label: t.stat2 },
            { num: "7", label: t.stat3 },
          ].map((stat, i) => (
            <div key={i} className={`text-center ${i === 2 ? "col-span-2 md:col-span-1" : ""}`}>
              <p className="font-display text-foreground text-4xl md:text-5xl tabular-nums">{stat.num}</p>
              <p className="font-subhead text-gold text-[9px] tracking-[0.2em] uppercase mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent mx-auto" />
      </div>
    </section>
  );
};

export default HeroSection;
