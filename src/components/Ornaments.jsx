import { motion, useReducedMotion } from "framer-motion";

export function Toranam() {
  const reduce = useReducedMotion();
  return (
    <div className="toranam" aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <motion.i
          key={i}
          animate={reduce ? undefined : { rotate: [-2, 2, -2] }}
          transition={
            reduce ? undefined : { duration: 3 + (i % 3), repeat: Infinity }
          }
        />
      ))}
    </div>
  );
}
export function LotusDivider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <b>❧</b>
      <span />
    </div>
  );
}
export function AnimatedPetals() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <motion.i
          key={i}
          style={{ left: `${(i * 37) % 100}%` }}
          initial={{ y: "-10vh", rotate: 0 }}
          animate={{ y: "110vh", x: [0, i % 2 ? 28 : -24, 0], rotate: 260 }}
          transition={{
            duration: 10 + (i % 6),
            repeat: Infinity,
            delay: i * 0.7,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
export function SectionHead({ eyebrow, title, light = false }) {
  return (
    <div className={`section-head ${light ? "light" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <LotusDivider />
    </div>
  );
}
