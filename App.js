import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { ProjectProvider } from './src/context/ProjectContext';

export default function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <SafeAreaProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </ProjectProvider>
    </ThemeProvider>
  );
}
