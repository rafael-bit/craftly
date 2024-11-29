'use client'

import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
} from '@headlessui/react'
import {
	Bars3Icon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { products, callsToAction } from '@/constants/header'

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<header className="relative bg-primary bg-opacity-20 backdrop-blur-lg w-[95%] mx-auto rounded-3xl m-5 top-0  bg-primary/25 shadow-md z-50">
			<nav aria-label="Header" className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8">
				<div className={`flex lg:flex-1 transition-transform duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
					<Link href="#" className="-m-1.5 p-1.5 flex items-center gap-5">
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
				<PopoverGroup className="hidden sm:flex sm:gap-x-12 sm:mr-10 z-50">
					<Link
						href="/"
						className={`text-sm/6 font-semibold text-primary transition-all duration-300 transform hover:-translate-y-1 hover:text-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
							} delay-[50ms]`}
					>
						Docs
					</Link>
					<Popover className="relative">
						<PopoverButton
							className={`outline-none flex items-center gap-x-1 text-sm/6 font-semibold text-primary transition-all duration-300 transform hover:-translate-y-1 hover:text-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
								} delay-[50ms]`}
						>
							Components
							<ChevronDownIcon aria-hidden="true" className="size-5 flex-none" />
						</PopoverButton>

						<PopoverPanel
							transition
							className="absolute -left-40 top-full z-[10000] mt-3 w-screen max-w-md overflow-hidden bg-primary rounded-3xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
						>
							<div className="p-4">
								{products.map((item) => (
									<div
										key={item.name}
										className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-hover"
									>
										<div className="flex size-11 flex-none items-center justify-center rounded-lg bg-light group-hover:bg-lightHover">
											<item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-blue-700" />
										</div>
										<div className="flex-auto">
											<Link href={item.href} className="block font-semibold text-primary">
												{item.name}
												<span className="absolute inset-0" />
											</Link>
											<p className="mt-1 text-gray-400">{item.description}</p>
										</div>
									</div>
								))}
							</div>
							<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-primary">
								{callsToAction.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-primary hover:text-blue-600 hover:bg-hover"
									>
										<item.icon aria-hidden="true" className="size-5 flex-none text-blue-600" />
										{item.name}
									</Link>
								))}
							</div>
						</PopoverPanel>
					</Popover>
					<Link
						href="/"
						className={`text-sm/6 font-semibold text-primary transition-all duration-300 transform hover:-translate-y-1 hover:text-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
							} delay-[50ms]`}
					>
						Blocks
					</Link>
					<Link
						href="/"
						className={`text-sm/6 font-semibold text-primary transition-all duration-300 transform hover:-translate-y-1 hover:text-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
							} delay-[50ms]`}
					>
						Colors
					</Link>
				</PopoverGroup>
			</nav>
			<Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="fixed inset-0 z-10 bg-black bg-opacity-50">
				<div className="fixed inset-0 z-20 flex items-start justify-end">
					<DialogPanel className="w-full sm:max-w-xs bg-primary h-full px-6 py-6 overflow-y-auto">
						<div className="flex items-center justify-between mb-6">
							<Link href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Craftly</span>
								<Image src="/logo.png" alt="Craftly logo" width={65} height={65} />
							</Link>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-primary hover:text-hover"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>

						<div className="space-y-3">
							<Disclosure as="div">
								<Link href="#" className="block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">Docs</Link>
								<DisclosureButton className="w-full text-left text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover p-3">
									Components <ChevronDownIcon aria-hidden="true" className="inline w-5 h-5 ml-1" />
								</DisclosureButton>
								<DisclosurePanel className="pl-6 space-y-2">
									{[...products, ...callsToAction].map((item) => (
										<Link key={item.name} href={item.href} className="block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">
											{item.name}
										</Link>
									))}
								</DisclosurePanel>
							</Disclosure>
							<Link href="#" className="block px-3 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">Block</Link>
							<Link href="#" className="block px-3 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">Theme</Link>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</header>
	)
}