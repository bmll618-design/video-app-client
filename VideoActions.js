import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { saveVideoToGallery } from '../../services/mediaService';
import PrimaryButton from './PrimaryButton';
import FrameExtractorModal from './FrameExtractorModal';
import { theme } from '../theme';

// Buttons under the finished video: download to gallery, extract a frame.
export default function VideoActions({ jobId, videoUrl, duration, onAssign }) {
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);
  const [frameOpen, setFrameOpen] = useState(false);

  /** Saves the video to the gallery and reports the result. */
  async function download() {
    setSaving(true); setMsg(null);
    try { await saveVideoToGallery(videoUrl, jobId); setMsg('הסרטון נשמר בגלריה'); }
    catch (e) { setMsg(e.message); }
    finally { setSaving(false); }
  }

  return (
    <View>
      <PrimaryButton title={saving ? 'שומר…' : 'הורדה לגלריה'} onPress={download} disabled={saving} secondary />
      <PrimaryButton title="שליפת פריים מהסרטון" onPress={() => setFrameOpen(true)} secondary />
      {msg ? <Text style={styles.msg}>{msg}</Text> : null}
      <FrameExtractorModal visible={frameOpen} onClose={() => setFrameOpen(false)} videoUrl={videoUrl} jobId={jobId} duration={duration} onAssign={onAssign} />
    </View>
  );
}

const styles = StyleSheet.create({ msg: { color: theme.muted, marginTop: 8 } });
