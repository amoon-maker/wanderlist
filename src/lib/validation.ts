
import type { Place } from "./types";

export type FormErrors = {
  name?: string;
  notes?: string;
  category?: string;
};

export type PlaceDraft = {
  name: string;
  notes: string;
  category: string;
};

const categories = ["city", "nature", "food", "other"];

export function isValidCategory(value: string): boolean {
  return categories.includes(value.trim().toLowerCase());
}

export function validatePlaceForm(
  draft: PlaceDraft,
  places: Place[] = [],
): FormErrors {
  const errors: FormErrors = {};

  if (!draft.name.trim()) {
    errors.name = "Name is required";
  } else if (draft.name.trim().length > 40) {
    errors.name = "Name must be 40 characters or fewer";
  } else if (/^\d+$/.test(draft.name.trim())) {
    errors.name = "A name can't be only numbers";
  } else if (draft.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (
    places.some(
      (place) =>
        place.name.trim().toLowerCase() ===
        draft.name.trim().toLowerCase(),
    )
  ) {
    errors.name = "Name already exists";
  }

  if (draft.notes.trim().length > 200) {
    errors.notes = "Notes must be 200 characters or fewer";
  }

  if (!isValidCategory(draft.category)) {
    errors.category = "Invalid category";
  }

  return errors;
}

export function isValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0;
}
