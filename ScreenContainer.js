import { ScrollView, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Standard scrolling page with a title.
export default function ScreenContainer({ title, children }) {
  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{title}</Text>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 60 },
  title: { color: theme.text, fontSize: 26, fontWeight: '700', marginBottom: 12 },
});
