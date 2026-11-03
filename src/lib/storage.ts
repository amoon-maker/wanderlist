
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place } from "./types";

export const KEY = "wanderlist.places";

export async function savePlaces(places: Place[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(places));
}

export async function loadPlaces(): Promise<Place[] | null> {
  const raw = await AsyncStorage.getItem(KEY);

  return raw ? JSON.parse(raw) : null;
}
