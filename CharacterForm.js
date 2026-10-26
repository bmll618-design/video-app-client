import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TRAITS, VOICE_GENDERS } from '../../config/constants';
import { uid } from '../../utils/id';
import TextField from './TextField';
import Chips from './Chips';
import ImageSlot from './ImageSlot';
import PrimaryButton from './PrimaryButton';
import { theme } from '../theme';

const EMPTY = { name: '', age: '', appearance: '', traits: [], personalityNote: '', voiceGender: null, voiceTone: '', imageUri: null };

// Create / edit a character: look, age, personality, voice, reference photo.
export default function CharacterForm({ initial, onSave, onCancel }) {
  const [c, setC] = useState({ ...EMPTY, ...initial });
  const [error, setError] = useState(null);
  const set = (key) => (v) => setC((p) => ({ ...p, [key]: v }));

  /** Validates and hands the character back with a stable id. */
  function save() {
    if (!c.name.trim()) return setError('צריך שם לדמות');
    onSave({ ...c, id: c.id || uid(), name: c.name.trim() });
  }

  return (
    <>
      <TextField label="שם" value={c.name} onChange={set('name')} />
      <TextField label="גיל" value={c.age} onChange={set('age')} keyboardType="numeric" />
      <TextField label="מראה" value={c.appearance} onChange={set('appearance')} multiline placeholder="שיער, עיניים, לבוש, מבנה גוף, סימנים מיוחדים…" />
      <Chips label="תכונות אופי" multi options={TRAITS.map((t) => t.id)} value={c.traits} onChange={set('traits')} format={(id) => TRAITS.find((t) => t.id === id).he} />
      <TextField label="עוד על האופי (אופציונלי)" value={c.personalityNote} onChange={set('personalityNote')} />
      <Chips label="קול" options={VOICE_GENDERS.map((g) => g.id)} value={c.voiceGender} onChange={set('voiceGender')} format={(id) => VOICE_GENDERS.find((g) => g.id === id).he} />
      <TextField label="אופי הקול (אופציונלי)" value={c.voiceTone} onChange={set('voiceTone')} placeholder="חם, נמוך, מהיר, מבטא…" />
      <ImageSlot label="תמונת הדמות (לעקביות)" uri={c.imageUri} onChange={set('imageUri')} />
      <Text style={styles.hint}>Seedance חוסם תמונות של אנשים אמיתיים. עדיף איור, או פריים מסרטון שנוצר.</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton title="שמירה" onPress={save} />
      <PrimaryButton title="ביטול" secondary onPress={onCancel} />
    </>
  );
}

const styles = StyleSheet.create({
  hint: { color: theme.muted, fontSize: 12, marginTop: 8 },
  error: { color: theme.danger, marginTop: 8 },
});
