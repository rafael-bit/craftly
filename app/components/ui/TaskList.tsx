import { Task } from "@/app/hooks/useTasks";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState } from "react";
import { TaskModal } from "./TaskModal";

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

interface TaskActionsProps {
	task: Task;
	onEdit: () => void;
	onDelete: () => void;
}

const TaskActions = ({ onEdit, onDelete }: TaskActionsProps) => (
	<Popover className="relative">
		<PopoverButton className="flex items-center outline-none px-2 py-0.5 rounded-lg text-primary hover:text-hover text-sm transition-all duration-300 transform hover:-translate-y-0.5">
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
					onClick={onEdit}
				>
					Edit Task
				</li>
				<li
					className="flex items-center cursor-pointer gap-2 px-4 py-2 hover:bg-hover rounded-md text-primary"
					onClick={onDelete}
				>
					Delete Task
				</li>
			</ul>
		</PopoverPanel>
	</Popover>
); 