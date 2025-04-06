import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import {ScreenContainer} from '../components/ScreenContainer';
import {UserListSkeleton} from '../components/skeleton/UserListSkeleton';
import {useGitHubUserList} from '../hooks/useGitHubUserList';
import {colors} from '../theme/colors';
import {GitHubUser} from '../types/github';
import {RootStackParamList} from '../types/navigation';

type UserListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserList'
>;
type UserListScreenRouteProp = RouteProp<RootStackParamList, 'UserList'>;

export const UserListScreen: React.FC = () => {
  const route = useRoute<UserListScreenRouteProp>();
  const navigation = useNavigation<UserListScreenNavigationProp>();
  const {username, type} = route.params;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGitHubUserList(username, type);

  const handleUserPress = useCallback(
    (user: GitHubUser) => {
      navigation.navigate('Profile', {username: user.login});
    },
    [navigation],
  );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) {return null;}
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  };

  const renderUserItem = useCallback(
    ({item}: {item: GitHubUser}) => (
      <TouchableOpacity
        style={styles.userCard}
        onPress={() => handleUserPress(item)}
        activeOpacity={0.7}>
        <Image source={{uri: item.avatar_url}} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.login}</Text>
          {Boolean(item.name) && <Text style={styles.name}>{item.name}</Text>}
          {Boolean(item.bio) && <Text style={styles.bio}>{item.bio}</Text>}
        </View>
      </TouchableOpacity>
    ),
    [handleUserPress],
  );

  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <UserListSkeleton />
        </View>
      </ScreenContainer>
    );
  }

  if (isError) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Text style={styles.errorText}>Failed to load {type}</Text>
        </View>
      </ScreenContainer>
    );
  }

  const users = data?.pages.flat() || [];

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {users.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {type === 'followers'
                ? 'User has no followers'
                : 'User is not following anyone'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={item => item.id.toString()}
            renderItem={renderUserItem}
            contentContainerStyle={styles.listContainer}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
