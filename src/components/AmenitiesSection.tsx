import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";
import lobbyImage from "@/assets/lobby-real.jpg";

const amenityIcons = [
  // Spa
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
    <path d="M12 7v5l3 3"/>
  </svg>,
  // Private Screening Room
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
    <polygon points="10,8 16,11 10,14"/>
  </svg>,
  // Gym
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 6.5h11M6.5 17.5h11"/>
    <path d="M3 9.5v5M21 9.5v5"/>
    <path d="M6.5 6.5v11M17.5 6.5v11"/>
  </svg>,
  // Golf Simulator
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="2"/>
    <path d="M12 8v8"/>
    <path d="M8 20h8"/>
    <path d="M6 14c2-1 8-1 12 0"/>
  </svg>,
  // Infinity Pool
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>
    <path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>
    <path d="M7 5l5 4 5-4"/>
  </svg>,
  // Rooftop BBQ Terrace
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15h16"/>
    <path d="M8 15v4M16 15v4"/>
    <path d="M12 3v4"/>
    <path d="M6 9h12a2 2 0 0 1 0 6H6a2 2 0 0 1 0-6z"/>
    <path d="M9 3c0 1.5 1 2 1 3M14 3c0 1.5-1 2-1 3"/>
  </svg>,
  // Game & Social Lounge
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="4"/>
    <path d="M7 12h4M9 10v4"/>
    <circle cx="15" cy="10.5" r="0.8" fill="currentColor"/>
    <circle cx="17.5" cy="13" r="0.8" fill="currentColor"/>
  </svg>,
  // Kids' Entertainment
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>,
  // Children's Play Area
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
];

const AmenitiesSection = () => {
  const { lang } = useLang();
  const t = translations.amenities[lang];

  return (
    <section id="amenities" className="relative bg-navy-deep overflow-hidden" style={{ borderTop: "2px solid hsl(41, 52%, 54%)" }}>
      <div className="flex flex-col lg:flex-row min-h-[80vh]">
        <div className="lg:w-1/2 relative">
          <img src={lobbyImage} alt="Zekkei grand lobby interior" className="w-full h-[50vh] lg:h-full object-cover lg:sticky lg:top-0" loading="lazy" />
        </div>
        <div className="lg:w-1/2 py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="font-subhead text-gold text-[11px] tracking-[0.3em] uppercase mb-4">{t.marker}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-foreground text-3xl md:text-[44px] lg:text-[52px] font-light leading-[1.1] mb-12">
              {t.headline1}<br />{t.headline2}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 mb-12">
            {amenityIcons.map((icon, i) => (
              <ScrollReveal key={i} delay={0.05 * i}>
                <div className="group cursor-default">
                  <div className="w-8 h-8 mb-3 text-gold/70 transition-all duration-300 group-hover:text-gold group-hover:scale-110">
                    {icon}
                  </div>
                  <p className="font-subhead text-gold text-[11px] tracking-[0.15em] uppercase">{t.items[i]}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.4}>
            <p className="font-body italic font-medium text-white-soft/90 text-[16px]">{t.note}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
