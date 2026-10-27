import { createContext, ReactNode, useContext, useState } from "react";
import { Place } from "./types";

type PlacesValue = {
  places: Place[];
  addPlace: (place: Place) => void;
  clearPlaces: () => void;
};

const PlacesContext = createContext<PlacesValue | null>(null);

export function PlacesProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([
    {
      id: "kyoto",
      name: "Kyoto",
      notes: "Temples in autumn",
      category: "city",
    },
    {
      id: "banff",
      name: "Banff",
      notes: "Lake Louise at sunrise",
      category: "nature",
    },
    {
      id: "lisbon",
      name: "Lisbon",
      notes: "Pasteis de nata tour",
      category: "food",
    },
  ]);

  function addPlace(place: Place) {
    setPlaces([...places, place]);
  }

  function clearPlaces() {
    setPlaces([]);
  }

  return (
    <PlacesContext.Provider value={{ places, addPlace, clearPlaces }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const value = useContext(PlacesContext);
  if (!value) throw new Error("usePlaces must be used inside PlacesProvider");
  return value;
}
