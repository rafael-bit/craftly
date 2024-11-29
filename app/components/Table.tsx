import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Tasks from "./Tasks";
import SettingsForm from "./SettingsForm";

export default function Table() {
	const [selectedContent, setSelectedContent] = useState<"General" | "Dashboards" | "Forms" | "Authenticator" | "Tasks">("General");
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

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
			<SettingsForm />
		],
		Authenticator: [
			<div key="auth-1">

			</div>,
		],
		Tasks: [
			<Tasks />
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