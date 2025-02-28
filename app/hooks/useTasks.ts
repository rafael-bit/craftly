import { useState } from 'react';

export type Task = {
	id: number;
	title: string;
	status: "todo" | "inProgress" | "done" | "canceled";
	priority: "low" | "medium" | "high";
};

export type TaskFilters = {
	status: Record<string, boolean>;
	priority: Record<string, boolean>;
};

export const useTasks = (initialTasks: Task[] = []) => {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [filterText, setFilterText] = useState("");
	const [visibleTaskCount, setVisibleTaskCount] = useState(5);
	const [filters, setFilters] = useState<TaskFilters>({
		status: {
			todo: false,
			inProgress: false,
			done: false,
			canceled: false,
		},
		priority: {
			low: false,
			medium: false,
			high: false,
		},
	});

	const addTask = (newTask: Omit<Task, "id">) => {
		const newId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
		setTasks((prevTasks) => [...prevTasks, { ...newTask, id: newId }]);
	};

	const updateTask = (updatedTask: Task) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task
			)
		);
	};

	const deleteTask = (id: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	const updateFilters = (type: keyof TaskFilters, key: string, value: boolean) => {
		setFilters((prev) => ({
			...prev,
			[type]: { ...prev[type], [key]: value },
		}));
	};

	const filteredTasks = tasks.filter((task) => {
		const titleMatch = task.title.toLowerCase().includes(filterText.toLowerCase());
		const statusMatch = Object.entries(filters.status).some(
			([key, isSelected]) => isSelected && task.status === key
		);
		const priorityMatch = Object.entries(filters.priority).some(
			([key, isSelected]) => isSelected && task.priority === key
		);

		return (
			(titleMatch || !filterText) &&
			(statusMatch || !Object.values(filters.status).includes(true)) &&
			(priorityMatch || !Object.values(filters.priority).includes(true))
		);
	});

	const limitedTasks = filteredTasks.slice(0, visibleTaskCount);

	return {
		tasks: limitedTasks,
		totalTasks: filteredTasks.length,
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
}; 