import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
  color?: string;
};

export default function Badge({ label, color }: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color || "#dbeafe" },
      ]}
    >
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
});