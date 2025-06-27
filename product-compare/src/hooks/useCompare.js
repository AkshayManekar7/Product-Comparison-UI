import { useState, useEffect } from "react";

export function useCompare(max = 3) {
  const [selected, setSelected] = useState(() =>
    JSON.parse(localStorage.getItem("compare") || "[]")
  );

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < max
        ? [...prev, id]
        : prev
    );

  const clear = () => setSelected([]);

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(selected));
  }, [selected]);

  return { selected, toggle, clear };
}
