import { useState } from 'react';
import { Text } from 'react-native';
import { useAppData } from '../../state/AppData';
import ScreenContainer from '../components/ScreenContainer';
import ItemCard from '../components/ItemCard';
import LocationForm from '../components/LocationForm';
import EditorModal from '../components/EditorModal';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../theme';

// Saved locations list + editor.
export default function LocationsScreen() {
  const { locations } = useAppData();
  const [editing, setEditing] = useState(null);

  return (
    <ScreenContainer title="המקומות שלי">
      <PrimaryButton title="מקום חדש" onPress={() => setEditing({})} />
      {!locations.items.length && <Text style={{ color: theme.muted, marginTop: 16 }}>עוד אין מקומות.</Text>}
      {locations.items.map((l) => (
        <ItemCard key={l.id} title={l.name} subtitle={l.description} imageUri={l.imageUri} onEdit={() => setEditing(l)} onDelete={() => locations.remove(l.id)} />
      ))}
      <EditorModal visible={!!editing} onClose={() => setEditing(null)}>
        {editing && <LocationForm initial={editing} onCancel={() => setEditing(null)} onSave={(l) => { locations.upsert(l); setEditing(null); }} />}
      </EditorModal>
    </ScreenContainer>
  );
}
