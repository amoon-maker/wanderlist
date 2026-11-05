import { usePlaces } from "@/lib/places-context";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";import Badge from "../../components/Badge";
import * as ImagePicker from "expo-image-picker";

export default function PlaceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { places, removePlace, setPhoto } = usePlaces();

  const place = places.find((p) => p.id === id);

    if (!place) {
    return <Text>That place is no longer here.</Text>;
  }

async function takePhoto() {
  if (!place) return;

  const perm = await ImagePicker.requestCameraPermissionsAsync();

  if (!perm.granted) return;

  const result = await ImagePicker.launchCameraAsync();

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    setPhoto(place.id, uri);
  }
}

function confirmRemove() {
  if (!place) return;

  Alert.alert(
    "Remove place",
    "Are you sure you want to remove this place?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removePlace(place.id),
      },
    ],
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
              <Ionicons name="arrow-back" size={24} color="rgb(83, 81, 89)" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{place.name}</Text>
        <Badge label={place.category} />
        <Text style={styles.notes}>{place.notes || "No notes yet"}</Text>
        <Button
  title="Remove this place"
  onPress={confirmRemove}
/>
<Button
  title="Take Photo"
  onPress={takePhoto}
/>
{place.photoUri && (
  <Image
    source={{ uri: place.photoUri }}
    style={styles.photo}
  />
)}
{place.photoUri && (
  <Button
    title="Remove photo"
    onPress={() => setPhoto(place.id, undefined)}
  />
)}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  photo: {
  width: "100%",
  height: 250,
  borderRadius: 12,
},
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
