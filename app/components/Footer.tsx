'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa6';

export default function Footer() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<footer
			className={`bg-primary w-[95%] mx-auto rounded-3xl shadow-2xl transform transition-all duration-700 ease-out 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
			aria-label="Footer"
		>
			<div className="text-center py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div>
					<Image
						src="/logo-noBorder.png"
						alt="Craftly logo"
						width={64}
						height={64}
						className="w-16 h-16"
						priority
					/>
				</div>
				<p className="text-xs leading-5 text-gray-300">
					<span className="hidden sm:inline">&copy; 2024 Craftly. All rights reserved.</span>
					<span className="sm:hidden">&copy; 2024 Craftly.</span>
				</p>
				<Link
					href="https://github.com/rafael-bit"
					className="flex flex-col items-center gap-1"
					aria-label="Visit Rafael Áquila's GitHub"
				>
					<FaGithub
						className="w-8 h-8 transform duration-300 hover:scale-110 text-gray-300"
					/>
					<span className="text-xs leading-5 text-gray-300 hover:underline hover:text-hover">
						Built by Rafael Áquila
					</span>
				</Link>
			</div>
		</footer>
	);
}