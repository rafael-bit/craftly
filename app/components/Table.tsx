import { useEffect, useRef, useState } from "react";
import Tasks from "./Tasks";
import SettingsForm from "./SettingsForm";
import Authenticator from "./Authenticator";
import Dashboard from "./Dashboard";
import { RiCodeBoxLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Link from "next/link";

const COMPONENT_CODES = {
	Header: `
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
  `,
	Footer: `
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
  `,
};

export default function Table() {
	const [selectedContent, setSelectedContent] = useState<
		"General" | "Dashboards" | "Forms" | "Authenticator" | "Tasks" | "Header" | "Footer"
	>("General");
	const [isVisible, setIsVisible] = useState(false);
	const [isCodeVisible, setIsCodeVisible] = useState(false);
	const [activeCode, setActiveCode] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.1 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	const handleShowCode = (code: string) => {
		setActiveCode(code);
		setIsCodeVisible(true);
	};

	const renderCodeModal = () => (
		isCodeVisible && activeCode && (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-3/4 h-2/3 overflow-auto">
					<button
						onClick={() => setIsCodeVisible(false)}
						className="absolute top-4 right-6 text-gray-200 hover:text-gray-100"
					>
						<IoIosClose size={24} />
					</button>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-bold text-gray-100">Component Code</h2>
						<button
							onClick={() => navigator.clipboard.writeText(activeCode)}
							className="bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white py-2 px-4 rounded-md"
						>
							Copy Code
						</button>
					</div>
					<SyntaxHighlighter language="typescript" style={nightOwl}>
						{activeCode}
					</SyntaxHighlighter>
				</div>
			</div>
		)
	);

	const sections = {
		General: [
			<Dashboard key="dashboard" />, <SettingsForm key="form" />, <Tasks key="tasks" />, <Authenticator key="auth" />,],
		Dashboards: [<Dashboard key="dashboard" />],
		Forms: [<SettingsForm key="form" />],
		Authenticator: [<Authenticator key="auth" />],
		Tasks: [<Tasks key="tasks" />],
		Header: [
			<div key="header" className="scrollbar">
				<button
					onClick={() => handleShowCode(COMPONENT_CODES.Header)}
					className="mb-3 flex items-center p-2 text-sm bg-neutral-900 hover:bg-neutral-800 transition-all text-white rounded shadow-md"
				>
					<RiCodeBoxLine size={24} />
					View Code
				</button>
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
				<button
					onClick={() => handleShowCode(COMPONENT_CODES.Footer)}
					className="mb-3 flex items-center p-2 text-sm bg-neutral-900 hover:bg-neutral-800 transition-all text-white rounded shadow-md"
				>
					<RiCodeBoxLine size={24} />
					View Code
				</button>
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
			{renderCodeModal()}
			<div className="flex w-1/2 justify-evenly py-4">
				{Object.keys(sections).map((key) => (
					<button
						key={key}
						onClick={() => setSelectedContent(key as keyof typeof sections)}
						className={`py-1.5 px-4 rounded-2xl text-primary transition-all duration-300 hover:-translate-y-1 hover:text-hover hover:bg-primary ${selectedContent === key ? "bg-neutral-900 text-hover scale-105" : ""
							}`}
					>
						{key}
					</button>
				))}
			</div>
			<div className="border border-neutral-700 w-[95%] rounded-md mx-auto p-6 text-white">
				{sections[selectedContent]}
			</div>
		</div>
	);
}
