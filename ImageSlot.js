import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import ImagePickerModal from './ImagePickerModal';
import { theme } from '../theme';

// Square slot for one image (start / end / reference / character photo).
export default function ImageSlot({ label, uri, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.box} onPress={() => setOpen(true)}>
        {uri ? <Image source={{ uri }} style={styles.img} /> : <Text style={styles.plus}>+</Text>}
      </Pressable>
      {uri ? <Pressable onPress={() => onChange(null)}><Text style={styles.clear}>הסרה</Text></Pressable> : null}
      <ImagePickerModal visible={open} onClose={() => setOpen(false)} onPick={(u) => { onChange(u); setOpen(false); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, marginTop: 14, alignItems: 'center' },
  label: { color: theme.muted, marginBottom: 6, fontSize: 13 },
  box: { width: '100%', aspectRatio: 1, borderRadius: theme.radius, borderWidth: 1, borderColor: theme.border, borderStyle: 'dashed', backgroundColor: theme.surface, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  img: { width: '100%', height: '100%' },
  plus: { color: theme.muted, fontSize: 32 },
  clear: { color: theme.danger, marginTop: 6, fontSize: 13 },
});
