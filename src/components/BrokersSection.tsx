import ScrollReveal from "./ScrollReveal";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

const BrokersSection = () => {
  const { lang } = useLang();
  const t = translations.brokers[lang];

  const broker = {
    name: "Cesar Cantillo Cervantes",
    ...t.cesar,
    email: "cesarcantillocervantes@zohomail.com",
    phone: "+57 310 767 7429",
    whatsapp: "573107677429",
  };

  return (
    <section id="brokers" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-black-deep grain-overlay overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <p className="font-subhead text-gold text-[11px] tracking-[0.3em] uppercase text-center mb-4">{t.marker}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-foreground text-3xl md:text-[52px] font-light leading-[1.1] text-center mb-16">{t.headline}</h2>
        </ScrollReveal>

        <div className="flex justify-center">
          <ScrollReveal>
            <div className="w-full max-w-xl rounded-2xl p-8 md:p-10 transition-all duration-300 hover:-translate-y-1" style={{ background: "hsla(220, 40%, 18%, 0.6)", backdropFilter: "blur(12px)", border: "1px solid hsla(41, 52%, 54%, 0.2)" }}>
              <p className="font-subhead text-gold text-[10px] tracking-[0.2em] uppercase mb-2">{broker.title}</p>
              <h3 className="font-display text-foreground text-2xl md:text-3xl mb-4">{broker.name}</h3>
              <p className="font-body text-white-soft text-[16px] leading-relaxed mb-6">{broker.bio}</p>

              <div className="space-y-2 font-body text-white-soft/85 text-[15px] mb-8">
                <p>{broker.email}</p>
                <p>{broker.phone}</p>
              </div>

              <a
                href={`https://wa.me/${broker.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-block px-8 py-3 text-[11px] rounded-lg"
              >
                {broker.cta}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default BrokersSection;
