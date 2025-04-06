import React from 'react';
import {View, StyleSheet} from 'react-native';

import {colors} from '../../theme/colors';

const SearchResultSkeleton = () => (
  <View style={styles.userCard}>
    <View style={styles.userHeader}>
      <View style={styles.avatar} />
      <View style={styles.nameContainer}>
        <View style={styles.username} />
        <View style={styles.name} />
      </View>
    </View>

    <View style={styles.bioContainer}>
      <View style={styles.bio} />
    </View>

    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <View style={styles.statNumber} />
        <View style={styles.statLabel} />
      </View>
      <View style={styles.divider} />
      <View style={styles.statItem}>
        <View style={styles.statNumber} />
        <View style={styles.statLabel} />
      </View>
    </View>
  </View>
);

export const SearchSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {[...Array(4)].map((_, index) => (
        <SearchResultSkeleton key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    backgroundColor: colors.skeleton,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  nameContainer: {
    marginLeft: 12,
    flex: 1,
  },
  username: {
    height: 16,
    width: '40%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 4,
  },
  name: {
    height: 14,
    width: '30%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
  bioContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bio: {
    height: 14,
    width: '80%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
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
    height: 20,
    width: 30,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 4,
  },
  statLabel: {
    height: 14,
    width: 60,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
});
