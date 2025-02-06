import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID;

function verifyGitHubSignature(req: NextRequest, secret: string, body: string) {
	const signature256 = req.headers.get("x-hub-signature-256");
	if (!signature256) {
		console.error("❌ Nenhuma assinatura SHA-256 recebida.");
		return false;
	}

	const hmac = crypto.createHmac("sha256", secret);
	hmac.update(body, "utf-8");
	const digest = `sha256=${hmac.digest("hex")}`;

	return crypto.timingSafeEqual(Buffer.from(signature256), Buffer.from(digest));
}

async function getSubscribers() {
	if (!audienceId) {
		console.error("❌ RESEND_AUDIENCE_ID não está definido.");
		return [];
	}

	try {
		const response = await resend.contacts.list({ audienceId });
		if (response.data && Array.isArray(response.data)) {
			return response.data.map((contact) => contact.email);
		}
	} catch (error) {
		console.error("❌ Erro ao buscar assinantes:", error);
	}

	return [];
}

export async function POST(req: NextRequest) {
	const secret = process.env.GITHUB_WEBHOOK_SECRET;
	if (!secret) {
		return NextResponse.json({ error: "⚠️ GITHUB_WEBHOOK_SECRET não está definido." }, { status: 500 });
	}

	const body = await req.text();

	if (!verifyGitHubSignature(req, secret, body)) {
		console.error("❌ Assinatura inválida!");
		return NextResponse.json({ error: "Assinatura inválida." }, { status: 401 });
	}

	console.log("✅ Assinatura válida! Processando webhook...");

	const payload = JSON.parse(body);
	const { ref, repository, pusher, head_commit } = payload;

	if (ref === "refs/heads/main") {
		const repoName = repository.name;
		const commitMessage = head_commit.message;
		const pusherName = pusher.name;

		console.log(`🚀 Atualização no repositório ${repoName} por ${pusherName}: "${commitMessage}"`);

		const emailSubject = `🚀 Nova atualização no repositório ${repoName}!`;
		const emailContent = `
      <p>Olá,</p>
      <p><strong>${pusherName}</strong> fez uma atualização no repositório <strong>${repoName}</strong>:</p>
      <blockquote>${commitMessage}</blockquote>
      <p>Veja mais detalhes no GitHub: <a href="${repository.html_url}">${repository.html_url}</a></p>
    `;

		try {
			const subscribers = await getSubscribers();
			if (subscribers.length === 0) {
				console.log("⚠️ Nenhum assinante encontrado.");
				return NextResponse.json({ message: "Nenhum assinante encontrado." });
			}

			await Promise.all(
				subscribers.map((email) =>
					resend.emails.send({
						from: "no-reply@craftly.com",
						to: email,
						subject: emailSubject,
						html: emailContent,
					})
				)
			);

			console.log("✅ Notificações enviadas com sucesso!");
			return NextResponse.json({ message: "Notificações enviadas com sucesso!" });
		} catch (error) {
			console.error("❌ Erro ao enviar e-mails:", error);
			return NextResponse.json({ error: "Erro ao enviar e-mails" }, { status: 500 });
		}
	}

	return NextResponse.json({ message: "Evento ignorado" });
}