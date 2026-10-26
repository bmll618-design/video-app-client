import AsyncStorage from '@react-native-async-storage/async-storage';

/** Reads JSON from device storage, returning `fallback` on any failure. */
export async function loadJson(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** Writes JSON to device storage. */
export function saveJson(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}
