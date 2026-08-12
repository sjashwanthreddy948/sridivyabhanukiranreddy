import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { LotusDivider } from "../components/Ornaments";
import { images } from "../data/assets";
import { eventById } from "../utils/content";

export default function VenueSection({ data, copy }) {
  if (!data.venue?.name) return null;
  const wedding = eventById(data, "wedding");
  const reception = eventById(data, "reception");
  const localizedWedding = copy.events.wedding?.[0] || wedding?.title;
  const localizedReception = copy.events.reception?.[0] || reception?.title;
  const formatEventDate = (event) =>
    new Date(
      data.weddingYear,
      (data.weddingMonth || 1) - 1,
      Number(event.day),
    ).toLocaleDateString(copy.locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return (
    <section id="venue" className="venue-section section">
      <motion.div
        className="venue-card venue-with-photo"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="venue-photo-wrap">
          <motion.img
            src={images.venue}
            alt="Night exterior of Vajra Convention Hall"
            width="1586"
            height="992"
            loading="lazy"
            initial={{ scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          <span>{copy.recognize}</span>
        </div>
        <div className="venue-details">
          <MapPin aria-hidden="true" />
          <span>{copy.weddingVenue}</span>
          <h2>{data.venue.name}</h2>
          {data.venue.address && <p>{data.venue.address}</p>}
          <LotusDivider />
          {(wedding || reception) && (
            <p>
              {wedding &&
                `${localizedWedding} · ${formatEventDate(wedding)}, ${wedding.time}`}
              {wedding && reception && <br />}
              {reception &&
                `${localizedReception} · ${formatEventDate(reception)}, ${reception.time}`}
            </p>
          )}
          {data.mapUrl && (
            <a
              className="button"
              href={data.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin aria-hidden="true" />
              {copy.maps}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
