import { StyleSheet, Text, View } from "react-native";

type PlaceCardProps = {
  name: string;
  category: string;
  notes: string;
};

export default function PlaceCard({ name, category, notes }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      <Text>{notes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  category: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
