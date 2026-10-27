import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../lib/types";
import Badge from "./Badge";

type PlaceCardProps = {
  place: Place;
};

function categoryColor(category: string) {
  if (category === "city") return "#dbeafe";
  if (category === "nature") return "#dcfce7";
  if (category === "food") return "#fde68a";
  return "#eee8f5";
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Pressable
      onPress={() => router.push(`/place/${place.id}`)}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{place.name}</Text>
        <Badge label={place.category} color={categoryColor(place.category)} />
      </View>

      {place.notes ? (
        <Text style={styles.notes} numberOfLines={2}>
          {place.notes}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    gap: 6,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  notes: {
    fontSize: 13,
    color: "#666",
  },
});
