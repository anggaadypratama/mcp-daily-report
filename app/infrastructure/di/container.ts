// Services
import { GitLabService } from "../services/gitlab.service.js";
import { EmailService } from "../services/email.service.js";

// Use Cases
import { ListProjectsUseCase } from "../../application/use-cases/gitlab/list-projects.use-case.js";
import { ListBranchesUseCase } from "../../application/use-cases/gitlab/list-branches.use-case.js";
import { GetCommitsUseCase } from "../../application/use-cases/gitlab/get-commits.use-case.js";
import { SendEmailUseCase } from "../../application/use-cases/email/send-email.use-case.js";
import { GetEmailsUseCase } from "../../application/use-cases/email/get-emails.use-case.js";

// Controllers
import { GitLabController } from "../../presentation/controllers/gitlab.controller.js";
import { EmailController } from "../../presentation/controllers/email.controller.js";

export class DIContainer {
  private static instance: DIContainer;

  // Services
  public readonly gitlabService: GitLabService;
  public readonly emailService: EmailService;

  // Use Cases
  public readonly listProjectsUseCase: ListProjectsUseCase;
  public readonly listBranchesUseCase: ListBranchesUseCase;
  public readonly getCommitsUseCase: GetCommitsUseCase;
  public readonly sendEmailUseCase: SendEmailUseCase;
  public readonly getEmailsUseCase: GetEmailsUseCase;

  // Controllers
  public readonly gitlabController: GitLabController;
  public readonly emailController: EmailController;

  private constructor() {
    // Initialize Services
    this.gitlabService = new GitLabService();
    this.emailService = new EmailService();

    // Initialize Use Cases
    this.listProjectsUseCase = new ListProjectsUseCase(this.gitlabService);
    this.listBranchesUseCase = new ListBranchesUseCase(this.gitlabService);
    this.getCommitsUseCase = new GetCommitsUseCase(this.gitlabService);
    this.sendEmailUseCase = new SendEmailUseCase(this.emailService);
    this.getEmailsUseCase = new GetEmailsUseCase(this.emailService);

    // Initialize Controllers
    this.gitlabController = new GitLabController(
      this.listProjectsUseCase,
      this.listBranchesUseCase,
      this.getCommitsUseCase
    );
    this.emailController = new EmailController(
      this.sendEmailUseCase,
      this.getEmailsUseCase
    );
  }

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }
}
