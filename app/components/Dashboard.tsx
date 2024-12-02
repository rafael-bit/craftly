import { MdOutlineExpandMore, MdOutlineExpandLess, MdAccountBalance } from "react-icons/md";

export default function Dashboard() {
	return (
		<div key="dash-1" className="flex flex-col items-center">
			<div className="flex flex-wrap md:flex-nowrap mb-4 w-full bg-primary p-7">
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
			<div className="p-4 border border-gray-600 shadow bg-gray-800 rounded-lg hover:bg-gray-700">
				<h2 className="text-gray-200 text-2xl font-bold mb-7 px-1 pt-4">Dashboard</h2>
				<div className="lg:flex justify-evenly items-center">
					<div className="text-lg font-semibold mb-4">
						<div className="mb-4">
							<label htmlFor="chartType" className="block text-lg font-semibold mb-2">Select Chart Type:</label>
							<select
								className="bg-gray-700 text-white rounded p-2"
							>
								<option value="pie">Pie Chart</option>
								<option value="bar">Bar Chart</option>
								<option value="line">Line Chart</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}