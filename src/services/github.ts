import axios from 'axios';
import Config from 'react-native-config';

import {GitHubUser} from '../types/github';

const BASE_URL = 'https://api.github.com';

const GITHUB_TOKEN = Config.GITHUB_TOKEN;


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

export const searchUser = async (username: string): Promise<GitHubUser> => {
  const response = await axiosInstance.get(`/users/${username}`);
  return response.data;
};

export const searchUsers = async (query: string): Promise<GitHubUser[]> => {
  const response = await axiosInstance.get(
    `/search/users?q=${query}&per_page=10`,
  );
  return response.data.items;
};

export const getFollowers = async (
  username: string,
  page: number = 1,
): Promise<GitHubUser[]> => {
  const response = await axiosInstance.get(
    `/users/${username}/followers?per_page=30&page=${page}`,
  );
  return response.data;
};

export const getFollowing = async (
  username: string,
  page: number = 1,
): Promise<GitHubUser[]> => {
  const response = await axiosInstance.get(
    `/users/${username}/following?per_page=30&page=${page}`,
  );
  return response.data;
};
