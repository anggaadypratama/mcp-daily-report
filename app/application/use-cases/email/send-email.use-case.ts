import { EmailService } from "../../../infrastructure/services/email.service.js";

export class SendEmailUseCase {
  constructor(private emailService: EmailService) {}

  async execute(to: string, subject: string, text: string) {
    return await this.emailService.sendEmail(to, subject, text);
  }
}
