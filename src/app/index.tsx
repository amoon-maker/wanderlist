import { usePlaces } from "@/lib/places-context";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
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
          <Image
      source={{
        uri: "https://i.guim.co.uk/img/media/c71420a79dab5d28cfb7e0528ba25bb6c2803300/0_226_5100_3059/master/5100.jpg?width=1200&quality=85&auto=format&fit=max&s=6b0e9dce4a02a3ecf3b9eaccb5f9afe7",
      }}
      style={styles.headerImage}
    />
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
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
    color: "rgb(77, 72, 69)",
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
  headerImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginTop: 16,
  },
});