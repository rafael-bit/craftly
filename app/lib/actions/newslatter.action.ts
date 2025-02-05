'use server'

import { CreateContactResponse, Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @ref https://resend.com/docs/dashboard/audiences/introduction
 */

const audienceId = process.env.RESEND_AUDIENCE_ID;

type ActionState = CreateContactResponse | undefined;

export async function subscribeToEmailList(
	_previousState: ActionState,
	data: FormData
) {
	if (!audienceId) {
		throw new Error("Audience ID not defined on environments variables");
	}

	const email = data.get("email")?.toString();

	if (!email) {
		throw new Error("Email is required");
	}

	const contact = await resend.contacts.create({
		email,
		audienceId,
	});

	return contact;
}