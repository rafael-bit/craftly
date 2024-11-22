'use client';

import { useEffect, useState } from "react";

const NotFound = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="flex items-center justify-center h-[70vh] bg-primary text-white">
			{isLoading ? (
				<div className="flex flex-col items-center">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
					<p className="mt-4 text-lg text-gray-400">Loading...</p>
				</div>
			) : (
				<div
					className="text-center opacity-0 animate-fade-in"
					style={{ animation: "fade-in 1s forwards" }}
				>
					<h1 className="text-8xl xs:text-9xl font-bold mb-4 animate-text bg-gradient-to-r from-blue-700 via-blue-900 to-blue-950 bg-clip-text text-transparent">
						404
					</h1>
					<p className="text-base md:text-xl text-gray-300">
						Oops! Page not found.
					</p>
					<p className="mt-2 md:mt-4 text-sm text-gray-500">
						It looks like you got lost in space...
					</p>
					<div className="mt-16">
						<a
							href="/"
								className="px-6 py-3 animate-text bg-gradient-to-r from-blue-700 via-blue-900 to-blue-950 text-white rounded-full shadow-lg transition-all duration-300"
						>
							Back to home page
						</a>
					</div>
				</div>
			)}
			<style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes text {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-text {
          background-size: 200% 200%;
          animation: text 3s ease infinite;
        }
      `}</style>
		</div>
	);
};

export default NotFound;