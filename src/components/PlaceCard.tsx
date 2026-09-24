import { StyleSheet, Text, View } from "react-native";
import Badge from "./Badge";

type PlaceCardProps = {
  name: string;
  category: string;
  notes: string;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default function PlaceCard({ name, category, notes }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text>{category}</Text>
      </View>
      <Text>{notes}</Text>
      <View>
        <Badge label="must-see" />
      </View>
    </View>
  );
}
