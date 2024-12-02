import { FaGithub, FaGoogle } from "react-icons/fa";

export default function Auth() {
	return (
		<div key="auth-1" className="flex flex-col items-center justify-center">
			<div className='border-none shadow-2xl'>
				<div className=' md:p-16 flex flex-col justify-center relative z-20'>
					<div>
						<h1 className='text-4xl font-semibold text-center mb-5'>Login</h1>
						<p className='text-center text-primary text-xs mb-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa quae vitae nulla sit qui culpa.</p>
					</div>
					<div>
						<div>
							<button className="w-full hover:bg-hover text-primary flex items-center justify-center my-2 py-2 px-4 rounded-lg">
								<FaGithub className="mr-2 h-5 w-5" />
								Continue with GitHub
							</button>
							<button className="w-full hover:bg-hover text-primary flex items-center justify-center py-2 px-4 rounded-lg">
								<FaGoogle className="mr-2 h-5 w-5" />
								Continue with Google
							</button>
						</div>
						<div className="relative my-5">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t"></span>
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground text-primary">Or continue with</span>
							</div>
						</div>
						<form>
							<div className="grid w-full items-center gap-4 mt-4">
								<div className="flex flex-col">
									<label className="text-primary pb-1" htmlFor="email">Email</label>
									<input
										id="email"
										type="email"
										placeholder="Enter your email"
										required
										className="py-1.5 pl-1.5 bg-primary outline-none border-b"
									/>
									<label className="text-primary pt-5 pb-1" htmlFor="email">Password</label>
									<input
										id="password"
										type="password"
										placeholder="Password"
										required
										className="py-1.5 pl-1.5 bg-primary outline-none border-b"
									/>
								</div>
							</div>
						</form>
					</div>
					<div className="mt-5 flex flex-col border border-neutral-400 transition-all duration-300 hover:bg-hover py-1.5 rounded-lg">
						<button className="w-full">Login</button>
					</div>
				</div>
			</div>
		</div>
	)
}