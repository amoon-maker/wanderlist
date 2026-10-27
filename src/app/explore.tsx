import { getCities, getWeather } from "@/lib/api";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
export default function ExploreScreen() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>

      <Button
        title="Load"
        onPress={async () => {
          const cities = await getCities();
          setCount(cities.length);
          console.log(cities);
        }}
      />

      <Text style={styles.note}>{count} cities loaded</Text>

      <Button
        title="Weather"
        onPress={async () => {
          const weather = await getWeather();
          console.log("Montreal weather:", weather);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    color: "#666",
    marginTop: 8,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    color: "#666",
    textAlign: "center",
  },
});
