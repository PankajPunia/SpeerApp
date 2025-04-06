import {useInfiniteQuery} from '@tanstack/react-query';

import {getFollowers, getFollowing} from '../services/github';
import {GitHubUser} from '../types/github';

export const useGitHubUserList = (
  username: string,
  type: 'followers' | 'following',
) => {
  return useInfiniteQuery<GitHubUser[], Error>({
    queryKey: [type, username],
    queryFn: async ({pageParam = 1}) => {
      const data = await (type === 'followers'
        ? getFollowers(username, pageParam as number)
        : getFollowing(username, pageParam as number));
      return data;
    },
    getNextPageParam: (lastPage: GitHubUser[], allPages) => {
      // If we have less than 30 items, we've reached the end
      if (lastPage.length < 30) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: username.length > 0,
    initialPageParam: 1,
    retry: 1,
  });
};
