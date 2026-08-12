export const renderLines = (value = "") =>
  value
    .split("|")
    .filter(Boolean)
    .map((line, index, all) => (
      <span key={`${index}-${line}`}>
        {line}
        {index < all.length - 1 && <br />}
      </span>
    ));

export const eventById = (data, id) =>
  data.events.find((event) => event.id === id);
