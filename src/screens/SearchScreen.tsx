import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {ScreenContainer} from '../components/ScreenContainer';
import {SearchSkeleton} from '../components/skeleton/SearchSkeleton';
import {useGitHubUsers} from '../hooks/useGitHubUsers';
import {colors} from '../theme/colors';
import {GitHubUser} from '../types/github';
import {RootStackParamList} from '../types/navigation';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

export const SearchScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const {data: users, isLoading, isError} = useGitHubUsers(username);

  const handleFollowersPress = useCallback(
    (user: GitHubUser) => {
      navigation.navigate('UserList', {
        username: user.login,
        type: 'followers',
      });
    },
    [navigation],
  );

  const handleFollowingPress = useCallback(
    (user: GitHubUser) => {
      navigation.navigate('UserList', {
        username: user.login,
        type: 'following',
      });
    },
    [navigation],
  );

  const renderUserItem = useCallback(
    ({item}: {item: GitHubUser}) => (
      <View style={styles.userCard}>
        <View style={styles.userHeader}>
          <Image source={{uri: item.avatar_url}} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={styles.username}>{item.login}</Text>
            {Boolean(item.name) && <Text style={styles.name}>{item.name}</Text>}
          </View>
        </View>

        {item.bio && (
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{item.bio}</Text>
          </View>
        )}

        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => handleFollowersPress(item)}
            activeOpacity={0.7}>
            <Text style={styles.statNumber}>{item.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => handleFollowingPress(item)}
            activeOpacity={0.7}>
            <Text style={styles.statNumber}>{item.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [handleFollowersPress, handleFollowingPress],
  );

  const renderContent = () => {
    if (!username) {
      return (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Enter a username to search GitHub users
          </Text>
        </View>
      );
    }
    if (isError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error searching users</Text>
        </View>
      );
    }
    if (isLoading) {
      return <SearchSkeleton />;
    }
    if (users && users.length > 0) {
      return (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContainer}
        />
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No users found</Text>
      </View>
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/github-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>GitHub User Search</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search GitHub users"
            placeholderTextColor={colors.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {renderContent()}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  searchContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginTop: 20,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  nameContainer: {
    marginLeft: 12,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bioContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bio: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
