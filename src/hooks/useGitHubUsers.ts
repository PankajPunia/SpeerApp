import {useQuery} from '@tanstack/react-query';

import {searchUsers, searchUser} from '../services/github';
import {GitHubUser} from '../types/github';

export const useGitHubUsers = (query: string) => {
  return useQuery<GitHubUser[], Error>({
    queryKey: ['users', query],
    queryFn: async () => {
      if (!query) {
        return [];
      }

      try {
        // First search for users
        const users = await searchUsers(query);

        // Then fetch complete user details for each user
        const usersWithDetails = await Promise.all(
          users.map(async (user: GitHubUser) => {
            try {
              // Fetch full user details
              const fullUserDetails = await searchUser(user.login);
              return fullUserDetails;
            } catch (error) {
              console.warn(
                `Failed to fetch details for user ${user.login}:`,
                error,
              );
              return user; // Return basic user info if detailed fetch fails
            }
          }),
        );

        return usersWithDetails;
      } catch (error) {
        console.error('Error in useGitHubUsers:', error);
        throw new Error('Failed to search users');
      }
    },
    enabled: query.length > 0,
    retry: 1,
  });
};
