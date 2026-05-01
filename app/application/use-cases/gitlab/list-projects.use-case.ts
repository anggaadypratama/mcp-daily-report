import { GitLabService } from "../../../infrastructure/services/gitlab.service.js";

export class ListProjectsUseCase {
  constructor(private gitlabService: GitLabService) {}

  async execute() {
    const projects = await this.gitlabService.listProjects();
    return projects.map((p) => `- ${p.name} (ID: ${p.id})`).join("\n");
  }
}
