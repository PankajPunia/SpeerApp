import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {ProfileScreen} from '../screens/ProfileScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {UserListScreen} from '../screens/UserListScreen';
import {colors} from '../theme/colors';
import {RootStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.cardBackground,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          title: 'Profile',
        })}
      />
      <Stack.Screen
        name="UserList"
        component={UserListScreen}
        options={({route}) => ({
          title: route.params?.type === 'followers' ? 'Followers' : 'Following',
        })}
      />
    </Stack.Navigator>
  );
}; 