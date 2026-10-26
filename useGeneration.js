import { useCallback, useEffect, useRef, useState } from 'react';
import { videoApi } from '../api/videoApi';
import { pollUntilDone } from '../services/pollingService';

// Owns the generation lifecycle: idle -> pending/running -> succeeded | failed.
export function useGeneration() {
  const [job, setJob] = useState(null);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const cancelled = useRef(false);

  // Stop polling when the screen unmounts.
  useEffect(() => () => { cancelled.current = true; }, []);

  /** Starts a job from a full API request and polls it to completion. */
  const generate = useCallback(async (request) => {
    cancelled.current = false;
    setBusy(true); setError(null); setJob(null); setNotes([]);
    try {
      setJob({ id: null, status: 'waking' });
      await videoApi.wake();
      const { id, notes: serverNotes } = await videoApi.createJob(request);
      setNotes(serverNotes || []);
      setJob({ id, status: 'pending' });
      await pollUntilDone(() => videoApi.getJob(request.model, id), {
        onUpdate: setJob,
        isCancelled: () => cancelled.current,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }, []);

  return { job, notes, error, busy, generate };
}
