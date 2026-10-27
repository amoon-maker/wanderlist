import { usePlaces } from "@/lib/places-context";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaceCard from "../components/PlaceCard";

export default function Index() {
  const { places } = usePlaces();

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={[...places].sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Wanderlist</Text>
            <Text style={styles.tagline}>Places you want to see</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            {" "}
            No places yet - add one on the Add tab.
          </Text>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text>{places.length} places</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
    gap: 12,
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  tagline: {
    fontSize: 14,
    color: "#548",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
  empty: {
    color: "#666",
    textAlign: "center",
    marginTop: 24,
  },
  footer: {
    gap: 12,
  },
});
