import { View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import { useAppData } from '../../state/AppData';
import { pickFromGallery } from '../../services/imageService';
import { saveImageToGallery } from '../../services/mediaService';
import { uid } from '../../utils/id';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../theme';

// Image library: frames, gallery picks. Tap = save to gallery, long-press = delete.
export default function ImagesScreen() {
  const { images } = useAppData();

  /** Adds a gallery photo to the library. */
  async function add() {
    const uri = await pickFromGallery();
    if (uri) images.upsert({ id: uid(), uri, label: 'מהגלריה', source: 'gallery' });
  }

  /** Saves the image to the phone gallery. */
  async function save(item) {
    try { await saveImageToGallery(item.uri); Alert.alert('נשמר בגלריה'); } catch (e) { Alert.alert('שגיאה', e.message); }
  }

  /** Confirms deleting from the library. */
  const askDelete = (item) => Alert.alert('מחיקה', 'להסיר מהספרייה?', [{ text: 'ביטול' }, { text: 'מחיקה', style: 'destructive', onPress: () => images.remove(item.id) }]);

  return (
    <ScreenContainer title="ספריית תמונות">
      <PrimaryButton title="הוספה מהגלריה" onPress={add} />
      <Text style={styles.hint}>לחיצה: שמירה בגלריה. לחיצה ארוכה: מחיקה.</Text>
      <View style={styles.grid}>
        {images.items.map((i) => (
          <Pressable key={i.id} style={styles.cell} onPress={() => save(i)} onLongPress={() => askDelete(i)}>
            <Image source={{ uri: i.uri }} style={styles.img} />
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hint: { color: theme.muted, marginTop: 10, fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  cell: { width: '33.33%', aspectRatio: 1, padding: 3 },
  img: { flex: 1, borderRadius: 8, backgroundColor: theme.surface },
});
