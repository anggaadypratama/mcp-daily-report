export interface IProject {
  avatar_url: any;
  created_at: string;
  default_branch: string;
  description: any;
  forks_count: number;
  http_url_to_repo: string;
  id: number;
  last_activity_at: string;
  name: string;
  name_with_namespace: string;
  namespace: any;
  path: string;
  path_with_namespace: string;
  readme_url: string;
  ssh_url_to_repo: string;
  star_count: number;
  tag_list: any[];
  topics: any[];
  visibility: string;
  web_url: string;
}

export interface IBranch {
  can_push: boolean;
  commit: ICommit;
  default: boolean;
  developers_can_merge: boolean;
  developers_can_push: boolean;
  merged: boolean;
  name: string;
  protected: boolean;
  web_url: string;
}

export interface ICommit {
  author_email: string;
  author_name: string;
  authored_date: string;
  committed_date: string;
  committer_email: string;
  committer_name: string;
  created_at: string;
  id: string;
  message: string;
  short_id: string;
  title: string;
  web_url: string;
}
