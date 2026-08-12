import { MessageCircle, Phone } from "lucide-react";
import { SectionHead } from "../components/Ornaments";
import { renderLines } from "../utils/content";

export default function RSVPSection({ data, copy }) {
  const phone = data.rsvp.phone?.replace(/\D/g, "");
  return (
    <section id="rsvp" className="rsvp section">
      <SectionHead eyebrow={copy.gift} title={copy.celebrate} />
      {data.rsvp.name || phone ? (
        <>
          <p>{data.rsvp.name}</p>
          <div className="action-row">
            {phone && (
              <a className="button" href={`tel:${phone}`}>
                <Phone aria-hidden="true" />
                {copy.call}
              </a>
            )}
            {phone && (
              <a
                className="button outline"
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                {copy.whatsapp}
              </a>
            )}
          </div>
        </>
      ) : (
        <p className="rsvp-note">{renderLines(copy.noReply)}</p>
      )}
    </section>
  );
}
