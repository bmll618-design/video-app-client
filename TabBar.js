import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../theme';

const TABS = [
  { id: 'create', label: 'יצירה' },
  { id: 'characters', label: 'דמויות' },
  { id: 'locations', label: 'מקומות' },
  { id: 'images', label: 'תמונות' },
];

// Bottom navigation.
export default function TabBar({ active, onChange }) {
  return (
    <View style={styles.bar}>
      {TABS.map((t) => (
        <Pressable key={t.id} style={styles.tab} onPress={() => onChange(t.id)}>
          <Text style={[styles.text, active === t.id && styles.active]}>{t.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: 1, borderColor: theme.border, backgroundColor: theme.surface },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  text: { color: theme.muted, fontSize: 15 },
  active: { color: theme.accent, fontWeight: '700' },
});
