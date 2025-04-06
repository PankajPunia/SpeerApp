import React from 'react';
import {View, StyleSheet} from 'react-native';

import {colors} from '../../theme/colors';
import {ScreenContainer} from '../ScreenContainer';

const SkeletonItem = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonAvatar} />
    <View style={styles.skeletonContent}>
      <View style={styles.skeletonUsername} />
      <View style={styles.skeletonName} />
      <View style={styles.skeletonBio} />
    </View>
  </View>
);

export const UserListSkeleton: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        {[...Array(8)].map((_, i) => (
          <SkeletonItem key={`skeleton-${i}`} />
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  skeletonCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    marginBottom: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.skeleton,
  },
  skeletonContent: {
    marginLeft: 12,
    flex: 1,
  },
  skeletonUsername: {
    height: 16,
    width: '40%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 4,
  },
  skeletonName: {
    height: 14,
    width: '30%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonBio: {
    height: 14,
    width: '80%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
});
