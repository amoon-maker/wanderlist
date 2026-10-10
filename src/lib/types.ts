
export type Place = {
  id: string;
  name: string;
  category: "city" | "nature" | "food" | "other";
  notes?: string;
  photoUri?: string;
};
