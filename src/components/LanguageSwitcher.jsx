import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";

export default function LanguageSwitcher({ lang, setLang, translations }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (!wrapper.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <div className="language-switcher" ref={wrapper}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((value) => !value)}
        aria-label={translations[lang].chooseLanguage}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Languages aria-hidden="true" />
        {translations[lang].language}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="language-menu"
            role="menu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            {Object.entries(translations).map(([code, value]) => (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={lang === code}
                className={lang === code ? "active" : ""}
                key={code}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
              >
                <b>{value.code}</b>
                {value.language}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
