'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { SiAzuredataexplorer } from "react-icons/si";

export default function Hero() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<div className="w-[95%] mx-auto m-5 flex items-center justify-center h-screen">
			<div
				className={`w-full flex items-start justify-center transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
					}`}
			>
				<div className="pr-10">
					<h1 className="text-9xl font-bold">Craftly</h1>
					<div className="flex gap-7 mt-12">
						<Link
							href=""
							className="flex items-center gap-3 p-3 px-5 bg-primary border border-primary rounded-3xl relative overflow-hidden hover:shadow-md transition-all duration-300 group transform hover:-translate-y-2"
						>
							<PlayCircleIcon className="w-6 h-6" />
							<span className="relative z-10">Watch Demo</span>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></div>
						</Link>
						<Link
							href=""
							className="flex items-center gap-5 p-3 px-5 bg-primary border border-primary rounded-3xl relative overflow-hidden hover:shadow-md transition-all duration-300 group transform hover:-translate-y-2"
						>
							<SiAzuredataexplorer className="w-5 h-5" />
							<span className="relative z-10">Explorer</span>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-sm"></div>
						</Link>
					</div>
				</div>
				<div className="p-10 border-l border-secondary w-1/2 text-justify">
					<p>
						Bring your ideas to life with our collection of highly customizable components, optimized for speed, accessibility, and design. Compose full pages in minutes, save time, and focus on what truly matters: the user experience.
					</p>

					<p className="font-bold pt-3">
						Elevate your projects. Create with ease. Lead the digital future.
					</p>
				</div>
			</div>
		</div>
	);
}