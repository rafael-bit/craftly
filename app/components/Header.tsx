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
		<header className="fixed bg-primary bg-opacity-20 backdrop-blur-lg w-[95%] border border-gray-700 mx-auto rounded-3xl m-5">
			<nav aria-label="Header" className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8">
				<div className={`flex lg:flex-1 transition-transform duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
					<Link href="#" className="-m-1.5 p-1.5 flex items-center gap-5">
						<span className="sr-only">Craftly</span>
						<Image
							alt=""
							src="/logo.png"
							width={70}
							height={70}
						/>
						<h1 className="text-2xl font-bold text-primary hover:text-hover duration-300">Craftly</h1>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="size-6" />
					</button>
				</div>
				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<a href="/" className={`text-sm/6 font-semibold text-primary hover:text-hover duration-300 transition-opacity transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-[0ms]`}>
						Home
					</a>
					<Popover className="relative">
						<PopoverButton className={`flex items-center gap-x-1 text-sm/6 font-semibold text-primary hover:text-hover duration-300 transition-opacity transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-[150ms]`}>
							Components
							<ChevronDownIcon aria-hidden="true" className="size-5 flex-none" />
						</PopoverButton>

						<PopoverPanel
							transition
							className="absolute -left-8 top-full z-50 mt-3 w-screen max-w-md overflow-hidden bg-primary rounded-3xl shadow-lg ring-1 ring-gray-300/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in -ml-32"
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
											<a href={item.href} className="block font-semibold text-primary">
												{item.name}
												<span className="absolute inset-0" />
											</a>
											<p className="mt-1 text-gray-400">{item.description}</p>
										</div>
									</div>
								))}
							</div>
							<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-primary">
								{callsToAction.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-primary hover:text-blue-600 hover:bg-hover"
									>
										<item.icon aria-hidden="true" className="size-5 flex-none text-blue-600" />
										{item.name}
									</a>
								))}
							</div>
						</PopoverPanel>
					</Popover>

					<a href="#" className={`text-sm/6 font-semibold text-primary hover:text-hover duration-300 transition-opacity transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} delay-[300ms]`}>
						About
					</a>

				</PopoverGroup>
			</nav>
			<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
				<div className="inset-0 z-10" />
				<DialogPanel className="inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Craftly</span>
							<img
								alt=""
								src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
								className="h-8 w-auto"
							/>
						</a>
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="size-6" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<Disclosure as="div" className="-mx-3">
									<DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
										Product
										<ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
									</DisclosureButton>
									<DisclosurePanel className="mt-2 space-y-2">
										{[...products, ...callsToAction].map((item) => (
											<DisclosureButton
												key={item.name}
												as="a"
												href={item.href}
												className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
											>
												{item.name}
											</DisclosureButton>
										))}
									</DisclosurePanel>
								</Disclosure>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
								>
									Features
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
								>
									Marketplace
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
								>
									Company
								</a>
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	)
}