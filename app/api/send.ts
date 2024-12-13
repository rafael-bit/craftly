import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ message: 'Email is required' });
		}

		try {
			await resend.emails.send({
				from: 'raquila743@gmail.com',
				to: email,
				subject: 'New Component Added!',
				html: '<h1>Check out the new components added to Craftly!</h1>',
			});
			return res.status(200).json({ message: 'Email sent successfully!' });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Failed to send email' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}