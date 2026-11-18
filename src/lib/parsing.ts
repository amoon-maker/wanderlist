import type { Place } from "./types";

const categories = ["city", "nature", "food", "other"];

function isPlace(value: unknown): value is Place {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const place = value as Record<string, unknown>;

  return (
    typeof place.id === "string" &&
    place.id.trim().length > 0 &&
    typeof place.name === "string" &&
    place.name.trim().length > 0 &&
    typeof place.category === "string" &&
    categories.includes(place.category) &&
    (place.notes === undefined || typeof place.notes === "string") &&
    (place.photoUri === undefined || typeof place.photoUri === "string")
  );
}

export function parsePlaces(raw: string | null): Place[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isPlace);
  } catch {
    return [];
  }
}