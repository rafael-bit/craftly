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

export default function Table() {
	const [selectedContent, setSelectedContent] = useState<"General" | "Dashboards" | "Forms" | "Authenticator" | "Tasks" | "Header" | "Footer">("General");
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [isCodeVisible, setIsCodeVisible] = useState(false);

	const componentCodeHeader = `
		import Link from 'next/link';

		export default function Header(){
			return(
				<header className="bg-neutral-900 text-neutral-50 shadow-md">
					<div className="container mx-auto px-4 py-4 flex justify-between items-center">
						<h1 className="text-2xl font-bold">MyApp</h1>
						<nav className="space-x-6">
							<Link href="#" className="hover:text-gray-400 transition">
								Home
							</Link>
							<Link href="#" className="hover:text-gray-400 transition">
								About
							</Link>
							<Link href="#" className="hover:text-gray-400 transition">
								Contact
							</Link>
						</nav>
					</div>
				</header>
			)
		}`;
	
	const componentCodeFooter = `
	import Link from 'next/link';

	export default function Footer() {

		return (
			<footer className="bg-neutral-900 text-neutral-300">
				<div className="container mx-auto px-4 py-6 text-center">
					<p className="text-sm">
						&copy; {new Date().getFullYear()} MyApp. All rights reserved.
					</p>
					<div className="flex justify-center space-x-4 mt-2">
						<Link href="#" className="hover:text-neutral-100 transition">
							Privacy Policy
						</Link>
						<Link href="#" className="hover:text-neutral-100 transition">
							Terms of Service
						</Link>
					</div>
				</div>
			</footer>
		);
	}`;

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, []);

	const otherSectionsContent: Record<string, JSX.Element[]> = {
		Dashboards: [
			<Dashboard key="dash-1" />
		],
		Forms: [
			<SettingsForm key="form-1" />
		],
		Authenticator: [
			<Authenticator key="auth-1" />
		],
		Tasks: [
			<Tasks key="task-1" />
		],
		Header: [
			<div key="header-1" className="scrollbar">
				<button
					onClick={() => setIsCodeVisible(!isCodeVisible)}
					className="mb-3 flex items-center justify-around p-2 text-sm bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 text-white rounded shadow-md"
				>
					<RiCodeBoxLine size={24} />
					{isCodeVisible ? "Hide Code" : "View Code"}
				</button>
				{isCodeVisible && (
					<div
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					>
						<div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-3/4 h-2/3 overflow-auto">
							<button
								onClick={() => setIsCodeVisible(false)}
								className="absolute top-4 right-6 text-gray-200 hover:text-gray-100"
							>
								<IoIosClose size={24} />
							</button>
							<h2 className=" flex justify-between items-center text-lg font-bold text-gray-100 mb-4">
								Component Code
								<button
									onClick={() => navigator.clipboard.writeText(componentCodeHeader)}
									className="bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white py-2 px-4 rounded-md mb-4"
								>
									Copy Code
								</button>
							</h2>
							<SyntaxHighlighter language="typescript" style={nightOwl}>
								{componentCodeHeader}
							</SyntaxHighlighter>
						</div>
					</div>
				)}
				<header className="bg-neutral-900 text-neutral-50 shadow-md">
					<div className="container mx-auto px-4 py-4 flex justify-between items-center">
						<h1 className="text-2xl font-bold">MyApp</h1>
						<nav className="space-x-6">
							<a href="#" className="hover:text-gray-400 transition">
								Home
							</a>
							<a href="#" className="hover:text-gray-400 transition">
								About
							</a>
							<a href="#" className="hover:text-gray-400 transition">
								Contact
							</a>
						</nav>
					</div>
				</header>
			</div>
		],
		Footer: [
			<div key="footer-1" className="scrollbar">
				<button
					onClick={() => setIsCodeVisible(!isCodeVisible)}
					className="mb-3 flex items-center justify-around p-2 text-sm bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 text-white rounded shadow-md"
				>
					<RiCodeBoxLine size={24} />
					{isCodeVisible ? "Hide Code" : "View Code"}
				</button>
				{isCodeVisible && (
					<div
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					>
						<div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-3/4 h-2/3 overflow-auto">
							<button
								onClick={() => setIsCodeVisible(false)}
								className="absolute top-4 right-6 text-gray-200 hover:text-gray-100"
							>
								<IoIosClose size={24} />
							</button>
							<h2 className=" flex justify-between items-center text-lg font-bold text-gray-100 mb-4">
								Component Code
								<button
									onClick={() => navigator.clipboard.writeText(componentCodeFooter)}
									className="bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white py-2 px-4 rounded-md mb-4"
								>
									Copy Code
								</button>
							</h2>
							<SyntaxHighlighter language="typescript" style={nightOwl}>
								{componentCodeFooter}
							</SyntaxHighlighter>
						</div>
					</div>
				)}
				<footer className="bg-neutral-900 text-neutral-300">
					<div className="container mx-auto px-4 py-6 text-center">
						<p className="text-sm">
							&copy; {new Date().getFullYear()} MyApp. All rights reserved.
						</p>
						<div className="flex justify-center space-x-4 mt-2">
							<Link href="#" className="hover:text-neutral-100 transition">
								Privacy Policy
							</Link>
							<Link href="#" className="hover:text-neutral-100 transition">
								Terms of Service
							</Link>
						</div>
					</div>
				</footer>
			</div>
		],
	};

	const generalContent = Object.entries(otherSectionsContent).flatMap(([key, components]) => [
		...components.map((component, index) => (
			<div key={`${key}-${index}`} className="mb-6">
				{component}
			</div>
		)),
	]);

	const contentMap: { [key in typeof selectedContent]: JSX.Element[] } = {
		General: generalContent,
		Dashboards: otherSectionsContent.Dashboards,
		Forms: otherSectionsContent.Forms,
		Authenticator: otherSectionsContent.Authenticator,
		Tasks: otherSectionsContent.Tasks,
		Header: otherSectionsContent.Header,
		Footer: otherSectionsContent.Footer
	};

	return (
		<div
			id="table"
			ref={ref}
			className={`bg-neutral-950 bg-opacity-35 pb-5 transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
				}`}
		>
			<div className="flex w-1/2 justify-evenly py-4">
				{Object.keys(contentMap).map((key) => (
					<button
						key={key}
						onClick={() => setSelectedContent(key as keyof typeof contentMap)}
						className={`py-1.5 px-4 rounded-2xl text-primary transition-all duration-300 transform hover:-translate-y-1 hover:text-hover hover:bg-primary ${selectedContent === key ? "bg-neutral-900 text-hover scale-105" : ""
							}`}
					>
						{key}
					</button>
				))}
			</div>
			<div className="border border-neutral-700 w-[95%] rounded-md mx-auto p-6 text-white">
				{contentMap[selectedContent]}
			</div>
		</div>
	);
}