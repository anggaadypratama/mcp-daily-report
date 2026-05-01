import { GitLabService } from "../../../infrastructure/services/gitlab.service.js";

export class GetCommitsUseCase {
  constructor(private gitlabService: GitLabService) {}

  async execute(projectId: string | number, branch: string) {
    const commits = await this.gitlabService.getCommits(projectId, branch);
    return commits.map((commit) => {
      return `
      Commit: ${commit.id}
      Title: ${commit.title}
      Author: ${commit.author_name}
      Committer: ${commit.committer_name}
      Email: ${commit.committer_email}
      Committed Date: ${commit.committed_date}
      Authored Date: ${commit.authored_date}
      Message: ${commit.message}
      Url:  ${commit.web_url}
      --------------------------
      `;
    });
  }
}
