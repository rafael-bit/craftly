"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { subscribeToEmailList } from "@/app/lib/actions/newslatter.action";

export default function SubscribeToEmailList() {
	const [state, action, pending] = useActionState(subscribeToEmailList, undefined);

	return (
		<form
			action={action}
			className="lg:w-[400px] w-full mx-auto flex flex-col gap-1"
		>
			<div className="flex gap-1 w-full">
				<input
					name="email"
					type="email"
					required
					placeholder="Your best email"
					className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none transition-colors"
				/>

				<SubscribeButton />
			</div>

			{state?.data && <span className="mt-1 text-center">🎉 Success!</span>}
		</form>
	);
}

function SubscribeButton() {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			className="bg-blue-700 hover:bg-blue-600 text-white rounded-lg w-24 transition-all duration-300"
		>
			{pending ? "Subscribing..." : "Subscribe"}
		</button>
	);
}