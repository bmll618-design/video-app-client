import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Labeled text input.
export default function TextField({ label, value, onChange, placeholder, multiline, keyboardType }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multi]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.muted}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 14 },
  label: { color: theme.muted, marginBottom: 6, fontSize: 13 },
  input: { padding: 12, color: theme.text, backgroundColor: theme.surface, borderRadius: theme.radius, borderWidth: 1, borderColor: theme.border, fontSize: 16 },
  multi: { minHeight: 80, textAlignVertical: 'top' },
});
