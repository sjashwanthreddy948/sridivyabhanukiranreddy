import { AnimatedPetals } from "../components/Ornaments";

export default function Footer({ data, copy }) {
  return (
    <footer>
      <AnimatedPetals />
      <p>{copy.wait}</p>
      <h2>
        {data.bride.shortName}
        <em>♡</em>
        {data.groom.shortName}
      </h2>
      <p className="telugu">{copy.footerBlessing}</p>
      {data.familyMembers.length > 0 && (
        <div>{data.familyMembers.join(" · ")}</div>
      )}
      <strong>
        {copy.withLove}
        <br />
        {data.invitedBy}
      </strong>
      <div className="footer-temple" aria-hidden="true" />
    </footer>
  );
}
