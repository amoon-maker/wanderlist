import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "../components/Badge";
import PlaceCard from "../components/PlaceCard";
import { Place } from "../lib/type";

type FormErrors = {
  name?: string;
  notes?: string;
  category?: string;
};

export default function Index() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");

  function validate() {
    const next: FormErrors = {};

    if (!name.trim()) next.name = "Name is required";

    if (
      places.some(
        (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase(),
      )
    ) {
      next.name = "Name already exists";
    }

    if (name.trim().length > 40) {
      next.name = "Name must be 40 characters or fewer";
    }

    if (!notes.trim()) next.notes = "Notes can't be empty";

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

    setPlaces([newPlace, ...places]);

    setName("");
    setNotes("");
    setCategory("");
    setErrors({});
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 30,
          gap: 12,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.appName}>Wanderlist</Text>
          <Text style={styles.tagline}>Places you want to see</Text>
        </View>

        <Image
          source={{
            uri: "https://www.adventuresnw.com/wp-content/uploads/2020/09/Summer-Cover-Image-FINAL-HiRes-2.jpg",
          }}
          style={styles.image}
        />

        <PlaceCard name="Kyoto" category="City" notes="Temples in autumn" />

        <View style={styles.badgeRow}>
          <Badge label="must-see" />
          <Badge label="autumn" />
        </View>

        <PlaceCard
          name="Banff"
          category="Nature"
          notes="Lake Louise at sunrise"
        />

        <View style={styles.badgeRow}>
          <Badge label="hiking" />
          <Badge label="lakes" />
        </View>

        <PlaceCard name="Lisbon" category="Food" notes="Pasteis de nata tour" />

        <View style={styles.badgeRow}>
          <Badge label="pastries" />
          <Badge label="budget" />
        </View>

        <Text style={styles.formTitle}>Add a place</Text>

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
          placeholder="Notes"
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

        <Button title="Add place" onPress={handleAdd} />

        <Text>{places.length} places</Text>

        <Button title="Clear list" onPress={() => setPlaces([])} />

        {places.map((p) => (
          <View key={p.id} style={styles.placeRow}>
            <Text>{p.name}</Text>
            <Badge label={p.category} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    alignItems: "center",
  },

  appName: {
    fontSize: 28,
    fontWeight: "700",
  },

  tagline: {
    fontSize: 14,
    color: "#548",
  },

  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
  },

  badgeRow: {
    flexDirection: "row",
    gap: 8,
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

  formTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
  },

  placeRow: {
    flexDirection: "row",
    gap: 8,
  },
});
