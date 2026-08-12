import { renderLines } from "../utils/content";

export default function InvitationSection({ data, copy }) {
  return (
    <section className="invitation section">
      <div className="invitation-frame">
        <span className="corner c1" aria-hidden="true" />
        <span className="corner c2" aria-hidden="true" />
        <p>
          {copy.invitation1}
          <br />
          <strong>{data.invitedBy}</strong>
          <br />
          {renderLines(copy.invitation2)}
        </p>
        <h2>
          {data.bride.shortName} <em>&amp;</em> {data.groom.shortName}
        </h2>
        <p>{renderLines(copy.invitation3)}</p>
      </div>
    </section>
  );
}
