import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, FolderGit2, User } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProjectsStackNavigator from './ProjectsStackNavigator';
import { useTheme } from '../theme/ThemeContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Dashboard') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'ProjectsFlow') {
            return <FolderGit2 color={color} size={size} />;
          } else if (route.name === 'Profile') {
            return <User color={color} size={size} />;
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen 
        name="ProjectsFlow" 
        component={ProjectsStackNavigator} 
        options={{ title: 'Projects' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
