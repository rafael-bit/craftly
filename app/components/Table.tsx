import { RiProgress1Line, RiProgress4Line, RiProgress8Line } from "react-icons/ri";
import { FaRegTimesCircle } from "react-icons/fa";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Table() {
	const [selectedContent, setSelectedContent] = useState<"General" | "Dashboards" | "Forms" | "Authenticator" | "Tasks">("General");
	const [isVisible, setIsVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const [newTask, setNewTask] = useState("");

	const [selectedLinks, setSelectedLinks] = useState({
		todo: false,
		inProgress: false,
		done: false,
		canceled: false,
	});

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, link: string) => {
		setSelectedLinks(prevState => ({
			...prevState,
			[link]: event.target.checked,
		}));
	};

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
			<div key="dash-1">

			</div>,
		],
		Forms: [
			<div key="forms-1">

			</div>,
		],
		Authenticator: [
			<div key="auth-1">

			</div>,
		],
		Tasks: [
			<div className="w-1/2 mx-auto mt-10 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-md shadow-md">
				<h1 className="text-2xl font-bold text-zinc-900 dark:text-gray-100 mb-4">
					Task Manager
				</h1>
				<div className="flex gap-2 mb-4 items-center">
					<input
						type="text"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						placeholder="Nova tarefa"
						className="px-3 py-0.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-800 dark:bg-zinc-800 dark:text-gray-100 dark:border-zinc-700"
					/>
					<button className="text-neutral-300 hover:text-neutral-50">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
					</button>
					<div className="flex gap-2 w-full">
						<div className="flex justify-around w-full">
							<div className="flex gap-2">
								<Popover className="relative">
									<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
										</svg>
										Status
									</PopoverButton>
									<PopoverPanel
										transition
										className="absolute -left-6 top-full z-[10000] mt-3 w-40 overflow-hidden bg-primary rounded-xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in px-4 py-3"
									>
										
									</PopoverPanel>
								</Popover>
								<Popover>
									<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
										</svg>
										Priority
									</PopoverButton>
								</Popover>
							</div>
							<Popover>
								<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
									</svg>
									View
								</PopoverButton>
							</Popover>
						</div>
					</div>
				</div>
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
	};

	return (
		<div
			id="table"
			ref={ref}
			className={`mt-24 bg-neutral-950 border-t border-b border-neutral-700 pb-5 transform transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
				}`}
		>
			<div className="flex w-1/2 justify-evenly py-4">
				{Object.keys(contentMap).map((key) => (
					<button
						key={key}
						onClick={() => setSelectedContent(key as keyof typeof contentMap)}
						className={`py-2 px-4 rounded-2xl text-primary transition-all duration-300 transform hover:-translate-y-1 hover:text-hover hover:bg-neutral-900 ${selectedContent === key ? "bg-neutral-900 text-hover scale-105" : ""
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