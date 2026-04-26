import ScrollReveal from "./ScrollReveal";
import MantaRayLogo from "./MantaRayLogo";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

const StatementSection = () => {
  const { lang } = useLang();
  const t = translations.statement[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black-deep grain-overlay overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <MantaRayLogo size={800} className="text-gold" opacity={0.08} />
      </div>
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="font-micro text-gold text-[9px] md:text-[11px] tracking-[0.25em] sm:tracking-[0.6em] uppercase mb-8">{t.micro}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <h2 className="font-display text-foreground text-4xl md:text-6xl lg:text-[72px] font-light leading-[1.1] mb-8 gold-shimmer">
            {t.headline1}<br />{t.headline2}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="font-body italic text-white-soft/90 text-lg md:text-[22px] mb-12">
            {t.body1}<br />{t.body2}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <a href="#private-access" className="btn-gold inline-block px-12 py-5 text-[13px] md:text-[15px] rounded-lg min-w-[280px] md:min-w-[320px]">
            {t.cta}
          </a>
        </ScrollReveal>
        <ScrollReveal delay={0.5}>
          <p className="font-body italic font-medium text-white-soft/75 text-[14px] md:text-[15px] mt-8">{t.trust}</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatementSection;
