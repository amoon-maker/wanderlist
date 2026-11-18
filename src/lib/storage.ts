import AsyncStorage from "@react-native-async-storage/async-storage";
import { parsePlaces } from "./parsing";
import type { Place } from "./types";

export const KEY = "wanderlist.places";

export async function savePlaces(places: Place[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(places));
}

export async function loadPlaces(): Promise<Place[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return parsePlaces(raw);
}