import { usePlaces } from "@/lib/places-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Button,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "../components/Badge";
import { Place } from "../lib/types";

type FormErrors = {
  name?: string;
  notes?: string;
  category?: string;
};

export default function AddScreen() {
  const { places, addPlace } = usePlaces();
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");

  function validate() {
    const next: FormErrors = {};

    if (!name.trim()) {
      next.name = "Name is required";
    }

    if (name.trim().length > 40) {
      next.name = "Name must be 40 characters or fewer";
    }

    if (
      places.some(
        (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase(),
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

  function handleAdd() {
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

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add a place</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes (optional)"
          style={styles.input}
        />
        {errors.notes && <Text style={styles.error}>{errors.notes}</Text>}

        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="Category"
          style={styles.input}
        />
        {errors.category && <Text style={styles.error}>{errors.category}</Text>}

        <View style={styles.badgeRow}>
          {(["city", "nature", "food", "other"] as const).map((c) => (
            <Pressable key={c} onPress={() => setCategory(c)}>
              <Badge
                label={`${c} (${places.filter((p) => p.category === c).length})`}
              />
            </Pressable>
          ))}
        </View>

        <Button title="Add place" onPress={handleAdd} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  error: {
    color: "#c00",
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
