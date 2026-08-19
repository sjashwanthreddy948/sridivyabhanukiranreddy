import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { AnimatedPetals, Toranam } from "../components/Ornaments";
import { eventById } from "../utils/content";
import { reveal, revealChild } from "../utils/motion";
import { images } from "../data/assets";

export default function Hero({ data, copy }) {
  const wedding = eventById(data, "wedding");
  return (
    <section
      id="home"
      className="hero landscape-hero"
      aria-labelledby="hero-title"
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={images.couplePortrait} />
        <img
          className="landscape-photo"
          src={images.coupleLandscape}
          alt="Sri Divya and Bhanu Kiran together at their wedding venue"
          width="1672"
          height="941"
          fetchPriority="high"
        />
      </picture>
      <div className="landscape-shade" aria-hidden="true" />
      <Toranam />
      <AnimatedPetals />
      <motion.div
        className="hero-content"
        variants={reveal}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={revealChild} className="telugu" lang="te">
          {copy.ganesha}
        </motion.p>
        <motion.p variants={revealChild} className="eyebrow">
          {copy.together}
        </motion.p>
        <motion.h1 id="hero-title" variants={revealChild}>
          {data.bride.shortName}
          <em>&amp;</em>
          {data.groom.shortName}
        </motion.h1>
        {wedding && (
          <motion.div variants={revealChild} className="date-lockup">
            <strong>
              August {wedding.day}
              {wedding.ordinal || ""}
            </strong>
            <i />
            <span>{wedding.time}</span>
          </motion.div>
        )}
        {data.mapUrl && (
          <motion.a
            variants={revealChild}
            className="venue-line"
            href={data.mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${data.venue.name} in Google Maps`}
          >
            <MapPin size={15} aria-hidden="true" />
            {data.venue.name}
          </motion.a>
        )}
      </motion.div>
      <a className="scroll-cue" href="#blessing">
        {copy.scroll} <b aria-hidden="true">↓</b>
      </a>
    </section>
  );
}
