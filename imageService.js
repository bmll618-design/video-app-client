import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { uid } from '../utils/id';

const DIR = `${FileSystem.documentDirectory}images/`;

/** Copies an image into permanent app storage (picker/cache files can disappear). */
export async function persistImage(sourceUri) {
  const info = await FileSystem.getInfoAsync(DIR);
  if (!info.exists) await FileSystem.makeDirectoryAsync(DIR, { intermediates: true });
  const ext = (sourceUri.split('?')[0].split('.').pop() || 'jpg').slice(0, 4);
  const dest = `${DIR}${uid()}.${ext}`;
  await FileSystem.copyAsync({ from: sourceUri, to: dest });
  return dest;
}

/** Opens the gallery; returns a permanent local uri or null if cancelled. */
export async function pickFromGallery() {
  const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.9 });
  if (res.canceled) return null;
  return persistImage(res.assets[0].uri);
}

/** Resizes + compresses an image and returns it as a base64 data URI for the API. */
export async function toDataUri(uri) {
  const out = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 1280 } }], {
    compress: 0.8,
    format: ImageManipulator.SaveFormat.JPEG,
    base64: true,
  });
  return `data:image/jpeg;base64,${out.base64}`;
}
