import { useState } from "react";
import ComparisonTable from "./ComparisonTable";

export default function CompareBar({ items, clear, remove }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="compare-bar">
      <button onClick={() => setOpen(o => !o)}>
        {open ? "Hide" : "Show"} Comparison ({items.length})
      </button>
      <button onClick={clear}>Clear</button>

      {open && (
        <div style={{ overflowX: "auto" }}>
          <ComparisonTable items={items} remove={remove} />
        </div>
      )}
    </div>
  );
}
