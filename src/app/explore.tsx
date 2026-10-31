import { getCities, getWeather, type City } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ExploreScreen() {
  const [cities, setCities] = useState<City[]>([]);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const results = await getCities();
        setCities(results);

        try {
          const weather = await getWeather(45.5, -73.6);
          setTemperature(weather.current.temperature_2m);
        } catch {
          setTemperature(null);
        }
      } catch {
        setError(
          "Could not load cities. Check your internet connection and try again.",
        );
        setCities([]);
        setTemperature(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>

      {!loading &&
        (temperature !== null ? (
          <Text style={styles.note}>Montreal now: {temperature} °C</Text>
        ) : (
          <Text style={styles.note}>Montreal weather unavailable</Text>
        ))}

      {loading && <ActivityIndicator size="large" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          style={styles.list}
          data={cities}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>
                {item.name}, {item.country}
              </Text>

              <Text style={styles.population}>
                {item.population.toLocaleString()} people
              </Text>

              {item.region && (
                <Text style={styles.population}>{item.region}</Text>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No cities found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  note: {
    color: "#666",
    marginTop: 8,
    marginBottom: 8,
  },
  list: {
    marginTop: 16,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  population: {
    color: "#666",
    fontSize: 13,
    marginTop: 3,
  },
  empty: {
    color: "#666",
    textAlign: "center",
    marginTop: 24,
  },
  error: {
    color: "#b00020",
    textAlign: "center",
    marginTop: 12,
  },
});
