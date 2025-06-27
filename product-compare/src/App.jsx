import { useEffect, useState, useMemo } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import CompareBar from "./components/CompareBar";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";

const PER_PAGE = 3;

export default function App() {

  const [selected, setSelected] = useState(
    () => JSON.parse(localStorage.getItem("compare")) || []
  );

  const toggleProduct = (p) =>
    setSelected((curr) =>
      curr.find((i) => i.id === p.id)
        ? curr.filter((i) => i.id !== p.id)
        : curr.length < 3
          ? [...curr, p]
          : curr
    );

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(selected));
  }, [selected]);


  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase());

      const matchesBrand = brand === "" || p.brand === brand;

      const price = p.price;
      const matchesPrice =
        priceRange === "" ||
        (priceRange === "under25000" && price < 25000) ||
        (priceRange === "25000to50000" && price >= 25000 && price <= 50000) ||
        (priceRange === "50000to75000" && price >= 50000 && price <= 75000) ||
        (priceRange === "above75000" && price > 75000);

      return matchesQuery && matchesBrand && matchesPrice;
    });
  }, [query, brand, priceRange]);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);


  useEffect(() => setPage(1), [query, brand, priceRange]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);


  return (
    <>
      <header>
        <h1>Smartphone Compare</h1>

        <div className="controls">
          {/* search */}
          <input
            type="search"
            placeholder="Search by name or brand…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="OnePlus">OnePlus</option>
          </select>

         
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="under25000">Under ₹25000</option>
            <option value="25000to50000">₹25000 – ₹50000</option>
            <option value="50000to75000">₹50000 – ₹75000</option>
            <option value="above75000">Above ₹75000</option>         
          </select>

    
          <ThemeToggle className="theme-btn" />
        </div>
      </header>

      <section className="grid">
        {paginated.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            selected={selected.some((s) => s.id === p.id)}
            toggle={toggleProduct}
          />
        ))}
      </section>

      {totalPages > 1 && (
        <nav className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ◀ Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </nav>
      )}

     
      {selected.length >= 2 && (
        <CompareBar
          items={selected}
          clear={() => setSelected([])}
          remove={(id) => setSelected((c) => c.filter((p) => p.id !== id))}
        />
      )}
    </>
  );
}
