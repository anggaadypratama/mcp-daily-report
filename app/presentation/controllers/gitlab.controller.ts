import { ListProjectsUseCase } from "../../application/use-cases/gitlab/list-projects.use-case.js";
import { ListBranchesUseCase } from "../../application/use-cases/gitlab/list-branches.use-case.js";
import { GetCommitsUseCase } from "../../application/use-cases/gitlab/get-commits.use-case.js";

export class GitLabController {
  constructor(
    private listProjectsUseCase: ListProjectsUseCase,
    private listBranchesUseCase: ListBranchesUseCase,
    private getCommitsUseCase: GetCommitsUseCase,
  ) {}

  async listProjects() {
    try {
      const result = await this.listProjectsUseCase.execute();
      return {
        content: [
          { type: "text" as const, text: `Nih daftar projectnya:\n\n${result}` },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          { type: "text" as const, text: `Gagal ambil list project: ${error.message}` },
        ],
        isError: true,
      };
    }
  }

  async listBranches(projectId: string | number) {
    try {
      const result = await this.listBranchesUseCase.execute(projectId);
      return {
        content: [
          { type: "text" as const, text: `Branch buat ${projectId}:\n\n${result}` },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          { type: "text" as const, text: `Gagal ambil branch: ${error.message}` },
        ],
        isError: true,
      };
    }
  }

  async getCommits(projectId: string | number, branch: string) {
    try {
      const result = await this.getCommitsUseCase.execute(projectId, branch);
      return {
        content: [
          { type: "text" as const, text: `Commit di ${branch}:\n\n${result}` },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          { type: "text" as const, text: `Gagal ambil commits: ${error.message}` },
        ],
        isError: true,
      };
    }
  }
}
