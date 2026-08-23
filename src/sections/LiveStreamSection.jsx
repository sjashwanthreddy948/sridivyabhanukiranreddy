import { SectionHead } from "../components/Ornaments";
import { Radio } from "lucide-react";

function getYoutubeId(url = "") {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([\w-]{11})/,
  );
  return match?.[1] || "";
}

function isExternalStream(url = "") {
  return Boolean(url && !getYoutubeId(url));
}

export default function LiveStreamSection({ data, copy }) {
  const streams = [
    { key: "wedding", title: copy.weddingLive, url: data.weddingLiveUrl },
    { key: "reception", title: copy.receptionLive, url: data.receptionLiveUrl },
  ];

  return (
    <section id="live" className="live-stream section">
      <SectionHead eyebrow={copy.liveEyebrow} title={copy.liveTitle} />
      <div className="live-grid">
        {streams.map((stream) => {
          const videoId = getYoutubeId(stream.url);
          const externalStream = isExternalStream(stream.url);
          return (
            <article key={stream.key} className="live-item">
              <h3>{stream.title}</h3>
              <div className={`live-card ${videoId ? "has-video" : externalStream ? "has-external-link" : "is-pending"}`}>
                {videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title={`${copy.liveTitle} — ${stream.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : externalStream ? (
                  <a className="live-external-link" href={stream.url} target="_blank" rel="noreferrer">
                    <Radio aria-hidden="true" />
                    <strong>{copy.liveWatch}</strong>
                  </a>
                ) : (
                  <div className="live-pending">
                    <Radio aria-hidden="true" />
                    <div>
                      <h4>{copy.liveSoon}</h4>
                      <p>{copy.liveNote}</p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
