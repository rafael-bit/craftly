import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RiCodeBoxLine } from "react-icons/ri";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

type SectionKey = "Profile" | "Appearance";

export default function SettingsForm() {
	const [activeSection, setActiveSection] = useState<SectionKey>("Profile");
	const [isCodeVisible, setIsCodeVisible] = useState(false);
	const componentCode = `
		import { useState } from "react";

		type SectionKey = "Profile" | "Appearance";

		export default function SettingsForm() {
			const [activeSection, setActiveSection] = useState<SectionKey>("Profile");
			const sections: Record<SectionKey, JSX.Element> = {
				Profile:
					<div className="flex flex-col justify-center gap-2">
						<h2 className="text-2xl font-semibold text-neutral-100">Profile</h2>
						<p className="text-neutral-400 text-xs border-b border-neutral-600 pb-6">Change how peoples see you</p>
						<form action="">
							<label className="flex flex-col text-primary gap-2 pt-6">
								Username
								<input type="text" placeholder="Craftly" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
								<span className="text-neutral-400 text-xs">You can only change this once every 15 days.</span>
							</label>
							<label className="flex flex-col text-primary gap-2 pt-6">
								Email
								<input type="text" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
								<span className="text-neutral-400 text-xs">Change your email to principal email.</span>
							</label>
							<label className="flex flex-col text-primary gap-2 pt-6">
								Password
								<input type="text" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
								<span className="text-neutral-400 text-xs">Change your password.</span>
							</label>
							<label className="flex flex-col text-primary gap-2 pt-6">
								Confirm password
								<input type="text" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
								<span className="text-neutral-400 text-xs">Confirm your password.</span>
							</label>
							<div className="w-full flex justify-end">
								<button className="mt-5 px-10 py-2 rounded-lg bg-primary hover:bg-hover text-white border border-gray-700 hover:text-gray-200 transition-all duration-300">
									Save
								</button>
							</div>
						</form>
					</div>,
				Appearance:
					<div className="flex flex-col justify-center gap-2">
						<h2 className="text-xl font-semibold text-neutral-100">Appearance</h2>
						<p className="text-neutral-400 text-xs border-b border-neutral-600 pb-6">Customize the appearance of the app like font and theme</p>
						<form action="" className="flex flex-col">
							<h5 className="flex flex-col text-lg text-neutral-100 font-semibold gap-2 pt-4 py-2">Font</h5>
							<select name="font" id="" className="outline-none bg-primary border border-neutral-600 py-1 px-2 rounded-lg">
								<option value="system">System</option>
								<option value="arial">Arial</option>
								<option value="inter">Inter</option>
								<option value="roboto">Roboto</option>
								<option value="openSans">Open Sans</option>
							</select>
							<span className="text-neutral-400 text-xs pt-2 pb-4">Select your favorite font.</span>

							<h5 className="flex flex-col text-lg text-neutral-100 font-semibold gap-2 pt-4 py-2">Theme</h5>
							<select name="font" id="" className="outline-none bg-primary border border-neutral-600 py-1 px-2 rounded-lg">
								<option value="system">System</option>
								<option value="dark">Dark</option>
								<option value="light">Light</option>
							</select>
							<span className="text-neutral-400 text-xs pt-2">Select your favorite theme.</span>
							<div className="w-full flex justify-end">
								<button className="mt-5 px-10 py-2 rounded-lg bg-primary hover:bg-hover text-white border border-gray-700 hover:text-gray-200 transition-all duration-300">
									Save
								</button>
							</div>
						</form>
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
											className={"mb-1 py-1.5 px-3 hover:bg-hover rounded-lg transition-all duration-200 cursor-pointer text-primary" +
											(activeSection === section ? " bg-hover text-hover" : "")}
											onClick={() => setActiveSection(section as SectionKey)}
										>
											<p>{section}</p>
										</li>
									))}
								</ul>
							</aside>
							<div className="w-4/5 px-6 rounded-lg">
								{sections[activeSection]}
							</div>
						</div>
					</div>
				</div>
			);
		}`;

	const sections: Record<SectionKey, JSX.Element> = {
		Profile:
			<div className="flex flex-col justify-center gap-2">
				<h2 className="text-2xl font-semibold text-neutral-100">Profile</h2>
				<p className="text-neutral-400 text-xs border-b border-neutral-600 pb-6">Change how peoples see you</p>
				<form action="">
					<label className="flex flex-col text-primary gap-2 pt-6">
						Username
						<input type="text" placeholder="Craftly" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
						<span className="text-neutral-400 text-xs">You can only change this once every 15 days.</span>
					</label>
					<label className="flex flex-col text-primary gap-2 pt-6">
						Email
						<input type="text" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
						<span className="text-neutral-400 text-xs">Change your email to principal email.</span>
					</label>
					<label className="flex flex-col text-primary gap-2 pt-6">
						Password
						<input type="text" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
						<span className="text-neutral-400 text-xs">Change your password.</span>
					</label>
					<label className="flex flex-col text-primary gap-2 pt-6">
						Confirm password
						<input type="text" className="bg-primary outline-none border border-neutral-600 py-2 px-4 rounded-lg text-sm" />
						<span className="text-neutral-400 text-xs">Confirm your password.</span>
					</label>
					<div className="w-full flex justify-end">
						<button className="mt-5 px-10 py-2 rounded-lg bg-primary hover:bg-hover text-white border border-gray-700 hover:text-gray-200 transition-all duration-300">
							Save
						</button>
					</div>
				</form>
			</div>,
		Appearance:
			<div className="flex flex-col justify-center gap-2">
				<h2 className="text-xl font-semibold text-neutral-100">Appearance</h2>
				<p className="text-neutral-400 text-xs border-b border-neutral-600 pb-6">Customize the appearance of the app like font and theme</p>
				<form action="" className="flex flex-col">
					<h5 className="flex flex-col text-lg text-neutral-100 font-semibold gap-2 pt-4 py-2">Font</h5>
					<select name="font" id="" className="outline-none bg-primary border border-neutral-600 py-1 px-2 rounded-lg">
						<option value="system">System</option>
						<option value="arial">Arial</option>
						<option value="inter">Inter</option>
						<option value="roboto">Roboto</option>
						<option value="openSans">Open Sans</option>
					</select>
					<span className="text-neutral-400 text-xs pt-2 pb-4">Select your favorite font.</span>

					<h5 className="flex flex-col text-lg text-neutral-100 font-semibold gap-2 pt-4 py-2">Theme</h5>
					<select name="font" id="" className="outline-none bg-primary border border-neutral-600 py-1 px-2 rounded-lg">
						<option value="system">System</option>
						<option value="dark">Dark</option>
						<option value="light">Light</option>
					</select>
					<span className="text-neutral-400 text-xs pt-2">Select your favorite theme.</span>
					<div className="w-full flex justify-end">
						<button className="mt-5 px-10 py-2 rounded-lg bg-primary hover:bg-hover text-white border border-gray-700 hover:text-gray-200 transition-all duration-300">
							Save
						</button>
					</div>
				</form>
			</div>,
	};

	return (
		<div key="forms-1">
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
								onClick={() => navigator.clipboard.writeText(componentCode)}
								className="bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white py-2 px-4 rounded-md mb-4"
							>
								Copy Code
							</button>
						</h2>
						<SyntaxHighlighter language="typescript" style={nightOwl}>
							{componentCode}
						</SyntaxHighlighter>
					</div>
				</div>
			)}
			<div className="w-full flex justify-center bg-primary py-10">
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
						<div className="w-4/5 px-6 rounded-lg">
							{sections[activeSection]}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}