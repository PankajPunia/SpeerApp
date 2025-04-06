import {useQuery} from '@tanstack/react-query';

import {searchUser} from '../services/github';
import {GitHubUser} from '../types/github';

export const useGitHubUserDetails = (username: string) => {
  return useQuery<GitHubUser, Error>({
    queryKey: ['user-details', username],
    queryFn: () => searchUser(username),
    enabled: !!username,
    retry: 1,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });
};
