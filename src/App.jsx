import { useEffect, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { Radio } from "lucide-react";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import LanguageSwitcher from "./components/LanguageSwitcher";
import FloatingActions from "./components/FloatingActions";
import InvitationCover from "./sections/InvitationCover";
import Hero from "./sections/Hero";
import Blessing from "./sections/Blessing";
import CoupleSection from "./sections/CoupleSection";
import EventSection from "./sections/EventSection";
import WeddingHighlight from "./sections/WeddingHighlight";
import Countdown from "./sections/Countdown";
import VenueSection from "./sections/VenueSection";
import LiveStreamSection from "./sections/LiveStreamSection";
import InvitationSection from "./sections/InvitationSection";
import RSVPSection from "./sections/RSVPSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";
import { translations } from "./data/translationsClean";
import { weddingData } from "./data/weddingData";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [liveMenuOpen, setLiveMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const reduceMotion = useReducedMotion();
  const copy = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setLoading(false),
      reduceMotion ? 150 : 2000,
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    document.body.style.overflow = !loading && !opened ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, opened]);

  const navLabels = [...copy.nav, copy.contactNav];
  const localizedData = {
    ...weddingData,
    bride: { ...weddingData.bride, ...copy.people.bride },
    groom: { ...weddingData.groom, ...copy.people.groom },
    invitedBy: copy.people.invitedBy,
    venue: { name: copy.people.venue, address: copy.people.address },
    socialShareMessage: `${copy.people.bride.shortName} & ${copy.people.groom.shortName}`,
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <AnimatePresence>{loading && <Loader copy={copy} />}</AnimatePresence>
      <AnimatePresence>
        {!loading && !opened && (
          <InvitationCover
            data={localizedData}
            copy={copy}
            onOpen={() => {
              window.dispatchEvent(new Event("invitation:open"));
              setOpened(true);
            }}
          />
        )}
      </AnimatePresence>
      <Nav labels={navLabels} />
      <LanguageSwitcher
        lang={lang}
        setLang={setLang}
        translations={translations}
      />
      {!loading && opened && localizedData.weddingLiveUrl && (
        <div className="watch-live-control">
          <button
            type="button"
            className="watch-live-button"
            onClick={() => setLiveMenuOpen((value) => !value)}
            aria-expanded={liveMenuOpen}
            aria-haspopup="menu"
          >
            <Radio aria-hidden="true" />
            <span>{copy.liveWatch}</span>
          </button>
          {liveMenuOpen && (
            <div className="watch-live-menu" role="menu">
              <a href={localizedData.weddingLiveUrl} target="_blank" rel="noreferrer" role="menuitem">
                {copy.weddingLive}
              </a>
              {localizedData.receptionLiveUrl && (
                <a href={localizedData.receptionLiveUrl} target="_blank" rel="noreferrer" role="menuitem">
                  {copy.receptionLive}
                </a>
              )}
            </div>
          )}
        </div>
      )}
      <main id="main-content">
        <Hero data={localizedData} copy={copy} />
        <Blessing copy={copy} />
        <CoupleSection data={localizedData} copy={copy} />
        <EventSection data={localizedData} copy={copy} />
        <WeddingHighlight data={localizedData} copy={copy} />
        <Countdown data={localizedData} copy={copy} />
        <VenueSection data={localizedData} copy={copy} />
        <LiveStreamSection data={localizedData} copy={copy} />
        <InvitationSection data={localizedData} copy={copy} />
        <RSVPSection data={localizedData} copy={copy} />
        <Footer data={localizedData} copy={copy} />
        <ContactSection data={localizedData} copy={copy} />
      </main>
      <FloatingActions data={localizedData} copy={copy} />
    </>
  );
}
