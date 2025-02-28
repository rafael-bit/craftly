import { TaskFilters as TaskFiltersType } from "@/app/hooks/useTasks";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { RiProgress1Line, RiProgress4Line, RiProgress8Line } from "react-icons/ri";
import { FaRegTimesCircle, FaRegArrowAltCircleDown, FaRegArrowAltCircleRight, FaRegArrowAltCircleUp } from "react-icons/fa";

interface TaskFiltersProps {
	filters: TaskFiltersType;
	onFilterChange: (type: keyof TaskFiltersType, key: string, value: boolean) => void;
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

const StatusFilter = ({
	selectedStatus,
	onChange,
}: {
	selectedStatus: Record<string, boolean>;
	onChange: (status: string, value: boolean) => void;
}) => (
	<Popover className="relative">
		<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			</svg>
			Status
		</PopoverButton>
		<PopoverPanel className="absolute z-[10000] mt-3 w-44 overflow-hidden bg-primary rounded-xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in px-2 py-3 text-primary">
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
							checked={selectedStatus[status.key]}
							onChange={(e) => onChange(status.key, e.target.checked)}
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
);

const PriorityFilter = ({
	selectedPriority,
	onChange,
}: {
	selectedPriority: Record<string, boolean>;
	onChange: (priority: string, value: boolean) => void;
}) => (
	<Popover>
		<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			</svg>
			Priority
		</PopoverButton>
		<PopoverPanel className="absolute z-[10000] mt-3 w-40 overflow-hidden bg-primary rounded-xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in px-2 py-3 text-primary">
			<div className="flex flex-col gap-2">
				{[
					{ key: "low", label: "Low", icon: <FaRegArrowAltCircleDown /> },
					{ key: "medium", label: "Medium", icon: <FaRegArrowAltCircleRight /> },
					{ key: "high", label: "High", icon: <FaRegArrowAltCircleUp /> },
				].map((priority) => (
					<label key={priority.key} className="flex items-center gap-3 cursor-pointer hover:bg-hover px-2 py-1 rounded">
						<input
							type="checkbox"
							checked={selectedPriority[priority.key]}
							onChange={(e) => onChange(priority.key, e.target.checked)}
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
);

const ViewFilter = ({
	currentCount,
	onCountChange,
}: {
	currentCount: number;
	onCountChange: (count: number) => void;
}) => (
	<Popover className="relative">
		<PopoverButton className="flex items-center outline-none border border-neutral-300 pl-1 pr-2 py-0.5 rounded-lg text-neutral-300 hover:text-neutral-50 gap-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5">
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
						onClick={() => onCountChange(count)}
					>
						Show {count} Tasks
					</li>
				))}
			</ul>
		</PopoverPanel>
	</Popover>
); 