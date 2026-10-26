import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../theme';

const LABELS = { waking: 'מעיר את השרת (עד דקה)', pending: 'בתור', running: 'יוצר סרטון, זה לוקח כמה דקות' };

// Progress text, server notes (e.g. dropped references) and errors.
export default function JobStatus({ job, notes, error }) {
  return (
    <View>
      {notes.map((n) => <Text key={n} style={styles.note}>{n}</Text>)}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {job && job.status !== 'succeeded' && !error ? (
        <View style={styles.row}>
          <ActivityIndicator color={theme.accent} />
          <Text style={styles.text}>{LABELS[job.status] || job.status}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18 },
  text: { color: theme.muted, flex: 1 },
  note: { color: theme.muted, marginTop: 10, fontSize: 13 },
  error: { color: theme.danger, marginTop: 18 },
});
