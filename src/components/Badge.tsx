import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "lightblue",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#548",
  },
});
