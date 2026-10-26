import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { theme } from '../theme';

// Card for a saved character / location with edit + delete.
export default function ItemCard({ title, subtitle, imageUri, onEdit, onDelete }) {
  /** Confirms before deleting. */
  const confirmDelete = () => Alert.alert('מחיקה', `למחוק את "${title}"?`, [{ text: 'ביטול' }, { text: 'מחיקה', style: 'destructive', onPress: onDelete }]);
  return (
    <View style={styles.card}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.img} /> : <View style={[styles.img, styles.noImg]} />}
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub} numberOfLines={2}>{subtitle}</Text> : null}
        <View style={styles.row}>
          <PrimaryButton title="עריכה" secondary style={styles.btn} onPress={onEdit} />
          <PrimaryButton title="מחיקה" secondary style={styles.btn} onPress={confirmDelete} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 12, marginTop: 12, borderRadius: theme.radius, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border },
  img: { width: 84, height: 84, borderRadius: 10 },
  noImg: { backgroundColor: theme.border },
  body: { flex: 1 },
  title: { color: theme.text, fontSize: 17, fontWeight: '700' },
  sub: { color: theme.muted, marginTop: 2, fontSize: 13 },
  row: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, marginTop: 8, padding: 8 },
});
