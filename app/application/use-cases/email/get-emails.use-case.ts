import { EmailService } from "../../../infrastructure/services/email.service.js";

export class GetEmailsUseCase {
  constructor(private emailService: EmailService) {}

  async execute(mailbox: "INBOX" | "Sent" = "INBOX", limit: number = 10) {
    return await this.emailService.getEmails(mailbox, limit);
  }
}
