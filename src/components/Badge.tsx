import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 8,
  },
});