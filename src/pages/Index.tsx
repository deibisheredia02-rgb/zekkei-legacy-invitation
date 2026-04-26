import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ResidencesSection from "@/components/ResidencesSection";
import CapCanaSection from "@/components/CapCanaSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import BrokersSection from "@/components/BrokersSection";
import StatementSection from "@/components/StatementSection";
import PrivateAccessForm from "@/components/PrivateAccessForm";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/lib/LangContext";
import capCanaMarina from "@/assets/cap-cana-marina.jpg";
import ambarExterior from "@/assets/ambar-exterior.jpg";

const ProjectsOverviewSection = () => {
  const { lang } = useLang();

  const projects = [
    {
      id: "capcana",
      tag: lang === 'es' ? 'República Dominicana' : 'Dominican Republic',
      title: "Zekkei Cap Cana",
      subtitle: lang === 'es' ? 'Residencias frente al mar' : 'Oceanfront Residences',
      description: lang === 'es'
        ? 'Residencias de ultra lujo en Cap Cana. Marina privada, golf de clase mundial y vida resort en el Caribe con rendimientos de inversión superiores.'
        : 'Ultra-luxury residences in Cap Cana. Private marina, world-class golf, and Caribbean resort living with superior investment returns.',
      stats: [
        { value: '4', label: lang === 'es' ? 'Tipos de Unidad' : 'Unit Types' },
        { value: '$400K', label: lang === 'es' ? 'Precio Desde' : 'Starting Price' },
        { value: '8%+', label: lang === 'es' ? 'Rentabilidad Est.' : 'Est. Yield' },
      ],
      highlights: lang === 'es'
        ? ['Marina privada de 300 esloras', 'Campo de golf Jack Nicklaus', 'Playa privada exclusiva', 'Gestión hotelera 5 estrellas']
        : ['Private marina with 300 slips', 'Jack Nicklaus golf course', 'Exclusive private beach', '5-star hotel management'],
      cta: lang === 'es' ? 'Explorar Cap Cana' : 'Explore Cap Cana',
      href: '#residences',
      isExternal: false,
      image: capCanaMarina,
      accent: 'hsl(41,52%,54%)',
    },
    {
      id: "ambar",
      tag: 'Orlando · Florida · USA',
      title: "Ambar Residences",
      subtitle: lang === 'es' ? 'Apartments by Marriott Bonvoy' : 'Apartments by Marriott Bonvoy',
      description: lang === 'es'
        ? 'Residencias modernas en 11 acres a minutos de Walt Disney World®. Tres torres contemporáneas con 322 unidades completamente amuebladas y servicio Marriott.'
        : 'Modern residences on 11 acres, minutes from Walt Disney World®. Three contemporary towers with 322 fully furnished units and Marriott service.',
      stats: [
        { value: '322', label: lang === 'es' ? 'Residencias' : 'Residences' },
        { value: '$360K', label: lang === 'es' ? 'Precio Desde' : 'Starting Price' },
        { value: '3', label: lang === 'es' ? 'Torres Contemporáneas' : 'Contemporary Towers' },
      ],
      highlights: lang === 'es'
        ? ['Administrado por Marriott Bonvoy', 'Totalmente amueblado y listo', 'Studios hasta Penthouses', 'A 8 KM de Walt Disney World®']
        : ['Managed by Marriott Bonvoy', 'Fully furnished & ready', 'Studios to Penthouses', '8 KM from Walt Disney World®'],
      cta: lang === 'es' ? 'Explorar Ambar' : 'Explore Ambar',
      href: '/ambar',
      isExternal: true,
      image: ambarExterior,
      accent: 'hsl(200,60%,55%)',
    },
  ];

  return (
    <section id="projects" className="relative bg-black-deep py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="font-subhead text-gold text-[10px] tracking-[0.3em] uppercase mb-4">
              {lang === 'es' ? 'Nuestro Portafolio' : 'Our Portfolio'}
            </p>
            <h2 className="font-display text-foreground text-4xl md:text-[56px] font-light leading-[1.1] mb-6">
              {lang === 'es' ? 'Dos proyectos.' : 'Two projects.'}<br />
              <span className="gold-shimmer">{lang === 'es' ? 'Una visión de excelencia.' : 'One vision of excellence.'}</span>
            </h2>
            <p className="font-body italic text-white-soft text-lg max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Caribe e interior de Florida. Inversión y estilo de vida. Zekkei selecciona solo lo extraordinario.'
                : 'Caribbean and Central Florida. Investment and lifestyle. Zekkei curates only the extraordinary.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.15}>
              <div className="group relative rounded-2xl overflow-hidden" style={{ border: `1px solid hsla(41,52%,54%,0.15)` }}>
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, hsla(220,40%,8%,0.95))' }} />
                  <div className="absolute top-4 left-4">
                    <span className="font-subhead text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full" style={{ background: 'hsla(0,0%,0%,0.5)', backdropFilter: 'blur(8px)', border: `1px solid ${p.accent}40`, color: p.accent }}>
                      {p.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-display text-foreground text-3xl mb-1">{p.title}</h3>
                    <p className="font-subhead text-[10px] tracking-[0.2em] uppercase" style={{ color: p.accent }}>{p.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6" style={{ background: 'hsla(220,40%,10%,0.8)' }}>
                  <p className="font-body text-white-soft text-[15px] leading-relaxed">{p.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y" style={{ borderColor: 'hsla(41,52%,54%,0.1)' }}>
                    {p.stats.map(s => (
                      <div key={s.label} className="text-center">
                        <p className="font-display text-foreground text-2xl">{s.value}</p>
                        <p className="font-subhead text-[8px] tracking-[0.15em] uppercase mt-1" style={{ color: `${p.accent}99` }}>{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {p.highlights.map(h => (
                      <li key={h} className="flex items-start gap-3 font-body text-white-soft text-[15px]">
                        <span style={{ color: p.accent }} className="mt-0.5 text-xs">✦</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {p.isExternal ? (
                    <Link to={p.href} className="inline-flex items-center gap-2 font-subhead text-[10px] tracking-[0.2em] uppercase py-3 px-6 rounded-lg transition-all duration-300 hover:opacity-80" style={{ background: `${p.accent}20`, border: `1px solid ${p.accent}40`, color: p.accent }}>
                      {p.cta} →
                    </Link>
                  ) : (
                    <a href={p.href} className="inline-flex items-center gap-2 font-subhead text-[10px] tracking-[0.2em] uppercase py-3 px-6 rounded-lg transition-all duration-300 hover:opacity-80" style={{ background: `${p.accent}20`, border: `1px solid ${p.accent}40`, color: p.accent }}>
                      {p.cta} →
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3}>
          <motion.div className="mt-16 text-center p-10 rounded-2xl" style={{ background: 'hsla(220,40%,12%,0.5)', border: '1px solid hsla(41,52%,54%,0.15)' }}>
            <p className="font-subhead text-gold text-[10px] tracking-[0.3em] uppercase mb-3">
              {lang === 'es' ? '¿No sabes cuál elegir?' : "Can't decide which one?"}
            </p>
            <p className="font-display text-foreground text-2xl md:text-3xl font-light mb-6">
              {lang === 'es' ? 'Nuestras asesoras te orientan sin compromiso' : 'Our advisors guide you with no commitment'}
            </p>
            <a href="#private-access" className="btn-gold px-8 py-3 text-[11px] rounded-lg inline-block">
              {lang === 'es' ? 'Solicitar Consulta Privada' : 'Request Private Consultation'}
            </a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <PhilosophySection />
      <ProjectsOverviewSection />
      <ResidencesSection />
      <CapCanaSection />
      <AmenitiesSection />
      <BrokersSection />
      <StatementSection />
      <PrivateAccessForm />
      <FooterSection />
    </div>
  );
};

export default Index;
