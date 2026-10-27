import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
  color?: string;
};

export default function Badge({ label, color }: BadgeProps) {
  return (
    <View style={[styles.badge, color ? { backgroundColor: color } : null]}>
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
