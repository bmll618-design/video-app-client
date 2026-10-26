import { StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

// Plays the finished video from its URL.
export default function VideoPlayer({ uri }) {
  const player = useVideoPlayer(uri, (p) => { p.loop = true; p.play(); });
  return <VideoView player={player} style={styles.video} nativeControls contentFit="contain" />;
}

const styles = StyleSheet.create({ video: { width: '100%', aspectRatio: 16 / 9, marginTop: 18, borderRadius: 12, backgroundColor: '#000' } });
