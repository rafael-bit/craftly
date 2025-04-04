'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
	Dialog,
	DialogPanel
} from '@headlessui/react'
import {
	Bars3Icon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Components', href: '/component' },
	{ name: 'Icons', href: '/Icons' },
	{ name: 'Colors', href: '/colors' },
	{ name: 'Grid Generator', href: '/gridGenerator' },
]

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleCloseMenu = () => {
		setMobileMenuOpen(false);
	};

	return (
		<header className="relative bg-primary bg-opacity-20 w-[95%] mx-auto rounded-3xl m-5 top-0  bg-primary/25 shadow-md z-50">
			<nav aria-label="Header" className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8">
				<div className={`flex lg:flex-1 transition-transform duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
					<Link href="/" className="-m-1.5 p-1.5 flex items-center gap-5">
						<span className="sr-only">Craftly</span>
						<Image
							alt=""
							src="/logo-noBorder.png"
							width={65}
							height={65}
						/>
						<h1 className="text-2xl font-bold text-primary hover:text-hover duration-300">Craftly</h1>
					</Link>
				</div>
				<div className="flex sm:hidden mr-5">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="size-6" />
					</button>
				</div>
				<div className="hidden sm:flex justify-between gap-4">
					{navigation.map((item) => {
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.name}
								href={item.href}
								className={`text-sm/6 font-semibold transition-all duration-300 transform
        				${isActive ? 'text-hover -translate-y-1' : 'text-primary opacity-80'}
        				${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        				hover:-translate-y-1 hover:text-hover delay-[50ms]`}
							>
								{item.name}
							</Link>
						)
					})}
				</div>
			</nav>
			<Dialog open={mobileMenuOpen} onClose={handleCloseMenu} className="fixed inset-0 z-10 bg-black bg-opacity-50">
				<div className="fixed inset-0 z-20 flex items-start justify-end">
					<DialogPanel className="w-full sm:max-w-xs bg-primary h-full px-6 py-6 overflow-y-auto">
						<div className="flex items-center justify-between mb-6">
							<Link href="#" onClick={handleCloseMenu} className="-m-1.5 p-1.5">
								<span className="sr-only">Craftly</span>
								<Image src="/logo.png" alt="Craftly logo" width={65} height={65} />
							</Link>
							<button
								type="button"
								onClick={handleCloseMenu}
								className="-m-2.5 rounded-md p-2.5 text-primary hover:text-hover"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>

						<div className="space-y-3">
							{navigation.map((item) => {
								return (
									<Link
										key={item.name}
										href={item.href}
										className="block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover"
									>
										{item.name}
									</Link>
								)
							})}
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</header>
	)
}