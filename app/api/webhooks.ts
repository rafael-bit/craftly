import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

type Contact = {
	email: string;
};


async function getSubscribers() {
	if (!audienceId) {
		throw new Error('RESEND_AUDIENCE_ID não está definido.');
	}

	try {
		const response = await resend.contacts.list({ audienceId });

		if (response.data && Array.isArray(response.data)) {
			return response.data.map((contact: Contact) => ({ email: contact.email })) || [];
		} else {
			return [];
		}
	} catch (error) {
		console.error('Erro ao buscar assinantes do Resend:', error);
		return [];
	}
}


function verifyGitHubSignature(req: NextApiRequest, secret: string) {
	const signature = req.headers['x-hub-signature'] as string;
	const hmac = crypto.createHmac('sha1', secret);
	hmac.update(JSON.stringify(req.body), 'utf-8');
	const digest = `sha1=${hmac.digest('hex')}`;
	return signature === digest;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	const secret = process.env.GITHUB_WEBHOOK_SECRET;
	if (!secret) {
		return res.status(500).json({ error: 'GITHUB_WEBHOOK_SECRET não está definido.' });
	}

	if (!verifyGitHubSignature(req, secret)) {
		return res.status(401).json({ error: 'Assinatura inválida.' });
	}

	const { ref, repository, pusher, head_commit } = req.body;

	if (ref === 'refs/heads/main') {
		const repoName = repository.name;
		const commitMessage = head_commit.message;
		const pusherName = pusher.name;

		const emailSubject = `🚀 Atualização no repositório ${repoName}!`;
		const emailContent = `
      <p>Olá,</p>
      <p><strong>${pusherName}</strong> fez uma atualização no repositório <strong>${repoName}</strong>:</p>
      <blockquote>${commitMessage}</blockquote>
      <p>Veja mais detalhes no GitHub: <a href="${repository.html_url}">${repository.html_url}</a></p>
    `;

		try {
			const subscribers = await getSubscribers();
			if (subscribers.length === 0) {
				return res.status(200).json({ message: 'Nenhum assinante encontrado.' });
			}

			for (const subscriber of subscribers) {
				await resend.emails.send({
					from: 'no-reply@craftly.com',
					to: subscriber.email,
					subject: emailSubject,
					html: emailContent,
				});
			}

			return res.status(200).json({ message: 'Notificações enviadas com sucesso!' });
		} catch (error) {
			console.error('Erro ao enviar e-mails:', error);
			return res.status(500).json({ error: 'Erro ao enviar e-mails' });
		}
	}

	res.status(200).json({ message: 'Evento ignorado' });
}
