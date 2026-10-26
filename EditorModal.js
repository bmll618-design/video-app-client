import { Modal, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Full-screen modal that hosts a form.
export default function EditorModal({ visible, onClose, children }) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: theme.bg }, content: { padding: 20, paddingTop: 50, paddingBottom: 60 } });
