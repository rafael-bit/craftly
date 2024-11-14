import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
	ArrowPathIcon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
} from '@heroicons/react/24/outline'

export const products = [
	{ name: 'Header', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
	{ name: 'Aside', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
	{ name: 'Form', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
	{ name: 'Button', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
	{ name: 'Footer', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]

export const callsToAction = [
	{ name: 'Watch demo', href: '#', icon: PlayCircleIcon },
	{ name: 'About Us', href: '#', icon: PhoneIcon },
]