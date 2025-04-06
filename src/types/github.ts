export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string | null;
  followers: number;
  following: number;
}

export interface GitHubUserList {
  login: string;
  id: number;
  avatar_url: string;
}
