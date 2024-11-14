'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const footerElement = document.querySelector('#footer');

			if (footerElement) {
				const footerPosition = footerElement.getBoundingClientRect().top;
				const screenHeight = window.innerHeight;

				setIsVisible(footerPosition < screenHeight);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<footer
			id="footer"
			className={`bg-primary w-[95%] border border-gray-700 mx-auto rounded-3xl m-5 transition-opacity duration-[1500ms] ease-out transform ${isVisible ? 'opacity-100' : 'opacity-0'}`}
		>
			<div className="text-center lg:py-2 flex items-center justify-around">
				{/* Logo com transição da esquerda */}
				<Image
					src="/logo.png"
					alt="Craftly logo"
					width={100}
					height={100}
					className={`w-16 h-16 transition-transform duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
				/>

				{/* Texto com transição de fade-in direto */}
				<p className={`text-xs leading-5 text-gray-300 transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
					&copy; 2024 Craftly. All rights reserved.
				</p>

				{/* Link com transição da direita */}
				<Link href="/privacy" className="flex flex-col items-center gap-2">
					<Image
						src="/github.png"
						alt="Github"
						width={30}
						height={30}
						className={`w-7 h-7 hover:w-8 hover:h-8 transition-transform duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
					/>
					<p className={`text-xs leading-5 text-primary hover:underline hover:text-hover transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
						Build by Rafael Áquila
					</p>
				</Link>
			</div>
		</footer>
	);
}