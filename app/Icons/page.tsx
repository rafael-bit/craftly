'use client'

import { useState } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IoIcon5 from "react-icons/io5";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as Hi2Icons from "react-icons/hi2";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as DiIcons from "react-icons/di";
import * as GiIcons from "react-icons/gi";
import * as WiIcons from "react-icons/wi";
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import * as TfiIcons from "react-icons/tfi";
import * as CiIcons from "react-icons/ci";
import * as VscIcons from "react-icons/vsc";
import * as ImIcons from "react-icons/im";
import * as PiIcons from "react-icons/pi";
import * as GoIcons from "react-icons/go";
import * as LiaIcons from "react-icons/lia";
import * as GrIcons from "react-icons/gr";
import * as SlIcons from "react-icons/sl";
import * as CgIcons from "react-icons/cg";
import * as LuIcons from "react-icons/lu";

const IconSearch: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
	const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
	const [visibleCount, setVisibleCount] = useState(15);

	const allIcons: Record<string, Record<string, React.ComponentType>> = {
		fa: FaIcons,
		fa6: Fa6Icons,
		md: MdIcons,
		ai: AiIcons,
		io: IoIcons,
		io5: IoIcon5,
		bs: BsIcons,
		fi: FiIcons,
		hi: HiIcons,
		hi2: Hi2Icons,
		ri: RiIcons,
		bi: BiIcons,
		di: DiIcons,
		gi: GiIcons,
		wi: WiIcons,
		si: SiIcons,
		tb: TbIcons,
		tfi: TfiIcons,
		ci: CiIcons,
		vsc: VscIcons,
		im: ImIcons,
		pi: PiIcons,
		go: GoIcons,
		lia: LiaIcons,
		gr: GrIcons,
		sl: SlIcons,
		cg: CgIcons,
		lu: LuIcons,
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
		<div className="flex flex-col items-center justify-center p-4 text-primary">
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
								<AiIcons.AiOutlineClose />
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