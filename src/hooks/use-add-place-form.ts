
import { useState } from "react";
import { useRouter } from "expo-router";
import { usePlaces } from "@/lib/places-context";
import type { Place } from "@/lib/types";

type FormErrors = {
  name?: string;
  notes?: string;
  category?: string;
};

export function useAddPlaceForm() {
  const { places, addPlace } = usePlaces();
  const router = useRouter();

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate() {
    const next: FormErrors = {};

    if (!name.trim()) {
      next.name = "Name is required";
    } else if (name.trim().length > 40) {
      next.name = "Name must be 40 characters or fewer";
    } else if (
      places.some(
        (p) =>
          p.name.trim().toLowerCase() ===
          name.trim().toLowerCase()
      )
    ) {
      next.name = "Name already exists";
    }

    if (notes.trim().length > 200) {
      next.notes = "Notes must be 200 characters or fewer";
    }

    const allowed = ["city", "nature", "food", "other"];

    if (!allowed.includes(category.trim().toLowerCase())) {
      next.category = "Invalid category";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit() {
    if (!validate()) return;

    const newPlace: Place = {
      id: Date.now().toString(),
      name: name.trim(),
      notes: notes.trim() || undefined,
      category: category.trim().toLowerCase() as Place["category"],
    };

    addPlace(newPlace);

    setName("");
    setNotes("");
    setCategory("");
    setErrors({});

    router.navigate("/");
  }

  return {
    places,
    name,
    setName,
    notes,
    setNotes,
    category,
    setCategory,
    errors,
    submit,
  };
}
