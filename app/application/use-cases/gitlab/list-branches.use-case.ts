import { GitLabService } from "../../../infrastructure/services/gitlab.service.js";

export class ListBranchesUseCase {
  constructor(private gitlabService: GitLabService) {}

  async execute(projectId: string | number) {
    const branches = await this.gitlabService.listBranches(projectId);
    return branches.map((b) => `- ${b.name}`).join("\n");
  }
}
