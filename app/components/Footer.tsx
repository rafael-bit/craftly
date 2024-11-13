import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-primary w-[95%] border border-gray-700 mx-auto rounded-3xl m-5">
			<div className="text-center lg:py-2 flex items-center justify-around">
				<Image src="/logo.png" alt="Craftly logo" width={100} height={100} className='w-16 h-16'/>
				<p className="text-xs leading-5 text-gray-300">
					&copy; 2024 Craftly. All rights reserved.
				</p>
				<Link href="/privacy" className="flex flex-col items-center gap-2 transition duration-300">
					<Image src="/github.png" alt="Github" width={30} height={30} className='w-7 h-7 hover:w-8 hover:h-8 transition duration-500'/>
					<p className="text-xs leading-5 text-primary hover:underline hover:text-hover transition duration-300">Build by Rafael Áquila</p>
				</Link>
			</div>
		</footer>
	);
}
		