import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppData } from '../../state/AppData';
import { useModels } from '../../hooks/useModels';
import { useGeneration } from '../../hooks/useGeneration';
import { validatePrompt } from '../../utils/validators';
import { buildGenerationRequest } from '../../services/sceneService';
import ScreenContainer from '../components/ScreenContainer';
import PromptInput from '../components/PromptInput';
import Chips from '../components/Chips';
import ImageSlot from '../components/ImageSlot';
import ModelPicker from '../components/ModelPicker';
import ParamsPanel from '../components/ParamsPanel';
import JobStatus from '../components/JobStatus';
import VideoPlayer from '../components/VideoPlayer';
import VideoActions from '../components/VideoActions';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../theme';

// Scene composer: prompt + characters + location + start/end/reference images.
export default function GenerateScreen() {
  const { characters, locations } = useAppData();
  const { models, error: modelsError } = useModels();
  const { job, notes, error, busy, generate } = useGeneration();
  const [prompt, setPrompt] = useState('');
  const [modelId, setModelId] = useState(null);
  const [params, setParams] = useState({ duration: 5, resolution: '720p', ratio: '16:9' });
  const [characterIds, setCharacterIds] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [images, setImages] = useState({ start: null, end: null, reference: null });
  const [formError, setFormError] = useState(null);

  const model = models.find((m) => m.id === modelId);
  const setImage = (slot) => (uri) => setImages((p) => ({ ...p, [slot]: uri }));

  // Select the first model once the catalog loads.
  useEffect(() => { if (models.length && !modelId) pickModel(models[0].id); }, [models]);

  /** Switches model and resets params to its first valid options. */
  function pickModel(id) {
    const m = models.find((x) => x.id === id);
    setModelId(id);
    setParams({ duration: m.durations[0], resolution: m.resolutions[0], ratio: m.ratios[0] });
  }

  /** Validates, builds the request (prompt + encoded images) and starts generation. */
  async function onSubmit() {
    const msg = validatePrompt(prompt);
    setFormError(msg);
    if (msg) return;
    try {
      const request = await buildGenerationRequest({
        scene: { prompt, modelId, params, images },
        characters: characters.items.filter((c) => characterIds.includes(c.id)),
        location: locations.items.find((l) => l.id === locationId) || null,
      });
      generate(request);
    } catch (e) {
      setFormError(e.message);
    }
  }

  return (
    <ScreenContainer title="סצנה חדשה">
      <PromptInput value={prompt} onChange={setPrompt} />
      <Chips label="דמויות ראשיות" multi options={characters.items.map((c) => c.id)} value={characterIds} onChange={setCharacterIds}
        format={(id) => characters.items.find((c) => c.id === id)?.name} emptyText="אפשר ליצור דמויות בלשונית ״דמויות״" />
      <Chips label="מקום" options={[null, ...locations.items.map((l) => l.id)]} value={locationId} onChange={setLocationId}
        format={(id) => (id ? locations.items.find((l) => l.id === id)?.name : 'ללא')} />
      <View style={styles.slots}>
        <ImageSlot label="תמונת התחלה" uri={images.start} onChange={setImage('start')} />
        <ImageSlot label="תמונת סיום" uri={images.end} onChange={setImage('end')} />
        <ImageSlot label="רפרנס" uri={images.reference} onChange={setImage('reference')} />
      </View>
      <Text style={styles.hint}>תמונות הדמויות והמקום שנבחרו נשלחות אוטומטית כרפרנס. אם יש תמונת התחלה/סיום, הרפרנסים לא נשלחים והתיאור נשלח בטקסט.</Text>
      <ModelPicker models={models} value={modelId} onChange={pickModel} />
      <ParamsPanel model={model} params={params} onChange={setParams} />
      {formError ? <Text style={styles.error}>{formError}</Text> : null}
      {modelsError ? <Text style={styles.error}>{modelsError}</Text> : null}
      <PrimaryButton title={busy ? 'יוצר…' : 'יצירת סרטון'} onPress={onSubmit} disabled={busy || !model} />
      <JobStatus job={job} notes={notes} error={error} />
      {job?.status === 'succeeded' && (
        <>
          <VideoPlayer uri={job.videoUrl} />
          <VideoActions jobId={job.id} videoUrl={job.videoUrl} duration={params.duration} onAssign={(slot, uri) => setImage(slot)(uri)} />
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  slots: { flexDirection: 'row', gap: 10 },
  hint: { color: theme.muted, fontSize: 12, marginTop: 10 },
  error: { color: theme.danger, marginTop: 8 },
});
