import { useCallback, useEffect, useState } from 'react';
import { loadJson, saveJson } from '../storage/jsonStorage';

// Persistent list with upsert/remove. Items must have an `id`.
export function useCollection(key) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Load once from device storage.
  useEffect(() => { loadJson(key, []).then((v) => { setItems(v); setReady(true); }); }, [key]);

  /** Adds a new item (at the top) or replaces the one with the same id. */
  const upsert = useCallback((item) => {
    setItems((prev) => {
      const next = prev.some((i) => i.id === item.id) ? prev.map((i) => (i.id === item.id ? item : i)) : [item, ...prev];
      saveJson(key, next);
      return next;
    });
  }, [key]);

  /** Deletes an item by id. */
  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      saveJson(key, next);
      return next;
    });
  }, [key]);

  return { items, ready, upsert, remove };
}
