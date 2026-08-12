import { SectionHead } from "../components/Ornaments";
import YouTubeIcon from "../components/YouTubeIcon";

function getYoutubeId(url = "") {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([\w-]{11})/,
  );
  return match?.[1] || "";
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
          return (
            <article key={stream.key} className="live-item">
              <h3>{stream.title}</h3>
              <div className={`live-card ${videoId ? "has-video" : "is-pending"}`}>
                {videoId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title={`${copy.liveTitle} — ${stream.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="live-pending">
                    <span><YouTubeIcon /></span>
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
