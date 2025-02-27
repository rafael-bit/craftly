'use client'

import { useState, useEffect } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function GridGenerator() {
  const [cols, setCols] = useState(6);
  const [rows, setRows] = useState(6);
  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    const newLayout: Layout[] = [];
    let count = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        newLayout.push({ i: count.toString(), x, y, w: 1, h: 1 });
        count++;
      }
    }
    setLayout(newLayout);
  }, [cols, rows]);

  const generateTailwindGrid = () => {
    return `grid grid-cols-${cols} gap-2`;
  };

  const generateHTMLGrid = () => {
    return `<div class=\"${generateTailwindGrid()}\">
${layout.map(item => `  <div class=\"bg-blue-500 text-white flex items-center justify-center rounded shadow-lg\">${item.i}</div>`).join("\n")}  
</div>`;
  };

  return (
    <div className="p-4 container">
      <h1 className="text-2xl font-bold mb-4">Grid Generator</h1>
      <div className="mb-4 flex gap-4">
        <label>
          Columns:
          <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="bg-background ml-2 p-1 border rounded"
          />
        </label>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="bg-background ml-2 p-1 border rounded"
          />
        </label>
      </div>
      <GridLayout
        className="bg-background/40 p-2 rounded"
        layout={layout}
        cols={cols}
        rowHeight={50}
        width={600}
        onLayoutChange={(newLayout) => setLayout(newLayout as Layout[])}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className="bg-blue-500 text-white flex items-center justify-center rounded shadow-lg"
          >
            {item.i}
          </div>
        ))}
      </GridLayout>
      <pre className="mt-4 p-2 bg-background rounded text-sm overflow-auto">
        <h1 className="font-bold text-2xl mb-5 underline">Css Style</h1>
        {`.${generateTailwindGrid()} {
  display: grid;
  grid-template-columns: repeat(${cols}, minmax(0, 1fr));
  gap: 0.5rem;
}`}
      </pre>
      <pre className="mt-4 p-2 bg-background rounded text-sm overflow-auto">
        <h1 className="font-bold text-2xl mb-5 underline">HTML</h1>
        {generateHTMLGrid()}
      </pre>
    </div>
  );
}