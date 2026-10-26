import { useState } from 'react';
import { SafeAreaView, View, Platform, StatusBar, StyleSheet } from 'react-native';
import { AppDataProvider } from './src/state/AppData';
import GenerateScreen from './src/ui/screens/GenerateScreen';
import CharactersScreen from './src/ui/screens/CharactersScreen';
import LocationsScreen from './src/ui/screens/LocationsScreen';
import ImagesScreen from './src/ui/screens/ImagesScreen';
import TabBar from './src/ui/components/TabBar';
import { theme } from './src/ui/theme';

const SCREENS = { create: GenerateScreen, characters: CharactersScreen, locations: LocationsScreen, images: ImagesScreen };

// Root: shared data provider + simple tab navigation.
export default function App() {
  const [tab, setTab] = useState('create');
  const Screen = SCREENS[tab];
  return (
    <AppDataProvider>
      <SafeAreaView style={styles.safe}>
        <View style={styles.body}><Screen /></View>
        <TabBar active={tab} onChange={setTab} />
      </SafeAreaView>
    </AppDataProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.bg, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  body: { flex: 1 },
});
