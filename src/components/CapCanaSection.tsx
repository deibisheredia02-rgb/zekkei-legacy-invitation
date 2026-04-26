import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";
import marinaImage from "@/assets/cap-cana-marina.jpg";

const CapCanaSection = () => {
  const { lang } = useLang();
  const t = translations.capCana[lang];

  const features = [
    { icon: "⚓", title: t.feat1Title, desc: t.feat1Desc },
    { icon: "⛳", title: t.feat2Title, desc: t.feat2Desc },
    { icon: "🏇", title: t.feat3Title, desc: t.feat3Desc },
    { icon: "🌊", title: t.feat4Title, desc: t.feat4Desc },
  ];

  return (
    <section id="capcana" className="relative bg-black-deep grain-overlay">
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={marinaImage} alt="Cap Cana marina at golden sunset" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black-deep" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-28">
        <ScrollReveal>
          <p className="font-subhead text-gold text-[11px] tracking-[0.3em] uppercase text-center mb-4">{t.marker}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-foreground text-4xl md:text-[52px] font-light leading-[1.1] text-center mb-16">
            {t.headline1}<br />{t.headline2}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-20">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={0.12 * i}>
              <div className="text-center group">
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{f.icon}</div>
                <h3 className="font-subhead text-gold text-[12px] tracking-[0.2em] uppercase mb-3">{f.title}</h3>
                <p className="font-body text-white-soft text-[16px] leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-gold/20 pt-8">
            {t.dist.map((d, i) => (
              <span key={i} className="font-subhead text-gold/70 text-[10px] tracking-[0.15em] uppercase">
                {d}{i < t.dist.length - 1 && <span className="ml-6 text-gold/30">|</span>}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CapCanaSection;
