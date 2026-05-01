import type {
  IProject,
  IBranch,
  ICommit,
} from "../../domain/models/gitlab.model.js";

export class GitLabService {
  private readonly gitlabUrl: string;
  private readonly gitlabToken: string;

  constructor() {
    this.gitlabUrl = process.env.GITLAB_URL || "https://gitlab.com/api/v4";
    this.gitlabToken = process.env.GITLAB_TOKEN || "";

    if (!this.gitlabToken) {
      throw new Error("Hmph! GITLAB_TOKEN belum diisi di .env! Dasar Baka!");
    }
  }

  private get headers() {
    return {
      "PRIVATE-TOKEN": this.gitlabToken,
    };
  }

  async listProjects(): Promise<IProject[]> {
    const response = await fetch(
      `${this.gitlabUrl}/projects?membership=true&simple=true&per_page=50&order_by=last_activity_at`,
      { headers: this.headers },
    );
    if (!response.ok) throw new Error(`GitLab error: ${response.status}`);
    return (await response.json()) as IProject[];
  }

  async listBranches(projectId: string | number): Promise<IBranch[]> {
    const response = await fetch(
      `${this.gitlabUrl}/projects/${encodeURIComponent(projectId)}/repository/branches`,
      { headers: this.headers },
    );
    if (!response.ok) throw new Error(`GitLab error: ${response.status}`);
    return (await response.json()) as IBranch[];
  }

  async getCommits(
    projectId: string | number,
    branch: string,
  ): Promise<ICommit[]> {
    const response = await fetch(
      `${this.gitlabUrl}/projects/${encodeURIComponent(projectId)}/repository/commits?ref_name=${encodeURIComponent(branch)}&per_page=20`,
      { headers: this.headers },
    );
    if (!response.ok) throw new Error(`GitLab error: ${response.status}`);
    return (await response.json()) as ICommit[];
  }
}
