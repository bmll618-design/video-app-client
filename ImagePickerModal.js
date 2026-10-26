import { Modal, View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useAppData } from '../../state/AppData';
import { pickFromGallery } from '../../services/imageService';
import { uid } from '../../utils/id';
import PrimaryButton from './PrimaryButton';
import { theme } from '../theme';

// Lets the user pick a photo from the gallery or reuse one from the app library.
export default function ImagePickerModal({ visible, onClose, onPick }) {
  const { images } = useAppData();

  /** Opens the gallery, stores the image in the library and returns it. */
  async function fromGallery() {
    const uri = await pickFromGallery();
    if (!uri) return;
    images.upsert({ id: uid(), uri, label: 'מהגלריה', source: 'gallery' });
    onPick(uri);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.page}>
        <Text style={styles.title}>בחירת תמונה</Text>
        <PrimaryButton title="מהגלריה" onPress={fromGallery} />
        <Text style={styles.sub}>מהספרייה שלי (פריימים, תמונות שנשמרו)</Text>
        <FlatList
          data={images.items}
          numColumns={3}
          keyExtractor={(i) => i.id}
          ListEmptyComponent={<Text style={styles.empty}>הספרייה ריקה</Text>}
          renderItem={({ item }) => (
            <Pressable style={styles.cell} onPress={() => onPick(item.uri)}>
              <Image source={{ uri: item.uri }} style={styles.img} />
            </Pressable>
          )}
        />
        <PrimaryButton title="סגירה" secondary onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.bg, padding: 20, paddingTop: 50 },
  title: { color: theme.text, fontSize: 22, fontWeight: '700' },
  sub: { color: theme.muted, marginTop: 20, marginBottom: 8 },
  empty: { color: theme.muted },
  cell: { flex: 1 / 3, aspectRatio: 1, padding: 3 },
  img: { flex: 1, borderRadius: 8, backgroundColor: theme.surface },
});
