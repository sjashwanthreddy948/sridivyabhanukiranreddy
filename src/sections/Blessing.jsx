import { motion } from "framer-motion";
import FlowerMark from "../components/FlowerMark";
import { renderLines } from "../utils/content";
import { reveal, revealChild } from "../utils/motion";

export default function Blessing({ copy }) {
  return (
    <motion.section
      id="blessing"
      className="blessing"
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.div variants={revealChild}>
        <FlowerMark />
      </motion.div>
      <motion.p variants={revealChild}>{renderLines(copy.blessing)}</motion.p>
    </motion.section>
  );
}
