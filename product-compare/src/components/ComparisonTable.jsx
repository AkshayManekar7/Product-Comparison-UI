export default function ComparisonTable({ items, remove }) {
    const allKeys = Array.from(
      new Set(items.flatMap(p => Object.keys(p.specs)))
    );
  
    return (
      <table className="compare-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Feature</th>
            {items.map(p => (
              <th key={p.id}>
                {p.name}{" "}
                <button onClick={() => remove(p.id)}>✕</button>
              </th>
            ))}
          </tr>
        </thead>
  
        <tbody>
          {allKeys.map(key => {
            const values = items.map(p => p.specs[key] || "—");
            const diff = new Set(values).size > 1;
            return (
              <tr key={key} className={diff ? "diff" : ""}>
                <td><strong>{key}</strong></td>
                {values.map((v, i) => <td key={i}>{v}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  