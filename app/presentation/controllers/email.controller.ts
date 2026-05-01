import { SendEmailUseCase } from "../../application/use-cases/email/send-email.use-case.js";
import { GetEmailsUseCase } from "../../application/use-cases/email/get-emails.use-case.js";

export class EmailController {
  constructor(
    private sendEmailUseCase: SendEmailUseCase,
    private getEmailsUseCase: GetEmailsUseCase,
  ) {}

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.sendEmailUseCase.execute(to, subject, text);
      return {
        content: [
          {
            type: "text" as const,
            text: `Hmph! Email berhasil dikirim ke ${to}.`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Gagal kirim email: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async getEmails(mailbox: "INBOX" | "Sent" = "INBOX", limit: number = 10) {
    try {
      const emails = await this.getEmailsUseCase.execute(mailbox, limit);
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(emails, null, 2) },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Gagal mengambil email: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
}
