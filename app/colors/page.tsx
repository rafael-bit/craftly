'use client'

import React, { useState } from "react";

const Colors: React.FC = () => {
	const [selectedColor, setSelectedColor] = useState("#ffffff");

	const hexToRgba = (hex: string, alpha = 1): string => {
		const bigint = parseInt(hex.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	};

	const hexToHsl = (hex: string): string => {
		const bigint = parseInt(hex.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		const rPercent = r / 255;
		const gPercent = g / 255;
		const bPercent = b / 255;

		const max = Math.max(rPercent, gPercent, bPercent);
		const min = Math.min(rPercent, gPercent, bPercent);
		const delta = max - min;

		let h = 0;
		let s = 0;
		let l = (max + min) / 2;

		if (delta !== 0) {
			s = delta / (1 - Math.abs(2 * l - 1));
			switch (max) {
				case rPercent:
					h = ((gPercent - bPercent) / delta) % 6;
					break;
				case gPercent:
					h = (bPercent - rPercent) / delta + 2;
					break;
				case bPercent:
					h = (rPercent - gPercent) / delta + 4;
					break;
			}
		}

		h = Math.round(h * 60);
		if (h < 0) h += 360;
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return `hsl(${h}, ${s}%, ${l}%)`;
	};

	return (
		<div className="flex flex-col items-center justify-center h-[70vh] p-4">
			<div className="shadow-md rounded-lg p-6 w-full h-full max-w-md">
				<h1 className="text-2xl font-bold mb-4 text-center">Color Picker</h1>
				<input
					type="color"
					value={selectedColor}
					onChange={(e) => setSelectedColor(e.target.value)}
					className="rounded-lg w-full h-10 cursor-pointer"
				/>
				<table className="w-full mt-6 text-left border-collapse border border-neutral-600">
					<thead>
						<tr>
							<th className="border border-neutral-600 px-4 py-2">Format</th>
							<th className="border border-neutral-600 px-4 py-2">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-neutral-600 px-4 py-2 font-medium">HEX</td>
							<td className="border border-neutral-600 px-4 py-2">{selectedColor}</td>
						</tr>
						<tr>
							<td className="border border-neutral-600 px-4 py-2 font-medium">RGBA</td>
							<td className="border border-neutral-600 px-4 py-2">{hexToRgba(selectedColor)}</td>
						</tr>
						<tr>
							<td className="border border-neutral-600 px-4 py-2 font-medium">HSL</td>
							<td className="border border-neutral-600 px-4 py-2">{hexToHsl(selectedColor)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Colors;