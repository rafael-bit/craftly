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
			className={`bg-	 w-[95%] mx-auto rounded-3xl m-5 transition-opacity duration-[1500ms] ease-out transform shadow-xl ${isVisible ? 'opacity-100' : 'opacity-0'}`}
		>
			<div className="text-center py-1 flex items-center justify-around">
				<Image
					src="/logo.png"
					alt="Craftly logo"
					width={100}
					height={100}
					className={`w-16 h-16 transition-transform duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
				/>

				<p className={`text-xs leading-5 text-gray-300 transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
					<span className="hidden sm:inline">&copy; 2024 Craftly. All rights reserved.</span>
					<span className="sm:hidden">&copy; 2024 Craftly.</span>
				</p>

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