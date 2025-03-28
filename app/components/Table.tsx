import { useEffect, useRef, useState } from "react";
import Tasks from "./Tasks";
import SettingsForm from "./SettingsForm";
import Authenticator from "./Authenticator";
import Dashboard from "./Dashboard";
import Link from "next/link";
import CodeViewer from "./ui/codeViewer";
import { HiDotsHorizontal } from "react-icons/hi";

const componentCodeHeader = `
    import Link from 'next/link';
    export default function Header() {
      return (
        <header className="bg-neutral-900 text-neutral-50 shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">MyApp</h1>
            <nav className="space-x-6">
              <Link href="#" className="hover:text-gray-400 transition">Home</Link>
              <Link href="#" className="hover:text-gray-400 transition">About</Link>
              <Link href="#" className="hover:text-gray-400 transition">Contact</Link>
            </nav>
          </div>
        </header>
      );
    }
  `

const componentCodeFooter = `
	import Link from 'next/link';
	export default function Footer() {
		return (
			<footer className="bg-neutral-900 text-neutral-300">
				<div className="container mx-auto px-4 py-6 text-center">
					<p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
					<div className="flex justify-center space-x-4 mt-2">
						<Link href="#" className="hover:text-neutral-100 transition">Privacy Policy</Link>
						<Link href="#" className="hover:text-neutral-100 transition">Terms of Service</Link>
					</div>
				</div>
			</footer>
		);
	}
`

export default function Table() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [visibleItems, setVisibleItems] = useState<string[]>([]);
	const [hiddenItems, setHiddenItems] = useState<string[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const [selectedContent, setSelectedContent] = useState<
		"General" | "Dashboards" | "Forms" | "Authenticator" | "Tasks" | "Header" | "Footer"
	>("General");
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.1 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const updateVisibleItems = () => {
			if (!containerRef.current) return;
			const containerWidth = containerRef.current.offsetWidth;
			const buttonWidth = 40;
			const maxButtons = Math.floor((containerWidth * 0.5) / buttonWidth);

			const allItems = Object.keys(sections);
			setVisibleItems(allItems.slice(0, maxButtons));
			setHiddenItems(allItems.slice(maxButtons));
		};

		updateVisibleItems();
		window.addEventListener('resize', updateVisibleItems);
		return () => window.removeEventListener('resize', updateVisibleItems);
	}, []);

	const sections = {
		General: [
			<Dashboard key="dashboard" />, <SettingsForm key="form" />, <Tasks key="tasks" />, <Authenticator key="auth" />,],
		Dashboards: [<Dashboard key="dashboard" />],
		Forms: [<SettingsForm key="form" />],
		Authenticator: [<Authenticator key="auth" />],
		Tasks: [<Tasks key="tasks" />],
		Header: [
			<div key="header" className="scrollbar">
				<CodeViewer componentCode={componentCodeHeader} />

				<header className="bg-neutral-900 text-neutral-50 shadow-md">
					<div className="container mx-auto px-4 py-4 flex justify-between items-center">
						<h1 className="text-2xl font-bold">MyApp</h1>
						<nav className="space-x-6">
							<a href="#" className="hover:text-gray-400 transition">Home</a>
							<a href="#" className="hover:text-gray-400 transition">About</a>
							<a href="#" className="hover:text-gray-400 transition">Contact</a>
						</nav>
					</div>
				</header>
			</div>,
		],
		Footer: [
			<div key="footer" className="scrollbar">
				<CodeViewer componentCode={componentCodeFooter} />

				<footer className="bg-neutral-900 text-neutral-300">
					<div className="container mx-auto px-4 py-6 text-center">
						<p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
						<div className="flex justify-center space-x-4 mt-2">
							<Link href="#" className="hover:text-neutral-100 transition">Privacy Policy</Link>
							<Link href="#" className="hover:text-neutral-100 transition">Terms of Service</Link>
						</div>
					</div>
				</footer>
			</div>,
		],
	};

	return (
		<div
			id="table"
			ref={ref}
			className={`bg-neutral-950 bg-opacity-35 pb-5 transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
				}`}
		>
			<div ref={containerRef} className="flex w-2/3 justify-evenly py-4 relative">
				{visibleItems.map((key) => (
					<button
						key={key}
						onClick={() => setSelectedContent(key as keyof typeof sections)}
						className={`py-1.5 px-4 rounded-2xl text-primary transition-all duration-300 hover:-translate-y-1 hover:text-hover hover:bg-primary ${selectedContent === key ? "bg-neutral-900 text-hover scale-105" : ""
							}`}
					>
						{key}
					</button>
				))}

				{hiddenItems.length > 0 && (
					<div className="relative">
						<button
							onClick={() => setShowDropdown(!showDropdown)}
							className="py-1.5 px-4 rounded-2xl text-primary transition-all duration-300 hover:-translate-y-1 hover:text-hover hover:bg-primary"
						>
							<HiDotsHorizontal className="w-5 h-5" />
						</button>

						{showDropdown && (
							<div className="absolute right-0 mt-2 py-2 w-48 bg-neutral-800 rounded-md shadow-xl z-50">
								{hiddenItems.map((key) => (
									<button
										key={key}
										onClick={() => {
											setSelectedContent(key as keyof typeof sections);
											setShowDropdown(false);
										}}
										className={`block w-full text-left px-4 py-2 text-sm text-primary hover:bg-neutral-700 ${selectedContent === key ? "bg-neutral-900 text-hover" : ""
											}`}
									>
										{key}
									</button>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			<div className="border border-neutral-700 w-[95%] rounded-md mx-auto p-6 text-white">
				{sections[selectedContent]}
			</div>
		</div>
	);
}