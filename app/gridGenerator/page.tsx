'use client'

import { useState, useEffect, useRef } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export default function GridGenerator() {
  const [cols, setCols] = useState(6);
  const [rows, setRows] = useState(6);
  const [layout, setLayout] = useState<Layout[]>([]);
  const [containerWidth, setContainerWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const generateHTMLGrid = () => {
    return `<div style=\"display: grid; grid-template-columns: repeat(${cols}, minmax(0, 1fr)); grid-auto-rows: 50px; gap: 0.5rem\">
${layout.map(item => `  <div class=\"bg-blue-500 text-white flex items-center justify-center rounded shadow-lg\" style=\"grid-column: ${item.x + 1} / span ${item.w}; grid-row: ${item.y + 1} / span ${item.h};\">${item.i}</div>`).join("\n")}  
</div>`;
  };

  return (
    <div className="p-4 container mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Grid Generator</h1>
      <div className="mb-4 flex flex-wrap gap-4">
        <label className="flex items-center">
          Columns:
          <input
            type="number"
            min="1"
            max="12"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="bg-background ml-2 p-1 border rounded text-center w-16"
          />
        </label>
        <label className="flex items-center">
          Rows:
          <input
            type="number"
            min="1"
            max="12"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="bg-background ml-2 p-1 border rounded text-center w-16"
          />
        </label>
      </div>
      <div ref={containerRef} className="w-full overflow-x-auto p-4 rounded-lg">
        <GridLayout
          className="p-2 rounded"
          layout={layout}
          cols={cols}
          rowHeight={50}
          width={containerWidth - 32} // subtract padding
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
      </div>
      <pre className="mt-4 p-2 bg-background rounded text-sm overflow-auto">
        <h1 className="text-lg font-bold underline my-3">Código Tailwind</h1>
        {generateHTMLGrid()}
      </pre>
    </div>
  );
}