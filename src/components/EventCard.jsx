import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { LotusDivider } from "./Ornaments";

function addCalendarReminder(details) {
  const clean = (value = "") =>
    String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,");
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Infinity Customizations//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${details.id}-202608@wedding-invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;TZID=Asia/Kolkata:${details.start}`,
    `DTEND;TZID=Asia/Kolkata:${details.end}`,
    `SUMMARY:${clean(details.title)}`,
    `LOCATION:${clean(details.location)}`,
    `DESCRIPTION:${clean(details.description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${clean(details.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([calendar], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${details.id}-reminder.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function EventCard({ event, index, dateLabel, reminder, reminderLabel }) {
  return (
    <motion.article
      id={event.id === "wedding" ? "wedding" : undefined}
      className={`event-card ${event.tone}`}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
    >
      <div className="event-number">{event.day}</div>
      <p className="event-date-label">{dateLabel}</p>
      <div className="event-ornament" aria-hidden="true">
        ✦
      </div>
      <h3>{event.title}</h3>
      <LotusDivider />
      {event.time && <p className="event-time">{event.time}</p>}
      {event.venue && <p className="event-venue">{event.venue}</p>}
      {event.note && <p className="event-note">{event.note}</p>}
      {reminder && (
        <button
          type="button"
          className="reminder-button"
          onClick={() => addCalendarReminder(reminder)}
        >
          <CalendarPlus aria-hidden="true" />
          {reminderLabel}
        </button>
      )}
    </motion.article>
  );
}
