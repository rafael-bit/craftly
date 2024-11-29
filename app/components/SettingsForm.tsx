import { useState } from "react";

type SectionKey = "Profile" | "Account" | "Appearance" | "Notifications";

export default function SettingsForm() {
	const [activeSection, setActiveSection] = useState<SectionKey>("Profile");

	const sections: Record<SectionKey, JSX.Element> = {
		Profile:
			<div className="flex flex-col justify-center">
				<h2 className="text-2xl font-semibold text-neutral-100">Profile</h2>
				<p className="text-neutral-400">Change how peoples see you</p>
			</div>,
		Account:
			<div className="flex flex-col justify-center">
				<h2 className="text-2xl font-semibold text-neutral-100">Account</h2>
				<p className="text-neutral-400"></p>
			</div>,
		Appearance:
			<div className="flex flex-col justify-center">
				<h2 className="text-2xl font-semibold text-neutral-100">Appearance</h2>
				<p className="text-neutral-400"></p>
			</div>,
		Notifications:
			<div className="flex flex-col justify-center">
				<h2 className="text-2xl font-semibold text-neutral-100">Notifications</h2>
				<p className="text-neutral-400"></p>
			</div>,
	};

	return (
		<div key="forms-1" className="w-full flex justify-center bg-primary py-10">
			<div className="w-5/6">
				<div>
					<h1 className="text-3xl font-bold text-gray-100 mb-2">Settings</h1>
					<h5 className="text-sm text-neutral-400 mb-5 pb-8 border-b border-neutral-700">
						Manage your account settings.
					</h5>
				</div>
				<div className="flex">
					<aside className="w-1/5 mt-3">
						<ul className="flex flex-col justify-center">
							{Object.keys(sections).map((section) => (
								<li
									key={section}
									className={`mb-1 py-1.5 px-3 hover:bg-hover rounded-lg transition-all duration-200 cursor-pointer text-primary ${activeSection === section ? "bg-hover text-hover" : ""
										}`}
									onClick={() => setActiveSection(section as SectionKey)}
								>
									<p>{section}</p>
								</li>
							))}
						</ul>
					</aside>
					<div className="w-4/5 p-6 rounded-lg">
						{sections[activeSection]}
					</div>
				</div>
			</div>
		</div>
	);
}