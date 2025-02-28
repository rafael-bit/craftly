'use client'

import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskModal } from "./ui/TaskModal";
import { TaskList } from "./ui/TaskList";
import { TaskFilters } from "./ui/TaskFilters";
import CodeViewer from "./ui/codeViewer";
import { Task } from "../hooks/useTasks";

const INITIAL_TASKS: Task[] = [
	{ id: 1, title: "Task 1", status: "todo", priority: "low" },
	{ id: 2, title: "Task 2", status: "inProgress", priority: "medium" },
	{ id: 3, title: "Task 3", status: "done", priority: "high" },
	{ id: 4, title: "Task 4", status: "canceled", priority: "low" },
];

const componentCode = `// Complete source code for the Task Manager application
// Including all components, hooks, and types

// Types
interface Task {
	id: number;
	title: string;
	status: "todo" | "inProgress" | "done" | "canceled";
	priority: "low" | "medium" | "high";
}

interface TaskFilters {
	status: Record<string, boolean>;
	priority: Record<string, boolean>;
}

// Custom Hook
function useTasks(initialTasks: Task[] = []) {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [filterText, setFilterText] = useState("");
	const [visibleTaskCount, setVisibleTaskCount] = useState(5);
	const [filters, setFilters] = useState<TaskFilters>({
		status: { todo: false, inProgress: false, done: false, canceled: false },
		priority: { low: false, medium: false, high: false },
	});

	// Task operations
	const addTask = (newTask: Omit<Task, "id">) => {
		const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
		setTasks(prev => [...prev, { ...newTask, id: newId }]);
	};

	const updateTask = (task: Task) => {
		setTasks(prev => prev.map(t => t.id === task.id ? task : t));
	};

	const deleteTask = (id: number) => {
		setTasks(prev => prev.filter(t => t.id !== id));
	};

	// Filter operations
	const updateFilters = (type: keyof TaskFilters, key: string, value: boolean) => {
		setFilters(prev => ({
			...prev,
			[type]: { ...prev[type], [key]: value }
		}));
	};

	// Apply filters
	const filteredTasks = tasks.filter(task => {
		const titleMatch = task.title.toLowerCase().includes(filterText.toLowerCase());
		const statusMatch = Object.entries(filters.status)
			.some(([key, selected]) => selected && task.status === key);
		const priorityMatch = Object.entries(filters.priority)
			.some(([key, selected]) => selected && task.priority === key);

		return (titleMatch || !filterText) &&
			   (!Object.values(filters.status).includes(true) || statusMatch) &&
			   (!Object.values(filters.priority).includes(true) || priorityMatch);
	});

	return {
		tasks: filteredTasks.slice(0, visibleTaskCount),
		filterText,
		setFilterText,
		visibleTaskCount,
		setVisibleTaskCount,
		filters,
		updateFilters,
		addTask,
		updateTask,
		deleteTask,
	};
}

// Components
function TaskModal({ isOpen, onClose, onSubmit, initialData, mode }: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (task: Omit<Task, "id">) => void;
	initialData?: Task;
	mode: "add" | "edit";
}) {
	const [taskData, setTaskData] = useState<Omit<Task, "id">>({
		title: initialData?.title || "",
		status: initialData?.status || "todo",
		priority: initialData?.priority || "low",
	});

	if (!isOpen) return null;

	return (
	const handleSubmit = () => {
		if (taskData.title.trim() === "") return;
		onSubmit(taskData);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-zinc-950 rounded-md p-6 w-96">
				<h2 className="text-lg font-bold mb-4">{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
				<input
					type="text"
					placeholder="Task Title"
					value={taskData.title}
					onChange={(e) => setTaskData((prev) => ({ ...prev, title: e.target.value }))}
					className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
				/>
				<select
					value={taskData.status}
					onChange={(e) => setTaskData((prev) => ({ ...prev, status: e.target.value as Task["status"] }))}
					className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
				>
					<option value="todo">To Do</option>
					<option value="inProgress">In Progress</option>
					<option value="done">Done</option>
					<option value="canceled">Canceled</option>
				</select>
				<select
					value={taskData.priority}
					onChange={(e) => setTaskData((prev) => ({ ...prev, priority: e.target.value as Task["priority"] }))}
					className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-950 bg-zinc-900 text-primary border-zinc-800"
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<div className="flex justify-end gap-2">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition-all duration-200"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-all duration-200"
					>
						{mode === "add" ? "Add Task" : "Save Task"}
					</button>
				</div>
			</div>
		</div>
	);
};

interface TaskListProps {
	tasks: Task[];
	onUpdateTask: (task: Task) => void;
	onDeleteTask: (id: number) => void;
}

export const TaskList = ({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) => {
	const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);

	return (
		<div className="w-full border border-neutral-700 rounded-xl p-1">
			<table className="w-full border-collapse">
				{tasks.length > 0 ? (
					<>
						<thead className="bg-primary hover:bg-hover">
							<tr>
								<th className="px-4 py-2 text-sm font-medium text-primary text-center">Title</th>
								<th className="px-4 py-2 text-sm font-medium text-primary text-center">Status</th>
								<th className="px-4 py-2 text-sm font-medium text-primary text-center">Priority</th>
								<th className="px-4 py-2 text-sm font-medium"></th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr className="bg-primary hover:bg-hover" key={task.id}>
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
										<TaskActions
											task={task}
											onEdit={() => setTaskBeingEdited(task)}
											onDelete={() => onDeleteTask(task.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</>
				) : (
					<p className="text-center text-gray-500 py-4">No tasks found.</p>
				)}
			</table>

			<TaskModal
				isOpen={!!taskBeingEdited}
				onClose={() => setTaskBeingEdited(null)}
				onSubmit={(taskData) => {
					if (taskBeingEdited) {
						onUpdateTask({ ...taskData, id: taskBeingEdited.id });
					}
					setTaskBeingEdited(null);
				}}
				initialData={taskBeingEdited || undefined}
				mode="edit"
			/>
		</div>
	);
};

interface TaskFiltersProps {
	filters: TaskFilters;
	onFilterChange: (type: keyof TaskFilters, key: string, value: boolean) => void;
	visibleTaskCount: number;
	onVisibleTaskCountChange: (count: number) => void;
}

export const TaskFilters = ({
	filters,
	onFilterChange,
	visibleTaskCount,
	onVisibleTaskCountChange,
}: TaskFiltersProps) => {
	return (
		<div className="flex gap-2 w-full">
			<div className="flex justify-around w-full">
				<div className="flex gap-2">
					<StatusFilter
						selectedStatus={filters.status}
						onChange={(status, value) => onFilterChange("status", status, value)}
					/>
					<PriorityFilter
						selectedPriority={filters.priority}
						onChange={(priority, value) => onFilterChange("priority", priority, value)}
					/>
				</div>
				<ViewFilter
					currentCount={visibleTaskCount}
					onCountChange={onVisibleTaskCountChange}
				/>
			</div>
		</div>
	);
};

// Main Component
export default function Tasks() {
	const {
		tasks,
		filterText,
		setFilterText,
		visibleTaskCount,
		setVisibleTaskCount,
		filters,
		updateFilters,
		addTask,
		updateTask,
		deleteTask,
	} = useTasks(INITIAL_TASKS);

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="relative w-3/4 mx-auto mt-10 p-4 bg-primary rounded-md shadow-md">
			<h1 className="text-2xl font-bold text-gray-100 mb-4">Task Manager</h1>

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

				<TaskFilters
					filters={filters}
					onFilterChange={updateFilters}
					visibleTaskCount={visibleTaskCount}
					onVisibleTaskCountChange={setVisibleTaskCount}
				/>
			</div>

			<TaskList
				tasks={tasks}
				onUpdateTask={updateTask}
				onDeleteTask={deleteTask}
			/>

			<TaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={addTask}
				mode="add"
			/>
		</div>
	);
}`;

export default function Tasks() {
	const {
		tasks,
		filterText,
		setFilterText,
		visibleTaskCount,
		setVisibleTaskCount,
		filters,
		updateFilters,
		addTask,
		updateTask,
		deleteTask,
	} = useTasks(INITIAL_TASKS);

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div key="task-1" className="scrollbar">
			<CodeViewer componentCode={componentCode} />

			<div className="relative w-3/4 mx-auto mt-10 p-4 bg-primary rounded-md shadow-md">
				<h1 className="text-2xl font-bold text-gray-100 mb-4">Task Manager</h1>

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

					<TaskFilters
						filters={filters}
						onFilterChange={updateFilters}
						visibleTaskCount={visibleTaskCount}
						onVisibleTaskCountChange={setVisibleTaskCount}
					/>
				</div>

				<TaskList
					tasks={tasks}
					onUpdateTask={updateTask}
					onDeleteTask={deleteTask}
				/>

				<TaskModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubmit={addTask}
					mode="add"
				/>
			</div>
		</div>
	);
}