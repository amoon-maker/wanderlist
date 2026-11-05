
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { Place } from "./types";
import { loadPlaces, savePlaces } from "./storage";

type PlacesValue = {
  places: Place[];
  addPlace: (place: Place) => void;
  clearPlaces: () => void;
  resetPlaces: () => void;
  removePlace: (id: string) => void;
  setPhoto: (id: string, photoUri?: string) => void;
};

const PlacesContext = createContext<PlacesValue | null>(null);

const startingPlaces: Place[] = [];

export function PlacesProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>(startingPlaces);
  const [ready, setReady] = useState(false);

  // Load saved places when the app starts
  useEffect(() => {
    async function load() {
      const saved = await loadPlaces();

      if (saved) setPlaces(saved);

      setReady(true);
    }

    load();
  }, []);

  // Automatically save whenever places change
  useEffect(() => {
    if (!ready) return;

    savePlaces(places);
  }, [places, ready]);

  function addPlace(place: Place) {
    setPlaces((currentPlaces) => [...currentPlaces, place]);
  }

  function clearPlaces() {
    setPlaces([]);
  }

  function resetPlaces() {
    setPlaces(startingPlaces);
  }
function removePlace(id: string) {
  setPlaces((currentPlaces) =>
    currentPlaces.filter((place) => place.id !== id),
  );
}
function setPhoto(id: string, photoUri?: string) {
  setPlaces((currentPlaces) =>
    currentPlaces.map((place) =>
      place.id === id ? { ...place, photoUri } : place,
    ),
  );
}
  return (
    <PlacesContext.Provider
value={{ places, addPlace, clearPlaces, resetPlaces, removePlace, setPhoto }}    >
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const value = useContext(PlacesContext);

  if (!value) {
    throw new Error("usePlaces must be used inside PlacesProvider");
  }

  return value;
}
