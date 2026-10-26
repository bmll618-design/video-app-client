import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Chip row. Single-select by default; `multi` makes `value` an array.
export default function Chips({ label, options, value, onChange, format = String, multi = false, emptyText }) {
  const isActive = (o) => (multi ? value.includes(o) : o === value);
  const press = (o) => (multi ? onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]) : onChange(o));
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      {!options.length && emptyText ? <Text style={styles.empty}>{emptyText}</Text> : null}
      <View style={styles.row}>
        {options.map((o) => (
          <Pressable key={String(o)} onPress={() => press(o)} style={[styles.chip, isActive(o) && styles.active]}>
            <Text style={[styles.text, isActive(o) && styles.activeText]}>{format(o)}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 14 },
  label: { color: theme.muted, marginBottom: 6, fontSize: 13 },
  empty: { color: theme.muted, fontSize: 13 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: theme.border },
  active: { backgroundColor: theme.accent, borderColor: theme.accent },
  text: { color: theme.text },
  activeText: { color: theme.bg, fontWeight: '600' },
});
