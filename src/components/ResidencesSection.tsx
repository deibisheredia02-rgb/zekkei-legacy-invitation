import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";
import interiorType1 from "@/assets/interior-type1.jpg";
import interiorType3 from "@/assets/interior-type3.jpg";
import interiorType4 from "@/assets/interior-type4.jpg";

const ResidencesSection = () => {
  const { lang } = useLang();
  const t = translations.residences[lang];

  const residences = [
    { type: "Tipo 1", name: t.type1, image: interiorType1, interior: "80 m²", total: "113.54 m²", floors: "1, 2, 3, 4", optional: "Swim-up pool", parking: "1" },
    { type: "Tipo 3", name: t.type3, image: interiorType3, interior: "128.63 m²", total: "185.67 m²", floors: "1, 2, 3, 4", optional: "Private terrace", parking: "2" },
    { type: "Tipo 4", name: t.type4, image: interiorType4, interior: "211.82 m²", total: "303.11 m²", floors: "1, 3, 4", optional: "Private rooftop", parking: "2" },
  ];

  return (
    <section id="residences" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-sand-warm overflow-hidden">
      <div className="absolute top-6 right-6 md:top-8 md:right-12 z-10">
        <div className="font-subhead text-[10px] tracking-[0.2em] uppercase px-5 py-2 rounded-full" style={{ backgroundColor: "hsl(41, 52%, 54%)", color: "hsl(0, 0%, 100%)", whiteSpace: "nowrap" }}>
          {t.badge}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <p className="font-subhead text-gold-dark text-[11px] tracking-[0.3em] uppercase text-center mb-4">{t.marker}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-navy-deep text-4xl md:text-[56px] font-light leading-[1.1] text-center mb-4">
            {t.headline1}<br />{t.headline2}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="font-body italic font-medium text-navy-deep text-lg md:text-xl text-center max-w-2xl mx-auto mb-16">{t.sub}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {residences.map((res, i) => (
            <ScrollReveal key={i} delay={0.1 * i}>
              <div className="rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-2 group" style={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsla(41, 52%, 54%, 0.25)", boxShadow: "0 8px 40px hsla(41, 52%, 54%, 0.08)" }}>
                <div className="p-3">
                  <div className="rounded-[16px] overflow-hidden">
                    <img src={res.image} alt={res.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <p className="font-subhead text-gold-dark text-[10px] tracking-[0.2em] uppercase mb-1">{res.type}</p>
                  <h3 className="font-display text-navy-deep text-2xl mb-4">{res.name}</h3>
                  <div className="space-y-2 font-body text-navy-deep/70 text-[15px] border-t border-gold/10 pt-4">
                    {[
                      [t.interior, res.interior],
                      [t.total, res.total],
                      [t.floors, res.floors],
                      [t.optional, res.optional],
                      [t.parking, res.parking],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between">
                        <span>{label}</span>
                        <span className="text-navy-deep">{val}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#private-access" className="inline-block mt-6 font-subhead text-gold-dark text-[11px] tracking-[0.15em] uppercase transition-colors hover:text-gold">
                    {t.viewCta}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <a href="#private-access" className="btn-ghost-gold px-8 py-4 text-[12px] rounded-lg inline-block" style={{ borderColor: "hsl(35, 61%, 41%)", color: "hsl(35, 61%, 41%)" }}>
              {t.cta}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ResidencesSection;
