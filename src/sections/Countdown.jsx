import { useEffect, useState } from "react";
import { SectionHead } from "../components/Ornaments";

const getRemaining = (date) => {
  const milliseconds = new Date(date).getTime() - Date.now();
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) return null;
  return [
    Math.floor(milliseconds / 864e5),
    Math.floor(milliseconds / 36e5) % 24,
    Math.floor(milliseconds / 6e4) % 60,
    Math.floor(milliseconds / 1e3) % 60,
  ];
};

export default function Countdown({ data, copy }) {
  const [remaining, setRemaining] = useState(() =>
    getRemaining(data.weddingDate),
  );
  useEffect(() => {
    if (!data.weddingDate) return undefined;
    const timer = window.setInterval(
      () => setRemaining(getRemaining(data.weddingDate)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [data.weddingDate]);

  return (
    <section className="countdown section">
      <SectionHead eyebrow={copy.counting} title={copy.forever} />
      {remaining ? (
        <div className="counter">
          {remaining.map((value, index) => (
            <div key={copy.units[index]}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{copy.units[index]}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="date-await">
          {copy.year}
          <br />
          <span>{copy.save}</span>
        </p>
      )}
    </section>
  );
}
