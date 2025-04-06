import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {ScreenContainer} from '../components/ScreenContainer';
import {ProfileSkeleton} from '../components/skeleton/ProfileSkeleton';
import {useGitHubUser} from '../hooks/useGitHubUser';
import {colors} from '../theme/colors';
import {RootStackParamList} from '../types/navigation';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export const ProfileScreen: React.FC = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {username} = route.params;

  const {data: user, isLoading, isError} = useGitHubUser(username);

  const handleFollowersPress = useCallback(() => {
    navigation.navigate('UserList', {
      username,
      type: 'followers',
    });
  }, [navigation, username]);

  const handleFollowingPress = useCallback(() => {
    navigation.navigate('UserList', {
      username,
      type: 'following',
    });
  }, [navigation, username]);

  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <ProfileSkeleton />
        </View>
      </ScreenContainer>
    );
  }

  if (isError || !user) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Text style={styles.errorText}>Failed to load user profile</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: user.avatar_url}} style={styles.avatar} />
          <Text style={styles.username}>{user.login}</Text>
          {Boolean(user.name) && <Text style={styles.name}>{user.name}</Text>}
        </View>

        {user.bio && (
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>
        )}

        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={handleFollowersPress}
            activeOpacity={0.7}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.statItem}
            onPress={handleFollowingPress}
            activeOpacity={0.7}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primaryLight,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  bioContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bio: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 20,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    marginTop: 20,
  },
  section: {
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  repoItem: {
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  repoName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  repoDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  repoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repoStat: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  repoList: {
    padding: 20,
  },
});
