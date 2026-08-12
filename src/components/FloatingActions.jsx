import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause, Share2 } from "lucide-react";

export default function FloatingActions({ data, copy }) {
  const [playing, setPlaying] = useState(false);
  const [shared, setShared] = useState(false);
  const audio = useRef(null);
  const sharedTimer = useRef(null);

  useEffect(() => {
    const player = audio.current;
    if (!player) return undefined;
    player.volume = 0.02;

    const startMusic = async () => {
      if (window.localStorage.getItem("wedding-music") === "paused") return;
      try {
        await player.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    window.addEventListener("invitation:open", startMusic);
    return () => window.removeEventListener("invitation:open", startMusic);
  }, [data.musicUrl]);

  const confirmShare = () => {
    setShared(true);
    window.clearTimeout(sharedTimer.current);
    sharedTimer.current = window.setTimeout(() => setShared(false), 2200);
  };

  const share = async () => {
    const shareData = {
      title: document.title,
      text: data.socialShareMessage,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        confirmShare();
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${shareData.url}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
    confirmShare();
  };

  const toggleMusic = async () => {
    if (!audio.current) return;
    try {
      if (audio.current.paused) {
        await audio.current.play();
        window.localStorage.setItem("wedding-music", "playing");
        setPlaying(true);
      } else {
        audio.current.pause();
        window.localStorage.setItem("wedding-music", "paused");
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="floating-actions">
      {data.musicUrl && (
        <>
          <audio
            ref={audio}
            src={data.musicUrl}
            preload="metadata"
            loop
            onEnded={() => setPlaying(false)}
          />
          <motion.button
            type="button"
            className="music-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleMusic}
            aria-label={playing ? copy.pauseMusic : copy.playMusic}
          >
            {playing ? (
              <Pause aria-hidden="true" />
            ) : (
              <Music2 aria-hidden="true" />
            )}
          </motion.button>
        </>
      )}
      <motion.button
        type="button"
        className={`share-button ${shared ? "shared" : ""}`}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={share}
        aria-label={copy.share}
      >
        <i>
          <Share2 aria-hidden="true" />
        </i>
        <span>
          <small>{shared ? copy.ready : copy.sendLove}</small>
          {shared ? copy.shared : copy.share}
        </span>
      </motion.button>
    </div>
  );
}
