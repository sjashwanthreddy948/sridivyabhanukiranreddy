import { motion } from "framer-motion";
import { SectionHead } from "../components/Ornaments";

function PersonCard({ person, label, relation, initial, from }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="portrait-mark" aria-hidden="true">
        {initial}
      </div>
      <span>{label}</span>
      <h3>{person.name}</h3>
      {(person.father || person.mother) && (
        <>
          <p>{relation}</p>
          {person.father && <strong>{person.father}</strong>}
          {person.father && person.mother && <i>&amp;</i>}
          {person.mother && <strong>{person.mother}</strong>}
        </>
      )}
    </motion.article>
  );
}

export default function CoupleSection({ data, copy }) {
  return (
    <section id="couple" className="couple section">
      <SectionHead eyebrow={copy.hearts} title={copy.couple} />
      <div className="couple-grid">
        <PersonCard
          person={data.bride}
          label={copy.bride}
          relation={copy.daughter}
          initial="S"
          from={-35}
        />
        <div className="couple-amp" aria-hidden="true">
          &amp;
        </div>
        <PersonCard
          person={data.groom}
          label={copy.groom}
          relation={copy.son}
          initial="B"
          from={35}
        />
      </div>
    </section>
  );
}
