import ScrollReveal from "./ScrollReveal";
import MantaRayLogo from "./MantaRayLogo";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

const PhilosophySection = () => {
  const { lang } = useLang();
  const t = translations.philosophy[lang];

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-black-deep grain-overlay overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <MantaRayLogo size={600} className="text-gold" opacity={0.06} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-4 relative overflow-hidden">
          <span className="font-display text-gold/15 text-[80px] md:text-[120px] lg:text-[160px] leading-none absolute -top-8 -left-4 select-none">01</span>
          <div className="relative pt-16 md:pt-24">
            <p className="font-subhead text-gold text-[11px] tracking-[0.3em] uppercase">{t.marker}</p>
            <div className="w-px h-20 bg-gold/40 mt-6" />
          </div>
        </div>

        <div className="md:col-span-8">
          <ScrollReveal>
            <h2 className="font-display text-foreground text-3xl md:text-5xl font-light leading-[1.15] mb-8">
              {t.headline1}<br />{t.headline2}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="font-body text-white-soft text-[17px] md:text-[19px] leading-[1.8] space-y-6 mb-12">
              <p>{t.body1}</p>
              <p>{t.body2}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="border-y border-gold/20 py-10 my-8">
              <p className="font-body italic text-gold text-xl md:text-2xl text-center leading-relaxed whitespace-pre-line font-medium">
                "{t.quote}"
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
