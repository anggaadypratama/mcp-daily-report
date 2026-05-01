import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { EmailSchema, GetEmailsSchema } from "../../schema/email.schema.js";
import {
  GitlabSchema,
  GitlabSchemaWithBranch,
} from "../../schema/gitlab.schema.js";

import { DIContainer } from "../../infrastructure/di/container.js";

export class DailyReportMcpServer {
  private server: McpServer;
  private container: DIContainer;

  constructor() {
    this.server = new McpServer({
      name: "daily_report",
      version: "1.0.0",
    });

    this.container = DIContainer.getInstance();
    this.registerTools();
  }

  private registerTools() {
    // Tool: Kirim Email
    this.server.tool(
      "send_email",
      "Mengirim email laporan harian lewat Gmail SMTP",
      EmailSchema,
      async ({ to, subject, text }) => {
        return await this.container.emailController.sendEmail(
          to,
          subject,
          text,
        );
      },
    );

    // Tool: Ambil Email (Inbox/Sent)
    this.server.tool(
      "get_emails",
      "Mengambil daftar email dari Inbox atau Sent folder menggunakan IMAP",
      GetEmailsSchema,
      async ({ mailbox, limit }) => {
        return await this.container.emailController.getEmails(
          mailbox as any,
          limit,
        );
      },
    );

    // Tool: List Projects
    this.server.tool(
      "gitlab_list_projects",
      "Mengambil daftar semua project GitLab",
      {},
      async () => {
        return await this.container.gitlabController.listProjects();
      },
    );

    // Tool: List Branches
    this.server.tool(
      "gitlab_list_branches",
      "Mengambil daftar branch",
      GitlabSchema,
      async ({ projectId }) => {
        return await this.container.gitlabController.listBranches(projectId);
      },
    );

    // Tool: Get Commits
    this.server.tool(
      "gitlab_get_commits",
      "Mengambil data commit",
      GitlabSchemaWithBranch,
      async ({ projectId, branch }) => {
        return await this.container.gitlabController.getCommits(
          projectId,
          branch,
        );
      },
    );
  }

  getServer() {
    return this.server;
  }
}
