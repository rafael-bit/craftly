'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
					<Image
						src="/github.png"
						alt="Github"
						width={30}
						height={30}
						className="w-7 h-7 hover:w-8 hover:h-8"
					/>
					<p className="text-xs leading-5 text-primary hover:underline hover:text-hover">
						Build by Rafael Áquila
					</p>
				</Link>
			</div>
		</footer>
	);
}