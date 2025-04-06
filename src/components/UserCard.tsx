import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {colors} from '../theme/colors';
import {GitHubUserList} from '../types/github';

interface UserCardProps {
  user: GitHubUserList;
  onPress: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({user, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}>
      <Image source={{uri: user.avatar_url}} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.login}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  userInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});
