import { usePlaces } from "@/lib/places-context";
import Constants from "expo-constants";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const { places } = usePlaces();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wanderlist</Text>

      <Text style={styles.text}>Built by: Amina</Text>

      <Text style={styles.text}>
        420-952-VA — Application Development 2 (Mobile)
      </Text>

      <Text style={styles.text}>Version {Constants.expoConfig?.version}</Text>

      <Text style={styles.text}>{places.length} places saved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  text: {
    color: "#666",
    textAlign: "center",
  },
});
