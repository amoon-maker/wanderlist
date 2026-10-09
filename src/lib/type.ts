export type Place = {
  id: string;
  name: string;
  notes?: string;
  category: "city" | "nature" | "food" | "other";
  photoUri?: string;
};

export type FormErrors = {
  name?: string;
  notes?: string;
  category?: string;
};