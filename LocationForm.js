import { useState } from 'react';
import { Text } from 'react-native';
import { uid } from '../../utils/id';
import TextField from './TextField';
import ImageSlot from './ImageSlot';
import PrimaryButton from './PrimaryButton';
import { theme } from '../theme';

const EMPTY = { name: '', description: '', imageUri: null };

// Create / edit a location: name, description, optional photo.
export default function LocationForm({ initial, onSave, onCancel }) {
  const [l, setL] = useState({ ...EMPTY, ...initial });
  const [error, setError] = useState(null);
  const set = (key) => (v) => setL((p) => ({ ...p, [key]: v }));

  /** Validates and hands the location back with a stable id. */
  function save() {
    if (!l.name.trim()) return setError('צריך שם למקום');
    onSave({ ...l, id: l.id || uid(), name: l.name.trim() });
  }

  return (
    <>
      <TextField label="שם המקום" value={l.name} onChange={set('name')} />
      <TextField label="תיאור" value={l.description} onChange={set('description')} multiline placeholder="אווירה, תאורה, פרטים בולטים…" />
      <ImageSlot label="תמונת המקום" uri={l.imageUri} onChange={set('imageUri')} />
      {error ? <Text style={{ color: theme.danger, marginTop: 8 }}>{error}</Text> : null}
      <PrimaryButton title="שמירה" onPress={save} />
      <PrimaryButton title="ביטול" secondary onPress={onCancel} />
    </>
  );
}
