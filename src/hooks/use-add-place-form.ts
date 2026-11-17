import { useState } from "react";
import { useRouter } from "expo-router";
import { usePlaces } from "@/lib/places-context";
import type { Place } from "@/lib/types";
import {
  isValid,
  validatePlaceForm,
  type FormErrors,
} from "@/lib/validation";

export function useAddPlaceForm() {
  const { places, addPlace } = usePlaces();
  const router = useRouter();

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

   function validate() {
    const found = validatePlaceForm(
      { name, notes, category },
      places,
    );

    setErrors(found);
    return isValid(found);
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
