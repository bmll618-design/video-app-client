import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Multiline scene description field.
export default function PromptInput({ value, onChange }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder="מה קורה בסצנה? למשל: היא רצה בשלג עם הזריחה, צילום קולנועי"
      placeholderTextColor={theme.muted}
      multiline
      maxLength={2000}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 110, padding: 14, color: theme.text, backgroundColor: theme.surface,
    borderRadius: theme.radius, borderWidth: 1, borderColor: theme.border, textAlignVertical: 'top', fontSize: 16,
  },
});
