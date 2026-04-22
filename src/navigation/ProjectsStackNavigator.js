import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectsScreen from '../screens/ProjectsScreen';
import TowersScreen from '../screens/TowersScreen';
import FloorsScreen from '../screens/FloorsScreen';
import UnitsScreen from '../screens/UnitsScreen';
import InspectionDetailScreen from '../screens/InspectionDetailScreen';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export default function ProjectsStackNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="ProjectsList" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <Stack.Screen name="TowersList" component={TowersScreen} options={{ title: 'Towers' }} />
      <Stack.Screen name="FloorsList" component={FloorsScreen} options={{ title: 'Floors' }} />
      <Stack.Screen name="UnitsList" component={UnitsScreen} options={{ title: 'Units' }} />
      <Stack.Screen name="InspectionDetail" component={InspectionDetailScreen} options={{ title: 'Inspection' }} />
    </Stack.Navigator>
  );
}
