import { motion } from "framer-motion";
import { Globe2, Mail, MessageCircle, Phone } from "lucide-react";
import { SectionHead } from "../components/Ornaments";
import { images } from "../data/assets";

export default function ContactSection({ data, copy }) {
  const business = data.businessContact;
  if (!business?.brand) return null;
  const contact = copy.contact;
  return (
    <section id="contact" className="contact-section section">
      <SectionHead eyebrow={contact.eyebrow} title={contact.title} />
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="contact-brand">
          <img
            src={images.infinityLogo}
            alt="Infinity Customizations"
            width="1774"
            height="887"
            loading="lazy"
          />
          <h3>{business.brand}</h3>
          <p>{contact.text}</p>
        </div>
        <div className="contact-person">
          <small>{contact.founder}</small>
          <strong>{business.founder}</strong>
          {business.phone && (
            <a href={`tel:${business.phone}`}>
              <Phone aria-hidden="true" />
              {business.phone}
            </a>
          )}
          {business.whatsapp && (
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              {copy.whatsapp}
            </a>
          )}
          {business.email && (
            <a href={`mailto:${business.email}`}>
              <Mail aria-hidden="true" />
              {business.email}
            </a>
          )}
          {business.website && (
            <a href={business.website} target="_blank" rel="noreferrer">
              <Globe2 aria-hidden="true" />
              {contact.web}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
