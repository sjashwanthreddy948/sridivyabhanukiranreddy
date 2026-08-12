const links = [
  "home",
  "couple",
  "events",
  "venue",
  "rsvp",
  "contact",
];

export default function Nav({ labels }) {
  return (
    <nav aria-label="Wedding invitation navigation">
      <div className="nav-links">
        {links.map((id, index) => (
          <a key={id} href={`#${id}`}>
            {labels[index]}
          </a>
        ))}
      </div>
    </nav>
  );
}
