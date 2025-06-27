import "./ProductCard.css";

export default function ProductCard({ product, selected, toggle }) {
  return (
    <article className={`card ${selected ? "selected" : ""}`}>
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="brand">{product.brand}</p>
      <p className="price">₹{product.price}</p>

      <ul>
        {Object.entries(product.specs).map(([k, v]) => (
          <li key={k}>
            <strong>{k}</strong>: {v}
          </li>
        ))}
      </ul>

      <button onClick={() => toggle(product)}>
        {selected ? "Remove" : "Add to Compare"}
      </button>
    </article>
  );
}
