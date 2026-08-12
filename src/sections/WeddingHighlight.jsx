import { motion } from "framer-motion";
import { LotusDivider } from "../components/Ornaments";
import { eventById, renderLines } from "../utils/content";
import { images } from "../data/assets";

export default function WeddingHighlight({ data, copy }) {
  const wedding = eventById(data, "wedding");
  if (!wedding) return null;
  const venueWords = data.venue.name.split(" ");
  const venueLastLine = venueWords.pop();
  const venueFirstLine = venueWords.join(" ");
  const weddingDate = new Date(
    data.weddingYear,
    (data.weddingMonth || 1) - 1,
    Number(wedding.day),
  );
  const dateContext = weddingDate.toLocaleDateString(copy.locale, {
    weekday: "long",
    month: "long",
    year: "numeric",
  });
  return (
    <section
      className="grand wedding-highlight"
      aria-labelledby="wedding-highlight-title"
    >
      <motion.article
        className="wedding-card"
        initial={{ opacity: 0, y: 45, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="floral-corner floral-top" aria-hidden="true">
          ❀ ✿ ❀ ✿ ❀
        </span>
        <img
          className="wedding-mandap"
          src={images.weddingMandap}
          alt="Traditional golden wedding mandap"
          width="1254"
          height="1254"
          loading="lazy"
        />
        <p className="wedding-script">{copy.wedding}</p>
        <span className="wedding-kicker">{copy.muhurtham}</span>
        <h2 id="wedding-highlight-title">
          {wedding.day}
          {wedding.ordinal || ""}
          {data.weddingYear ? ` ${data.weddingYear}` : ""}
        </h2>
        <p className="wedding-date-context">{dateContext}</p>
        {wedding.time && <div className="time-ribbon">{wedding.time}</div>}
        <h3 className="wedding-venue-name">
          {venueFirstLine && <span>{venueFirstLine}</span>}
          <span>{venueLastLine}</span>
        </h3>
        {data.venue.address && (
          <p className="wedding-address">{data.venue.address}</p>
        )}
        <LotusDivider />
        <p className="wedding-wish">{renderLines(copy.wish)}</p>
        <span className="floral-corner floral-bottom" aria-hidden="true">
          ❀ ✿ ❀ ✿ ❀
        </span>
      </motion.article>
    </section>
  );
}
