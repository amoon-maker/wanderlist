import { usePlaces } from "@/lib/places-context";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Badge from "../../components/Badge";

export default function PlaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { places } = usePlaces();

  const place = places.find((p) => p.id === id);

  if (!place) {
    return (
      <View style={styles.container}>
        <Text>Place not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: place.name,
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="#548" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{place.name}</Text>
        <Badge label={place.category} />
        <Text style={styles.notes}>{place.notes || "No notes yet"}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  notes: {
    color: "#666",
    fontSize: 16,
  },
});
