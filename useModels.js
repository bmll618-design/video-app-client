import { useEffect, useState } from 'react';
import { videoApi } from '../api/videoApi';

// Loads the model catalog once.
export function useModels() {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    videoApi.getModels().then(setModels).catch((e) => setError(e.message));
  }, []);
  return { models, error };
}
