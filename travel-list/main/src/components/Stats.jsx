/* eslint-disable react/prop-types */
export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items...</em>
      </footer>
    );

  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentagePackedItems = Math.round((numPackedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentagePackedItems === 100
          ? "You got everything ready to go!"
          : `You have ${numItems} items on your list, and you already packed${" "}
        ${numPackedItems} (${percentagePackedItems}%)`}
      </em>
    </footer>
  );
}
