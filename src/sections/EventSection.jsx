import EventCard from "../components/EventCard";
import { SectionHead } from "../components/Ornaments";

export default function EventSection({ data, copy }) {
  const events = data.events.filter(
    (event) => event.day && copy.events[event.id],
  );
  if (!events.length) return null;
  return (
    <section id="events" className="events section">
      <SectionHead eyebrow={copy.joy} title={copy.celebrations} />
      <div className="event-grid">
        {events.map((event, index) => {
          const localized = copy.events[event.id];
          const eventDate = new Date(
            data.weddingYear,
            (data.weddingMonth || 1) - 1,
            Number(event.day),
          );
          const weekday = eventDate.toLocaleDateString(copy.locale, {
            weekday: "long",
          });
          const monthYear = eventDate.toLocaleDateString(copy.locale, {
            month: "long",
            year: "numeric",
          });
          const dateLabel = `${weekday} · ${monthYear}`;
          const reminder =
            event.id === "wedding" || event.id === "reception"
              ? {
                  id: event.id,
                  title: `${localized[0] || event.title} — ${data.bride.shortName} & ${data.groom.shortName}`,
                  start:
                    event.id === "wedding"
                      ? "20260827T103000"
                      : "20260828T190000",
                  end:
                    event.id === "wedding"
                      ? "20260827T123000"
                      : "20260828T210000",
                  location: `${data.venue.name}, ${data.venue.address}`,
                  description: `${event.note || ""}\n${data.mapUrl || ""}`,
                }
              : null;
          return (
            <EventCard
              key={event.id}
              event={{
                ...event,
                title: localized[0] || event.title,
                time: localized[1] || event.time,
                note: localized[2] || event.note,
              }}
              index={index}
              dateLabel={dateLabel}
              reminder={reminder}
              reminderLabel={copy.addReminder}
            />
          );
        })}
      </div>
    </section>
  );
}
