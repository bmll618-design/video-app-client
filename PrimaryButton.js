import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Main button; `secondary` renders the outlined variant.
export default function PrimaryButton({ title, onPress, disabled, secondary, style }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.btn, secondary && styles.secondary, disabled && styles.off, style]}>
      <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { marginTop: 16, padding: 14, borderRadius: theme.radius, backgroundColor: theme.accent, alignItems: 'center' },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.border },
  off: { opacity: 0.4 },
  text: { color: theme.bg, fontWeight: '700', fontSize: 16 },
  secondaryText: { color: theme.text },
});
