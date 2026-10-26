import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { persistImage } from './imageService';

const cachePath = (id) => `${FileSystem.cacheDirectory}video-${id}.mp4`;

/** Downloads the video once into the cache and returns the local path. */
export async function ensureLocalVideo(url, id) {
  const path = cachePath(id);
  const info = await FileSystem.getInfoAsync(path);
  if (info.exists) return path;
  const res = await FileSystem.downloadAsync(url, path);
  if (res.status !== 200) throw new Error('הורדת הסרטון נכשלה');
  return res.uri;
}

/** Asks for write permission (write-only is enough to save). */
async function requireGalleryPermission() {
  const perm = await MediaLibrary.requestPermissionsAsync(true);
  if (!perm.granted) throw new Error('אין הרשאה לשמירה בגלריה');
}

/** Saves the generated video to the phone gallery. */
export async function saveVideoToGallery(url, id) {
  await requireGalleryPermission();
  await MediaLibrary.saveToLibraryAsync(await ensureLocalVideo(url, id));
}

/** Saves any local image (e.g. an extracted frame) to the phone gallery. */
export async function saveImageToGallery(uri) {
  await requireGalleryPermission();
  await MediaLibrary.saveToLibraryAsync(uri);
}

/** Grabs the frame at `timeSec` from a local video; returns a permanent image uri. */
export async function extractFrame(localVideoUri, timeSec) {
  const { uri } = await VideoThumbnails.getThumbnailAsync(localVideoUri, { time: Math.round(timeSec * 1000), quality: 1 });
  return persistImage(uri);
}
