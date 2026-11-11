
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
import { useAddPlaceForm } from "../hooks/use-add-place-form";

export default function AddScreen() {
  const {
    places,
    name,
    setName,
    notes,
    setNotes,
    category,
    setCategory,
    errors,
    submit,
  } = useAddPlaceForm();

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

        <Button title="Add place" onPress={submit} />
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
