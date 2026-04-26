import { Link } from "react-router-dom";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";
import MantaRayLogo from "@/components/MantaRayLogo";

const FooterSection = () => {
  const { lang } = useLang();
  const t = translations.footer[lang];

  return (
    <footer className="relative py-16 md:py-20 px-6 md:px-12" style={{ backgroundColor: "#050505", borderTop: "1px solid hsla(41, 52%, 54%, 0.2)" }}>
      <div className="max-w-[1400px] mx-auto text-center">
        <div className="flex flex-col items-center mb-10">
          <MantaRayLogo size={72} className="text-gold mb-3" />
          <span className="font-display text-gold text-2xl tracking-[0.3em] uppercase">Zekkei</span>
        </div>
        <div className="w-16 h-px bg-gold/30 mx-auto mb-8" />

        <div className="flex flex-wrap justify-center gap-4 font-body text-white-soft/70 text-[16px] mb-8">
          <a href="https://www.zekkeiluxury.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">www.zekkeiluxury.com</a>
          <span className="text-gold/30">·</span>
          <a href="https://instagram.com/zekkeicapcana" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">@zekkeicapcana</a>
        </div>

        <p className="font-body text-white-soft/65 text-[15px] leading-relaxed max-w-2xl mx-auto mb-4">{t.legal}</p>
        <p className="font-body text-white-soft/65 text-[15px] mb-4">© 2026 Zekkei Cap Cana. All rights reserved.</p>

        <Link to="/admin-portal" className="font-subhead text-white-soft/30 text-[10px] tracking-[0.2em] uppercase hover:text-gold/60 transition-colors">
          {t.portal}
        </Link>
      </div>
    </footer>
  );
};

export default FooterSection;
