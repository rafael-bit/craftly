'use client'

import { Task } from "@/app/hooks/useTasks";
import { useState } from "react";

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (task: Omit<Task, "id">) => void;
	initialData?: Task;
	mode: "add" | "edit";
}

export const TaskModal = ({ isOpen, onClose, onSubmit, initialData, mode }: TaskModalProps) => {
	const [taskData, setTaskData] = useState<Omit<Task, "id">>({
		title: initialData?.title || "",
		status: initialData?.status || "todo",
		priority: initialData?.priority || "low",
	});

	if (!isOpen) return null;

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
						className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition-all duration-200 text-primary hover:text-hover"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-all duration-200 text-primary hover:text-hover"
					>
						{mode === "add" ? "Add Task" : "Save Task"}
					</button>
				</div>
			</div>
		</div>
	);
}; 