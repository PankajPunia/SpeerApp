export type RootStackParamList = {
  Search: undefined;
  Profile: {username: string};
  UserList: {username: string; type: 'followers' | 'following'};
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
