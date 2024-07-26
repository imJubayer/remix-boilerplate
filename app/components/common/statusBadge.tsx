// eslint-disable-next-line react/prop-types
export default function StatusBadge({ badgeText = "" as string }): JSX.Element {
  function capitalizeFirstChar(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
  }

  return (
    <span
      className={`badge ${badgeText == "Active" ? "badge-light-success" : "badge-light-danger"}`}
    >
      {capitalizeFirstChar(badgeText)}
    </span>
  );
}
