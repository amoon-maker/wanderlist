import Badge from "@/components/Badge";
import PlaceCard from "@/components/PlaceCard";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function index() {
  const appName = "Wanderlist";

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={styles.title}>Welcome to {appName}!</Text>
        </View>

        <Image
          source={{
            uri: "https://www.adventuresnw.com/wp-content/uploads/2020/09/Summer-Cover-Image-FINAL-HiRes-2.jpg",
          }}
          style={styles.image}
        />

        <PlaceCard name="Kyoto" category="City" notes="Temples in autumn" />
        <PlaceCard
          name="Banff"
          category="Nature"
          notes="Lake Louise at sunrise"
        />
        <PlaceCard name="Lisbon" category="Food" notes="Pasteis de nata tour" />
        <PlaceCard name="Pelotas" category="Food" notes="Bauru" />
        <PlaceCard name="Montreal" category="City" notes="Jardin Botanique" />
        <PlaceCard name="Toronto" category="City" notes="CN" />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 20,
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
});
