'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Footer() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<footer
			id="footer"
			className={`bg-primary w-[95%] mx-auto rounded-3xl shadow-2xl transform opacity-0 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-5'
				}`}
		>
			<div className="text-center py-1 flex items-center justify-around">
				<Image
					src="/logo-noBorder.png"
					alt="Craftly logo"
					width={100}
					height={100}
					className="w-16 h-16"
				/>

				<p className="text-xs leading-5 text-gray-300">
					<span className="hidden sm:inline">&copy; 2024 Craftly. All rights reserved.</span>
					<span className="sm:hidden">&copy; 2024 Craftly.</span>
				</p>

				<Link href="/privacy" className="flex flex-col items-center gap-2">
					<FaGithub
						className="w-8 h-8 transform duration-300 hover:scale-110"
					/>
					<p className="text-xs leading-5 text-primary hover:underline hover:text-hover">
						Build by Rafael Áquila
					</p>
				</Link>
			</div>
		</footer>
	);
}