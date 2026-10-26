import { useState } from 'react';
import { Text } from 'react-native';
import { useAppData } from '../../state/AppData';
import { TRAITS, VOICE_GENDERS } from '../../config/constants';
import ScreenContainer from '../components/ScreenContainer';
import ItemCard from '../components/ItemCard';
import CharacterForm from '../components/CharacterForm';
import EditorModal from '../components/EditorModal';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../theme';

/** One-line summary shown on the card. */
function summary(c) {
  const traits = (c.traits || []).map((id) => TRAITS.find((t) => t.id === id)?.he).filter(Boolean);
  const voice = VOICE_GENDERS.find((g) => g.id === c.voiceGender)?.he;
  return [c.age && `גיל ${c.age}`, voice && `קול ${voice}`, ...traits].filter(Boolean).join(' · ');
}

// Saved characters list + editor.
export default function CharactersScreen() {
  const { characters } = useAppData();
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit

  return (
    <ScreenContainer title="הדמויות שלי">
      <PrimaryButton title="דמות חדשה" onPress={() => setEditing({})} />
      {!characters.items.length && <Text style={{ color: theme.muted, marginTop: 16 }}>עוד אין דמויות. הדמויות שתשמרו כאן ישמשו בכל סצנה.</Text>}
      {characters.items.map((c) => (
        <ItemCard key={c.id} title={c.name} subtitle={summary(c)} imageUri={c.imageUri} onEdit={() => setEditing(c)} onDelete={() => characters.remove(c.id)} />
      ))}
      <EditorModal visible={!!editing} onClose={() => setEditing(null)}>
        {editing && <CharacterForm initial={editing} onCancel={() => setEditing(null)} onSave={(c) => { characters.upsert(c); setEditing(null); }} />}
      </EditorModal>
    </ScreenContainer>
  );
}
