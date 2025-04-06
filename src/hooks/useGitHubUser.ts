import {useQuery} from '@tanstack/react-query';

import {searchUser} from '../services/github';
import {GitHubUser} from '../types/github';

export const useGitHubUser = (username: string) => {
  return useQuery<GitHubUser, Error>({
    queryKey: ['user', username],
    queryFn: () => searchUser(username),
    enabled: username.length > 0,
    retry: 1,
  });
};
