import { MdOutlineExpandMore, MdOutlineExpandLess, MdAccountBalance } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [
			{
				label: 'Sales',
				data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000)),
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
			},
		],
	};

	const tableData = [
		{ name: 'Crafty', amount: 12000, description: 'Transaction 1 description' },
		{ name: 'John', amount: -500, description: 'Transaction 2 description' },
		{ name: 'Alice', amount: 2000, description: 'Transaction 3 description' },
		{ name: 'Bob', amount: -2500, description: 'Transaction 4 description' },
		{ name: 'Emma', amount: 4500, description: 'Transaction 5 description' },
		{ name: 'Liam', amount: -120, description: 'Transaction 6 description' },
	];

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Monthly Sales Data',
			},
		},
	};
	return (
		<div key="dash-1" className="flex flex-col items-center bg-primary p-7">
			<div className="flex flex-wrap md:flex-nowrap mb-4 w-full bg-primary">
				<div className="border border-neutral-800 shadow bg-primary rounded-lg h-40 md:h-56 p-7 hover:bg-hover transition-all duration-300 w-5/6 mx-3">
					<h1 className="text-primary flex justify-between items-center text-2xl font-bold">
						Income
						<MdOutlineExpandLess />
					</h1>
					<p className="text-center text-3xl lg:text-4xl leading-10 mt-4 md:mt-14 text-primary">
						$ 7854,00
					</p>
				</div>

				<div className="border border-neutral-800 shadow bg-primary rounded-lg h-40 md:h-56 p-7 hover:bg-hover transition-all duration-300 w-5/6 mx-3">
					<h1 className="text-primary flex justify-between items-center text-2xl font-bold">
						Expense
						<MdOutlineExpandMore />
					</h1>
					<p className="text-center text-3xl lg:text-4xl leading-10 mt-4 md:mt-14 text-primary">
						$ -4587,00
					</p>
				</div>

				<div className="border border-neutral-800 shadow bg-primary rounded-lg h-40 md:h-56 p-7 hover:bg-hover transition-all duration-300 w-5/6 mx-3">
					<h1 className="text-primary flex justify-between items-center text-2xl font-bold">
						Balance
						<MdAccountBalance />
					</h1>
					<p className="text-center text-3xl lg:text-4xl leading-10 mt-4 md:mt-14 text-primary">
						$ 3267,00
					</p>
				</div>
			</div>
			<div className="w-[98%] p-4 border border-neutral-800 shadow bg-primary rounded-lg">
				<h2 className="text-primary text-2xl font-bold mb-7 px-1 pt-4">Dashboard</h2>
				<div className="w-full flex justify-between h-72">
					<Bar data={data} options={options} />
					<div className="max-w-md mx-auto p-4">
						<div className="border rounded-xl border-neutral-700 p-2 max-h-96 overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thumb-rounded h-56">
							{tableData.map((item, index) => (
								<div
									key={index}
									className="flex items-center gap-4 border-b border-neutral-800 hover:bg-hover transition-all duration-300 p-4"
								>
									<RxAvatar className="w-12 h-12" />
									<div>
										<h3 className="text-xl font-semibold">{item.name}</h3>
										<p
											className={`${item.amount >= 0 ? 'text-green-500' : 'text-red-500'
												}`}
										>
											{item.amount >= 0 ? '+ $' : '- $'}
											{Math.abs(item.amount).toLocaleString()}
										</p>
										<p className="text-xs text-primary">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}