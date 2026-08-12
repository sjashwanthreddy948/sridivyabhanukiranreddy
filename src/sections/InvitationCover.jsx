import { motion } from "framer-motion";
import FlowerMark from "../components/FlowerMark";
import { reveal, revealChild } from "../utils/motion";
import { images } from "../data/assets";

export default function InvitationCover({ data, copy, onOpen }) {
  return (
    <motion.section
      className="invitation-cover"
      aria-label="Wedding invitation cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flower-canopy" aria-hidden="true">
        {Array.from({ length: 15 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="cover-mandala" aria-hidden="true" />
      <motion.div
        className="cover-content"
        variants={reveal}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={revealChild}>
          <FlowerMark />
        </motion.div>
        <motion.p variants={revealChild} className="cover-blessing">
          {copy.ganesha}
        </motion.p>
        <motion.div
          variants={revealChild}
          className="cover-flourish"
          aria-hidden="true"
        >
          ⌒ ◇ ⌒
        </motion.div>
        <motion.p variants={revealChild} className="cover-invite">
          {copy.invited}
        </motion.p>
        <motion.h1 variants={revealChild}>
          <span>
            {data.bride.shortName} <em>&amp;</em>
          </span>
          <span>{data.groom.shortName}</span>
        </motion.h1>
        <motion.button
          type="button"
          variants={revealChild}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
        >
          {copy.open}
        </motion.button>
      </motion.div>
      <motion.img
        className="cover-temple-image"
        src={images.gopuram}
        alt="Traditional South Indian gopuram"
        width="1230"
        height="1278"
        initial={{ opacity: 0, y: 180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.img
        className="cover-cow-bushes"
        src={images.cowAndBushes}
        alt="Decorative sacred cow beside garden bushes"
        width="1536"
        height="1024"
        initial={{ opacity: 0, y: 130 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.section>
  );
}
