import React, { useState } from "react";
import { RiCodeBoxLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeViewerProps {
	componentCode: string;
}

const CodeViewer = ({ componentCode }: CodeViewerProps) => {
	const [isCodeVisible, setIsCodeVisible] = useState(false);

	return (
		<>
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
						<h2 className="flex justify-between items-center text-lg font-bold text-gray-100 mb-4">
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
		</>
	);
};

export default CodeViewer;