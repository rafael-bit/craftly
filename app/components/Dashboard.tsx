import { MdOutlineExpandMore, MdOutlineExpandLess, MdAccountBalance } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
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
import CodeViewer from "./ui/codeViewer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
	const data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Sales',
				data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
				backgroundColor: 'rgba(75, 192, 192, 0.5)',
			},
		]
	};

	const tableData = [
		{ id: 1, name: 'Crafty', amount: 12000, description: 'Transaction 1 description' },
		{ id: 2, name: 'Senna', amount: -500, description: 'Transaction 2 description' },
		{ id: 3, name: 'Verstappen', amount: 2000, description: 'Transaction 3 description' },
		{ id: 4, name: 'Prost', amount: 4500, description: 'Transaction 5 description' },
		{ id: 5, name: 'Schumacher', amount: -2500, description: 'Transaction 4 description' },
		{ id: 6, name: 'Hamilton', amount: 3645, description: 'Transaction 6 description' },
		{ id: 7, name: 'Fangio', amount: 785, description: 'Transaction 9 description' },
		{ id: 8, name: 'Clark', amount: -120, description: 'Transaction 7 description' },
		{ id: 9, name: 'Alonso', amount: 1412, description: 'Transaction 8 description' },
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
				font: {
					size: 18,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const componentCode = `
		import { MdOutlineExpandMore, MdOutlineExpandLess, MdAccountBalance } from "react-icons/md";
		import { RxAvatar } from "react-icons/rx";
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
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				datasets: [
					{
						label: 'Sales',
						data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000)),
						backgroundColor: 'rgba(75, 192, 192, 0.5)',
					},
				]
			};

			const tableData = [
				{ id: 1, name: 'Crafty', amount: 12000, description: 'Transaction 1 description' },
				{ id: 2, name: 'Senna', amount: -500, description: 'Transaction 2 description' },
				{ id: 3, name: 'Verstappen', amount: 2000, description: 'Transaction 3 description' },
				{ id: 4, name: 'Prost', amount: 4500, description: 'Transaction 5 description' },
				{ id: 5, name: 'Schumacher', amount: -2500, description: 'Transaction 4 description' },
				{ id: 6, name: 'Hamilton', amount: 3645, description: 'Transaction 6 description' },
				{ id: 7, name: 'Fangio', amount: 785, description: 'Transaction 9 description' },
				{ id: 8, name: 'Clark', amount: -120, description: 'Transaction 7 description' },
				{ id: 9, name: 'Alonso', amount: 1412, description: 'Transaction 8 description' },
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
						font: {
							size: 18,
						},
					},
				},
				scales: {
					y: {
						beginAtZero: true,
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
						<div className="w-full flex justify-around h-72">
							<Bar data={data} options={options} />
							<div>
								<div className="p-2 -mt-7">
									<div className="border rounded-xl border-neutral-700 p-2 max-h-96 overflow-y-scroll h-72 w-96 scrollbar">
										{tableData.map((item) => (
											<div
												key={item.id}
												className="flex items-center gap-4 border-b border-neutral-800 hover:bg-neutral-950 transition-all duration-300 p-4"
											>
												<RxAvatar className="w-12 h-12" />
												<div>
													<h3 className="text-xl font-semibold">{item.name}</h3>
													<p className={item.amount >= 0 ? "text-green-500" : "text-red-500"}>
														<span>{item.amount >= 0 ? "+ $" : "- $"}</span>
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
				</div>
			)
		}`;

	return (
		<div key="dash-1" className="scrollbar">
			<CodeViewer componentCode={componentCode} />

			<div className="flex flex-col items-center bg-primary p-7">
				<div className="flex items-center justify-center flex-wrap md:flex-nowrap mb-4 w-full bg-primary">
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
					<div className="w-full md:flex justify-around">
						<Bar data={data} options={options} className="md:!w-[50%] md:!h-[50%]"/>
						<div>
							<div className="p-2 md:-mt-7 mt-10">
								<div className="border rounded-xl border-neutral-700 p-2 max-h-96 overflow-y-scroll h-56 lg:h-64 xl:h-72 lg:w-72 xl:w-96 scrollbar">
									{tableData.map((item) => (
										<div
											key={item.id}
											className="flex items-center gap-4 border-b border-neutral-800 bg-neutral-950 transition-all duration-300 p-4"
										>
											<RxAvatar className="w-12 h-12" />
											<div>
												<h3 className="text-xl font-semibold">{item.name}</h3>
												<p className={`${item.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
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
			</div>
		</div>
	)
}