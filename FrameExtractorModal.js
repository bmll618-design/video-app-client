import { useEffect, useState } from 'react';
import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useAppData } from '../../state/AppData';
import { ensureLocalVideo, extractFrame } from '../../services/mediaService';
import { uid } from '../../utils/id';
import PrimaryButton from './PrimaryButton';
import { theme } from '../theme';

const SLOTS = [['start', 'התחלה'], ['end', 'סיום'], ['reference', 'רפרנס']];

// Scrub the video, grab a frame, save it to the library and use it as a reference.
export default function FrameExtractorModal({ visible, onClose, videoUrl, jobId, duration, onAssign }) {
  const { images } = useAppData();
  const [localUri, setLocalUri] = useState(null);
  const [time, setTime] = useState(0);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const player = useVideoPlayer(localUri, (p) => { p.pause(); });

  // Download the video to cache when the modal opens.
  useEffect(() => {
    if (!visible) return;
    setError(null); setSaved(null);
    ensureLocalVideo(videoUrl, jobId).then(setLocalUri).catch((e) => setError(e.message));
  }, [visible, videoUrl, jobId]);

  /** Moves the preview to `t` seconds. */
  function seek(t) {
    setTime(t);
    if (localUri) player.currentTime = t;
  }

  /** Extracts the frame at the current time and stores it in the library. */
  async function grab() {
    setBusy(true); setError(null);
    try {
      const uri = await extractFrame(localUri, time);
      images.upsert({ id: uid(), uri, label: `פריים ${time.toFixed(1)}`, source: 'frame' });
      setSaved(uri);
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.page}>
        <Text style={styles.title}>שליפת פריים</Text>
        {localUri ? <VideoView player={player} style={styles.video} nativeControls={false} contentFit="contain" /> : <Text style={styles.muted}>מוריד את הסרטון…</Text>}
        <Slider minimumValue={0} maximumValue={duration} step={0.1} value={time} onValueChange={seek} minimumTrackTintColor={theme.accent} disabled={!localUri} style={styles.slider} />
        <Text style={styles.muted}>{time.toFixed(1)} שנ׳</Text>
        <PrimaryButton title={busy ? 'שולף…' : 'שמירת הפריים לספרייה'} onPress={grab} disabled={!localUri || busy} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {saved ? (
          <View>
            <Image source={{ uri: saved }} style={styles.preview} />
            <Text style={styles.muted}>נשמר בספרייה. להשתמש בו כ:</Text>
            <View style={styles.row}>
              {SLOTS.map(([slot, label]) => (
                <PrimaryButton key={slot} title={label} style={styles.slotBtn} onPress={() => { onAssign(slot, saved); onClose(); }} />
              ))}
            </View>
          </View>
        ) : null}
        <PrimaryButton title="סגירה" secondary onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.bg, padding: 20, paddingTop: 50 },
  title: { color: theme.text, fontSize: 22, fontWeight: '700', marginBottom: 12 },
  video: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000', borderRadius: 12 },
  slider: { marginTop: 12 },
  muted: { color: theme.muted, marginTop: 6 },
  error: { color: theme.danger, marginTop: 10 },
  preview: { width: 120, height: 120, borderRadius: 10, marginTop: 12 },
  row: { flexDirection: 'row', gap: 8 },
  slotBtn: { flex: 1, marginTop: 8 },
});
