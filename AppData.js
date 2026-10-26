import { createContext, useContext } from 'react';
import { useCollection } from '../hooks/useCollection';
import { STORAGE_KEYS } from '../config/constants';

const Ctx = createContext(null);

// Holds characters, locations and the image library for the whole app.
export function AppDataProvider({ children }) {
  const characters = useCollection(STORAGE_KEYS.characters);
  const locations = useCollection(STORAGE_KEYS.locations);
  const images = useCollection(STORAGE_KEYS.images);
  return <Ctx.Provider value={{ characters, locations, images }}>{children}</Ctx.Provider>;
}

/** Access shared collections: { characters, locations, images }. */
export const useAppData = () => useContext(Ctx);
