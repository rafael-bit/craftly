import { IoIosClose } from "react-icons/io";
import { RiProgress1Line, RiProgress4Line, RiProgress8Line } from "react-icons/ri";
import { FaRegTimesCircle, FaRegArrowAltCircleDown, FaRegArrowAltCircleRight, FaRegArrowAltCircleUp } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { RiCodeBoxLine } from "react-icons/ri";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Task = {
	id: number;
	title: string;
	status: "todo" | "inProgress" | "done" | "canceled";
	priority: "low" | "medium" | "high";
};

export default function Tasks() {
	const [filterText, setFilterText] = useState("");
	const [visibleTaskCount, setVisibleTaskCount] = useState(5);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);

	const [isCodeVisible, setIsCodeVisible] = useState(false);

	const componentCode = `
    import { IoIosClose } from "react-icons/io";
		import { RiProgress1Line, RiProgress4Line, RiProgress8Line } from "react-icons/ri";
		import { FaRegTimesCircle, FaRegArrowAltCircleDown, FaRegArrowAltCircleRight, FaRegArrowAltCircleUp } from "react-icons/fa";
		import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
		import { RiCodeBoxLine } from "react-icons/ri";
		import { useState } from "react";
		import SyntaxHighlighter from "react-syntax-highlighter";
		import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

		type Task = {
			id: number;
			title: string;
			status: "todo" | "inProgress" | "done" | "canceled";
			priority: "low" | "medium" | "high";
		};

		export default function Tasks() {
			const [filterText, setFilterText] = useState("");
			const [visibleTaskCount, setVisibleTaskCount] = useState(5);
			const [isModalOpen, setIsModalOpen] = useState(false);
			const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);
			const [newTask, setNewTask] = useState<Pick<Task, "title" | "status" | "priority">>({
				title: "",
				status: "todo",
				priority: "low",
			});

			const [tasks, setTasks] = useState<Task[]>([
				{ id: 1, title: "Task 1", status: "todo", priority: "low" },
				{ id: 2, title: "Task 2", status: "inProgress", priority: "medium" },
				{ id: 3, title: "Task 3", status: "done", priority: "high" },
				{ id: 4, title: "Task 4", status: "canceled", priority: "low" },
			]);

			const [selectedStatus, setSelectedStatus] = useState({
				todo: false,
				inProgress: false,
				done: false,
				canceled: false,
			});

			const [selectedPriority, setSelectedPriority] = useState({
				low: false,
				medium: false,
				high: false,
			});

			const addTask = () => {
				if (newTask.title.trim() === "") return;
				const newId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
				setTasks((prevTasks) => [...prevTasks, { ...newTask, id: newId }]);
				setNewTask({ title: "", status: "todo", priority: "low" });
				setIsModalOpen(false);
			};

			const updateTask = (updatedTask: Task) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === updatedTask.id ? updatedTask : task
					)
				);
				setTaskBeingEdited(null);
			};

			const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, status: keyof typeof selectedStatus) => {
				setSelectedStatus((prev) => ({ ...prev, [status]: event.target.checked }));
			};

			const filteredTasks = tasks.filter((task) => {
				const titleMatch = task.title.toLowerCase().includes(filterText.toLowerCase());

				const statusMatch = Object.entries(selectedStatus).some(
					([key, isSelected]) => isSelected && task.status === key
				);

				const priorityMatch = Object.entries(selectedPriority).some(
					([key, isSelected]) => isSelected && task.priority === key
				);

				return (
					(titleMatch || !filterText) &&
					(statusMatch || !Object.values(selectedStatus).includes(true)) &&
					(priorityMatch || !Object.values(selectedPriority).includes(true))
				);
			});

			const deleteTask = (id: number) => {
				setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
			};

			const limitedTasks = filteredTasks.slice(0, visibleTaskCount);

			return (
				<div className="scrollbar">
					<div className="relative w-3/4 mx-auto mt-10 p-4 bg-primary rounded-md shadow-md">
						<h1 className="text-2xl font-bold text-gray-100 mb-4">
							Task Manager
						</h1>
						<div className="flex gap-2 mb-4 items-center">
							<input
								type="text"
								placeholder="Filter Task"
								value={filterText}
								onChange={(e) => setFilterText(e.target.value)}
								className="px-3 py-0.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-800 bg-zinc-900 text-gray-100 border-zinc-800"
							/>
							<button
								className="text-neutral-300 hover:text-neutral-50"
								onClick={() => setIsModalOpen(true)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
								</svg>
							</button>
							{isModalOpen && (
								<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
									<div className="bg-zinc-950 rounded-md p-6 w-96">
										<h2 className="text-lg font-bold mb-4">Add New Task</h2>
										<input
											type="text"
											placeholder="Task Title"
											value={newTask.title}
											onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
											className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
										/>
										<select
											value={newTask.status}
											onChange={(e) =>
												setNewTask((prev) => ({
													...prev,
													status: e.target.value as Task["status"],
												}))
											}
											className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
										>
											<option value="todo">To Do</option>
											<option value="inProgress">In Progress</option>
											<option value="done">Done</option>
											<option value="canceled">Canceled</option>
										</select>

										<select
											value={newTask.priority}
											onChange={(e) =>
												setNewTask((prev) => ({
													...prev,
													priority: e.target.value as Task["priority"],
												}))
											}
											className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
										>
											<option value="low">Low</option>
											<option value="medium">Medium</option>
											<option value="high">High</option>
										</select>
										<div className="flex justify-end gap-2">
											<button
												onClick={() => setIsModalOpen(false)}
												className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition-all duration-200"
											>
												Cancel
											</button>
											<button
												onClick={addTask}
												className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-all duration-200"
											>
												Add Task
											</button>
										</div>
									</div>
								</div>
							)}
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
												className="absolute z-[10000] mt-3 w-44 overflow-hidden bg-primary rounded-xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in px-2 py-3 text-primary"
											>
												<div className="flex flex-col gap-2">
													{[
														{ key: "todo", label: "To Do", icon: <RiProgress1Line /> },
														{ key: "inProgress", label: "In Progress", icon: <RiProgress4Line /> },
														{ key: "done", label: "Done", icon: <RiProgress8Line /> },
														{ key: "canceled", label: "Canceled", icon: <FaRegTimesCircle /> },
													].map((status) => (
														<label key={status.key} className="flex items-center gap-3 cursor-pointer hover:bg-hover px-2 py-1 rounded">
															<input
																type="checkbox"
																checked={selectedStatus[status.key as keyof typeof selectedStatus]}
																onChange={(e) => handleStatusChange(e, status.key as keyof typeof selectedStatus)}
																className="appearance-none h-4 w-4 bg-primary border-2 border-neutral-500 rounded checked:bg-primary checked:after:content-['✓'] checked:border-neutral-500 checked:after:text-white checked:content-center checked:flex checked:items-center checked:justify-center checked:leading-none"
															/>
															<span className="flex items-center gap-2">
																{status.icon}
																{status.label}
															</span>
														</label>
													))}
												</div>
											</PopoverPanel>
										</Popover>
										<Popover>
											<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
													<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
												</svg>
												Priority
											</PopoverButton>
											<PopoverPanel
												transition
												className="absolute z-[10000] mt-3 w-40 overflow-hidden bg-primary rounded-xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in px-2 py-3 text-primary"
											>
												<div className="flex flex-col gap-2">
													{[
														{ key: "low", label: "Low", icon: <FaRegArrowAltCircleDown /> },
														{ key: "medium", label: "Medium", icon: <FaRegArrowAltCircleRight /> },
														{ key: "high", label: "High", icon: <FaRegArrowAltCircleUp /> },
													].map((priority) => (
														<label key={priority.key} className="flex items-center gap-3 cursor-pointer hover:bg-hover px-2 py-1 rounded">
															<input
																type="checkbox"
																checked={selectedPriority[priority.key as keyof typeof selectedPriority]}
																onChange={(e) =>
																	setSelectedPriority((prev) => ({
																		...prev,
																		[priority.key]: e.target.checked,
																	}))
																}
																className="appearance-none h-4 w-4 bg-primary border-2 border-neutral-500 rounded checked:bg-primary checked:after:content-['✓'] checked:border-neutral-500 checked:after:text-white checked:content-center checked:flex checked:items-center checked:justify-center checked:leading-none"
															/>
															<span className="flex items-center gap-2">
																{priority.icon}
																{priority.label}
															</span>
														</label>
													))}
												</div>
											</PopoverPanel>
										</Popover>
									</div>
									<Popover className="relative">
										<PopoverButton
											className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
											</svg>
											View
										</PopoverButton>
										<PopoverPanel className="absolute z-10 mt-2 w-40 bg-zinc-900 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<ul className="p-2">
												{[5, 10, 15, 20].map((count) => (
													<li
														key={count}
														className="cursor-pointer px-4 py-2 hover:bg-zinc-800 rounded-md"
														onClick={() => setVisibleTaskCount(count)}
													>
														Show {count} Tasks
													</li>
												))}
											</ul>
										</PopoverPanel>
									</Popover>
								</div>
							</div>
						</div>
						<div className="w-full border border-neutral-700 rounded-xl p-1">
							<table className="w-full border-collapse">
								{filteredTasks.slice(0, visibleTaskCount).length > 0 ? (
									<>
										<thead className="bg-primary hover:bg-hover">
											<tr>
												<th className="px-4 py-2 text-sm font-medium text-primary text-center">
													Title
												</th>
												<th className="px-4 py-2 text-sm font-medium text-primary text-center">
													Status
												</th>
												<th className="px-4 py-2 text-sm font-medium text-primary text-center">
													Priority
												</th>
												<th className="px-4 py-2 text-sm font-medium"></th>
											</tr>
										</thead>
										<tbody>
											{limitedTasks.map((task) => (
												<tr
													className="bg-primary hover:bg-hover"
													key={task.id}
												>
													<td className="px-4 py-2 text-sm text-gray-600 text-center">
														<span>{task.title}</span>
													</td>
													<td className="px-4 py-2 text-sm text-gray-600 text-center">
														<span className="text-sm text-gray-500">{task.status}</span>
													</td>
													<td className="px-4 py-2 text-sm text-gray-600 text-center">
														<span className="text-sm text-gray-500">{task.priority}</span>
													</td>
													<td className="px-4 py-2 text-sm text-gray-600 text-right flex justify-end">
														<Popover className="relative">
															<PopoverButton
																className="flex items-center outline-none px-2 py-0.5 rounded-lg text-primary hover:text-hover text-sm transition-all duration-300 transform hover:-translate-y-0.5"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="24"
																	height="24"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																>
																	<circle cx="12" cy="12" r="1"></circle>
																	<circle cx="19" cy="12" r="1"></circle>
																	<circle cx="5" cy="12" r="1"></circle>
																</svg>
															</PopoverButton>
															<PopoverPanel className="absolute z-10 mt-2 w-40 bg-primary rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
																<ul className="p-2">
																	<li
																		className="flex items-center cursor-pointer gap-2 px-4 py-2 hover:bg-hover rounded-md text-primary"
																		onClick={() => setTaskBeingEdited(task)}
																	>
																		Edit Task
																	</li>
																	<li
																		className="flex items-center cursor-pointer gap-2 px-4 py-2 hover:bg-hover rounded-md text-primary"
																		onClick={() => deleteTask(task.id)}
																	>
																		Delete Task
																	</li>
																	{taskBeingEdited && (
																		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
																			<div className="bg-zinc-950 rounded-md p-6 w-96">
																				<h2 className="text-lg font-bold mb-4">Edit Task</h2>
																				<input
																					type="text"
																					placeholder="Task Title"
																					value={taskBeingEdited.title}
																					onChange={(e) =>
																						setTaskBeingEdited((prev) =>
																							prev ? { ...prev, title: e.target.value } : null
																						)
																					}
																					className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
																				/>
																				<select
																					value={taskBeingEdited.status}
																					onChange={(e) =>
																						setTaskBeingEdited((prev) =>
																							prev ? { ...prev, status: e.target.value as Task["status"] } : null
																						)
																					}
																					className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
																				>
																					<option value="todo">To Do</option>
																					<option value="inProgress">In Progress</option>
																					<option value="done">Done</option>
																					<option value="canceled">Canceled</option>
																				</select>
																				<select
																					value={taskBeingEdited.priority}
																					onChange={(e) =>
																						setTaskBeingEdited((prev) =>
																							prev ? { ...prev, priority: e.target.value as Task["priority"] } : null
																						)
																					}
																					className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
																				>
																					<option value="low">Low</option>
																					<option value="medium">Medium</option>
																					<option value="high">High</option>
																				</select>
																				<div className="flex justify-end gap-2">
																					<button
																						onClick={() => setTaskBeingEdited(null)}
																						className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition-all text-primary hover:text-hover duration-200"
																					>
																						Cancel
																					</button>
																					<button
																						onClick={() => {
																							if (taskBeingEdited) updateTask(taskBeingEdited);
																						}}
																						className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 text-primary hover:text-hover transition-all duration-200"
																					>
																						Save Task
																					</button>
																				</div>
																			</div>
																		</div>
																	)}
																</ul>
															</PopoverPanel>
														</Popover>
													</td>
												</tr>
											))}
										</tbody>
									</>
								) : (
									<p className="text-center text-gray-500">No tasks found.</p>
								)}
							</table>
						</div>
					</div>
				</div>
			)
		}
			`;

	const [newTask, setNewTask] = useState<Pick<Task, "title" | "status" | "priority">>({
		title: "",
		status: "todo",
		priority: "low",
	});

	const [tasks, setTasks] = useState<Task[]>([
		{ id: 1, title: "Task 1", status: "todo", priority: "low" },
		{ id: 2, title: "Task 2", status: "inProgress", priority: "medium" },
		{ id: 3, title: "Task 3", status: "done", priority: "high" },
		{ id: 4, title: "Task 4", status: "canceled", priority: "low" },
	]);

	const [selectedStatus, setSelectedStatus] = useState({
		todo: false,
		inProgress: false,
		done: false,
		canceled: false,
	});

	const [selectedPriority, setSelectedPriority] = useState({
		low: false,
		medium: false,
		high: false,
	});

	const addTask = () => {
		if (newTask.title.trim() === "") return;
		const newId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
		setTasks((prevTasks) => [...prevTasks, { ...newTask, id: newId }]);
		setNewTask({ title: "", status: "todo", priority: "low" });
		setIsModalOpen(false);
	};

	const updateTask = (updatedTask: Task) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task
			)
		);
		setTaskBeingEdited(null);
	};

	const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, status: keyof typeof selectedStatus) => {
		setSelectedStatus((prev) => ({ ...prev, [status]: event.target.checked }));
	};

	const filteredTasks = tasks.filter((task) => {
		const titleMatch = task.title.toLowerCase().includes(filterText.toLowerCase());

		const statusMatch = Object.entries(selectedStatus).some(
			([key, isSelected]) => isSelected && task.status === key
		);

		const priorityMatch = Object.entries(selectedPriority).some(
			([key, isSelected]) => isSelected && task.priority === key
		);

		return (
			(titleMatch || !filterText) &&
			(statusMatch || !Object.values(selectedStatus).includes(true)) &&
			(priorityMatch || !Object.values(selectedPriority).includes(true))
		);
	});

	const deleteTask = (id: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	const limitedTasks = filteredTasks.slice(0, visibleTaskCount);

	return (
		<div key="task-1" className="scrollbar">
			<button
				onClick={() => setIsCodeVisible(!isCodeVisible)}
				className="mb-3 flex items-center justify-around p-2 text-sm bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 text-white rounded shadow-md"
			>
				<RiCodeBoxLine size={24} />
				{isCodeVisible ? "Hide Code" : "View Code"}
			</button>
			<div className="relative w-3/4 mx-auto mt-10 p-4 bg-primary rounded-md shadow-md">
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
				<h1 className="text-2xl font-bold text-gray-100 mb-4">
					Task Manager
				</h1>
				<div className="flex gap-2 mb-4 items-center">
					<input
						type="text"
						placeholder="Filter Task"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
						className="px-3 py-0.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-800 bg-zinc-900 text-gray-100 border-zinc-800"
					/>
					<button
						className="text-neutral-300 hover:text-neutral-50"
						onClick={() => setIsModalOpen(true)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
					</button>
					{isModalOpen && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
							<div className="bg-zinc-950 rounded-md p-6 w-96">
								<h2 className="text-lg font-bold mb-4">Add New Task</h2>
								<input
									type="text"
									placeholder="Task Title"
									value={newTask.title}
									onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
									className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
								/>
								<select
									value={newTask.status}
									onChange={(e) =>
										setNewTask((prev) => ({
											...prev,
											status: e.target.value as Task["status"],
										}))
									}
									className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
								>
									<option value="todo">To Do</option>
									<option value="inProgress">In Progress</option>
									<option value="done">Done</option>
									<option value="canceled">Canceled</option>
								</select>

								<select
									value={newTask.priority}
									onChange={(e) =>
										setNewTask((prev) => ({
											...prev,
											priority: e.target.value as Task["priority"],
										}))
									}
									className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
								>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</select>
								<div className="flex justify-end gap-2">
									<button
										onClick={() => setIsModalOpen(false)}
										className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition-all duration-200"
									>
										Cancel
									</button>
									<button
										onClick={addTask}
										className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-all duration-200"
									>
										Add Task
									</button>
								</div>
							</div>
						</div>
					)}
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
										className="absolute z-[10000] mt-3 w-44 overflow-hidden bg-primary rounded-xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in px-2 py-3 text-primary"
									>
										<div className="flex flex-col gap-2">
											{[
												{ key: "todo", label: "To Do", icon: <RiProgress1Line /> },
												{ key: "inProgress", label: "In Progress", icon: <RiProgress4Line /> },
												{ key: "done", label: "Done", icon: <RiProgress8Line /> },
												{ key: "canceled", label: "Canceled", icon: <FaRegTimesCircle /> },
											].map((status) => (
												<label key={status.key} className="flex items-center gap-3 cursor-pointer hover:bg-hover px-2 py-1 rounded">
													<input
														type="checkbox"
														checked={selectedStatus[status.key as keyof typeof selectedStatus]}
														onChange={(e) => handleStatusChange(e, status.key as keyof typeof selectedStatus)}
														className="appearance-none h-4 w-4 bg-primary border-2 border-neutral-500 rounded checked:bg-primary checked:after:content-['✓'] checked:border-neutral-500 checked:after:text-white checked:content-center checked:flex checked:items-center checked:justify-center checked:leading-none"
													/>
													<span className="flex items-center gap-2">
														{status.icon}
														{status.label}
													</span>
												</label>
											))}
										</div>
									</PopoverPanel>
								</Popover>
								<Popover>
									<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
										</svg>
										Priority
									</PopoverButton>
									<PopoverPanel
										transition
										className="absolute z-[10000] mt-3 w-40 overflow-hidden bg-primary rounded-xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in px-2 py-3 text-primary"
									>
										<div className="flex flex-col gap-2">
											{[
												{ key: "low", label: "Low", icon: <FaRegArrowAltCircleDown /> },
												{ key: "medium", label: "Medium", icon: <FaRegArrowAltCircleRight /> },
												{ key: "high", label: "High", icon: <FaRegArrowAltCircleUp /> },
											].map((priority) => (
												<label key={priority.key} className="flex items-center gap-3 cursor-pointer hover:bg-hover px-2 py-1 rounded">
													<input
														type="checkbox"
														checked={selectedPriority[priority.key as keyof typeof selectedPriority]}
														onChange={(e) =>
															setSelectedPriority((prev) => ({
																...prev,
																[priority.key]: e.target.checked,
															}))
														}
														className="appearance-none h-4 w-4 bg-primary border-2 border-neutral-500 rounded checked:bg-primary checked:after:content-['✓'] checked:border-neutral-500 checked:after:text-white checked:content-center checked:flex checked:items-center checked:justify-center checked:leading-none"
													/>
													<span className="flex items-center gap-2">
														{priority.icon}
														{priority.label}
													</span>
												</label>
											))}
										</div>
									</PopoverPanel>
								</Popover>
							</div>
							<Popover className="relative">
								<PopoverButton
									className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
								>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
									</svg>
									View
								</PopoverButton>
								<PopoverPanel className="absolute z-10 mt-2 w-40 bg-zinc-900 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<ul className="p-2">
										{[5, 10, 15, 20].map((count) => (
											<li
												key={count}
												className="cursor-pointer px-4 py-2 hover:bg-zinc-800 rounded-md"
												onClick={() => setVisibleTaskCount(count)}
											>
												Show {count} Tasks
											</li>
										))}
									</ul>
								</PopoverPanel>
							</Popover>
						</div>
					</div>
				</div>
				<div className="w-full border border-neutral-700 rounded-xl p-1">
					<table className="w-full border-collapse">
						{filteredTasks.slice(0, visibleTaskCount).length > 0 ? (
							<>
								<thead className="bg-primary hover:bg-hover">
									<tr>
										<th className="px-4 py-2 text-sm font-medium text-primary text-center">
											Title
										</th>
										<th className="px-4 py-2 text-sm font-medium text-primary text-center">
											Status
										</th>
										<th className="px-4 py-2 text-sm font-medium text-primary text-center">
											Priority
										</th>
										<th className="px-4 py-2 text-sm font-medium"></th>
									</tr>
								</thead>
								<tbody>
									{limitedTasks.map((task) => (
										<tr
											className="bg-primary hover:bg-hover"
											key={task.id}
										>
											<td className="px-4 py-2 text-sm text-gray-600 text-center">
												<span>{task.title}</span>
											</td>
											<td className="px-4 py-2 text-sm text-gray-600 text-center">
												<span className="text-sm text-gray-500">{task.status}</span>
											</td>
											<td className="px-4 py-2 text-sm text-gray-600 text-center">
												<span className="text-sm text-gray-500">{task.priority}</span>
											</td>
											<td className="px-4 py-2 text-sm text-gray-600 text-right flex justify-end">
												<Popover className="relative">
													<PopoverButton
														className="flex items-center outline-none px-2 py-0.5 rounded-lg text-primary hover:text-hover text-sm transition-all duration-300 transform hover:-translate-y-0.5"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<circle cx="12" cy="12" r="1"></circle>
															<circle cx="19" cy="12" r="1"></circle>
															<circle cx="5" cy="12" r="1"></circle>
														</svg>
													</PopoverButton>
													<PopoverPanel className="absolute z-10 mt-2 w-40 bg-primary rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<ul className="p-2">
															<li
																className="flex items-center cursor-pointer gap-2 px-4 py-2 hover:bg-hover rounded-md text-primary"
																onClick={() => setTaskBeingEdited(task)}
															>
																Edit Task
															</li>
															<li
																className="flex items-center cursor-pointer gap-2 px-4 py-2 hover:bg-hover rounded-md text-primary"
																onClick={() => deleteTask(task.id)}
															>
																Delete Task
															</li>
															{taskBeingEdited && (
																<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
																	<div className="bg-zinc-950 rounded-md p-6 w-96">
																		<h2 className="text-lg font-bold mb-4">Edit Task</h2>
																		<input
																			type="text"
																			placeholder="Task Title"
																			value={taskBeingEdited.title}
																			onChange={(e) =>
																				setTaskBeingEdited((prev) =>
																					prev ? { ...prev, title: e.target.value } : null
																				)
																			}
																			className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
																		/>
																		<select
																			value={taskBeingEdited.status}
																			onChange={(e) =>
																				setTaskBeingEdited((prev) =>
																					prev ? { ...prev, status: e.target.value as Task["status"] } : null
																				)
																			}
																			className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
																		>
																			<option value="todo">To Do</option>
																			<option value="inProgress">In Progress</option>
																			<option value="done">Done</option>
																			<option value="canceled">Canceled</option>
																		</select>
																		<select
																			value={taskBeingEdited.priority}
																			onChange={(e) =>
																				setTaskBeingEdited((prev) =>
																					prev ? { ...prev, priority: e.target.value as Task["priority"] } : null
																				)
																			}
																			className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
																		>
																			<option value="low">Low</option>
																			<option value="medium">Medium</option>
																			<option value="high">High</option>
																		</select>
																		<div className="flex justify-end gap-2">
																			<button
																				onClick={() => setTaskBeingEdited(null)}
																				className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition-all text-primary hover:text-hover duration-200"
																			>
																				Cancel
																			</button>
																			<button
																				onClick={() => {
																					if (taskBeingEdited) updateTask(taskBeingEdited);
																				}}
																				className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 text-primary hover:text-hover transition-all duration-200"
																			>
																				Save Task
																			</button>
																		</div>
																	</div>
																</div>
															)}
														</ul>
													</PopoverPanel>
												</Popover>
											</td>
										</tr>
									))}
								</tbody>
							</>
						) : (
							<p className="text-center text-gray-500">No tasks found.</p>
						)}
					</table>
				</div>
			</div>
		</div>
	)
}