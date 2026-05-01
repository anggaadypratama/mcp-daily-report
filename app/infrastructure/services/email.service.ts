import nodemailer from "nodemailer";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export class EmailService {
  async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Boolean(process.env.SMTP_SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    return await transporter.sendMail({
      from: `<${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
  }

  async getEmails(mailbox: "INBOX" | "Sent" = "INBOX", limit: number = 10) {
    if (!process.env.IMAP_HOST) {
      throw new Error("IMAP_HOST tidak ditemukan di .env! Kamu lupa ya? 💢");
    }

    const client = new ImapFlow({
      host: process.env.IMAP_HOST,
      port: Number(process.env.IMAP_PORT) || 993,
      secure: process.env.IMAP_SECURE !== "false",
      auth: {
        user: process.env.IMAP_USER || process.env.SMTP_USER || "",
        pass: process.env.IMAP_PASSWORD || process.env.SMTP_PASSWORD || "",
      },
      logger: false,
    });

    await client.connect();

    // Taktik buat nyari folder Sent yang bener
    let targetMailbox = mailbox;
    if (mailbox === "Sent") {
      const list = await client.list();
      const sentFolder = list.find(
        (m) =>
          m.specialUse === "\\Sent" || m.name.toLowerCase().includes("sent"),
      );
      if (sentFolder) {
        targetMailbox = sentFolder.path as "INBOX" | "Sent";
      }
    }

    try {
      const lock = await client.getMailboxLock(targetMailbox);
      const emails = [];

      try {
        const allUids = await client.search({ all: true });
        const targetUids =
          !allUids || allUids.length === 0 ? [] : allUids.slice(-limit);

        if (targetUids.length > 0) {
          const messages = client.fetch(targetUids, {
            envelope: true,
            source: true,
          });

          for await (const message of messages) {
            if (message.envelope) {
              emails.push({
                id: message.uid,
                subject: message.envelope.subject || "(No Subject)",
                from: message.envelope.from?.[0]?.address || "unknown",
                to: message.envelope.to?.[0]?.address || "unknown",
                date: message.envelope.date,
                message: (await simpleParser(message.source)).text || "",
              });
            }
          }
        }
      } finally {
        lock.release();
      }

      await client.logout();
      return emails;
    } catch (error: any) {
      await client.logout();
      throw new Error(`Gagal di folder ${targetMailbox}: ${error.message}`);
    }
  }
}
