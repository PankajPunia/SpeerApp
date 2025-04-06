import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {ProfileScreen} from './src/screens/ProfileScreen';
import {SearchScreen} from './src/screens/SearchScreen';
import {UserListScreen} from './src/screens/UserListScreen';
import {colors} from './src/theme/colors';
import {RootStackParamList} from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
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
              title:
                route.params?.type === 'followers' ? 'Followers' : 'Following',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
