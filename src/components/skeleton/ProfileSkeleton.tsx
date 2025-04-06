import React from 'react';
import {View, StyleSheet} from 'react-native';

import {colors} from '../../theme/colors';
import {ScreenContainer} from '../ScreenContainer';

export const ProfileSkeleton: React.FC = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.nameContainer}>
            <View style={styles.username} />
            <View style={styles.name} />
          </View>
        </View>

        <View style={styles.bioContainer}>
          <View style={styles.bio} />
          <View style={styles.bio} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statValue} />
            <View style={styles.statLabel} />
          </View>
          <View style={styles.statItem}>
            <View style={styles.statValue} />
            <View style={styles.statLabel} />
          </View>
          <View style={styles.statItem}>
            <View style={styles.statValue} />
            <View style={styles.statLabel} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitle} />
          <View style={styles.sectionContent}>
            {[...Array(3)].map((_, index) => (
              <View key={index} style={styles.repoItem}>
                <View style={styles.repoName} />
                <View style={styles.repoDescription} />
                <View style={styles.repoStats}>
                  <View style={styles.repoStat} />
                  <View style={styles.repoStat} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.skeleton,
    marginBottom: 16,
  },
  nameContainer: {
    alignItems: 'center',
  },
  username: {
    height: 24,
    width: '40%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 8,
  },
  name: {
    height: 20,
    width: '30%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
  bioContainer: {
    marginBottom: 20,
  },
  bio: {
    height: 16,
    width: '100%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    height: 24,
    width: 40,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 4,
  },
  statLabel: {
    height: 16,
    width: 60,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    height: 20,
    width: '30%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 12,
  },
  sectionContent: {
    gap: 12,
  },
  repoItem: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 12,
  },
  repoName: {
    height: 20,
    width: '40%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 8,
  },
  repoDescription: {
    height: 16,
    width: '80%',
    backgroundColor: colors.skeleton,
    borderRadius: 4,
    marginBottom: 8,
  },
  repoStats: {
    flexDirection: 'row',
    gap: 12,
  },
  repoStat: {
    height: 16,
    width: 60,
    backgroundColor: colors.skeleton,
    borderRadius: 4,
  },
});
