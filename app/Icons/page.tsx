'use client'

import React, { useState } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const IconSearch: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
	const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
	const [visibleCount, setVisibleCount] = useState(15);

	const allIcons: Record<string, Record<string, React.ComponentType>> = {
		fa: FaIcons,
		md: MdIcons,
		ai: AiIcons,
		io: IoIcons,
	};

	const iconKeys = Object.entries(allIcons)
		.flatMap(([library, icons]) =>
			Object.keys(icons).map((key) => ({
				library,
				key,
			}))
		)
		.filter(({ library, key }) =>
			typeof allIcons[library][key] === "function"
		);

	const filteredIcons = iconKeys.filter(({ key }) =>
		key.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleIconClick = (library: string, key: string) => {
		setSelectedIcon(key);
		setSelectedLibrary(library);
	};

	const handleCloseModal = () => {
		setSelectedIcon(null);
		setSelectedLibrary(null);
	};

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 15);
	};

	return (
		<div className="flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-3xl bg-hover shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold text-center mb-4">Icons Search</h1>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						setVisibleCount(15);
					}}
					placeholder="Search for an icon..."
					className="w-full border bg-neutral-900 text-neutral-100 border-neutral-600 rounded-md px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
				/>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
					{filteredIcons.slice(0, visibleCount).map(({ library, key }) => {
						const Icon = allIcons[library][key];
						return (
							<div
								key={key}
								className="cursor-pointer flex flex-col items-center justify-center text-center p-4 border border-neutral-600 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-2"
								onClick={() => handleIconClick(library, key)}
							>
								<IconContext.Provider value={{ size: "2em" }}>
									<Icon />
								</IconContext.Provider>
								<p className="text-sm mt-2 break-all">{key}</p>
							</div>
						);
					})}
				</div>

				{filteredIcons.length > visibleCount && (
					<div className="flex flex-col justify-center items-center w-full">
						<button
							onClick={handleShowMore}
							className="mt-6 bg-primary text-neutral-100 py-2 px-4 rounded-lg hover:bg-hover hover:text-neutral-50 transition-all duration-200"
						>
							Show more
						</button>
					</div>
				)}

				{filteredIcons.length === 0 && (
					<p className="text-center text-gray-500 mt-4">No icons found.</p>
				)}
				<p className="text-center text-xs pt-4">Use React icons library</p>
			</div>

			{selectedIcon && selectedLibrary && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-primary px-4 pb-6 rounded-lg shadow-lg w-3/4">
						<h2 className="flex justify-between items-end text-lg text-primary font-bold mb-7">
							How to use {selectedIcon}
							<button
								onClick={handleCloseModal}
								className="mt-4 px-4 py-2 text-primary rounded-md hover:bg-hover transition"
							>
								<AiOutlineClose />
							</button>
						</h2>
						<p className="my-4">Install Library</p>
						<pre className="bg-hover p-4 rounded-md text-sm overflow-auto">npm install react-icons</pre>
						<p className="my-4">Import in your project</p>
						<pre className="bg-hover p-4 rounded-md text-sm overflow-auto">
							{`import { ${selectedIcon} } from "react-icons/${selectedLibrary}";`}
						</pre>
						<p className="my-4">Use the icon in your component:</p>
						<pre className="bg-hover p-4 rounded-md text-sm overflow-auto">
							{`<${selectedIcon} />`}
						</pre>
					</div>
				</div>
			)}
		</div>
	);
};

export default IconSearch;