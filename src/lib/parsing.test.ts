import { parsePlaces } from "./parsing";

describe("parsePlaces", () => {
  it("returns an empty list on a brand new install", () => {
    expect(parsePlaces(null)).toEqual([]);
  });

  it("returns an empty list when the stored text is not JSON", () => {
    expect(parsePlaces("{ half a write")).toEqual([]);
  });
  it("rejects invalid places inside the saved array", () => {
  const raw = JSON.stringify([
    { id: "1", name: "", category: "invalid" },
  ]);

  expect(parsePlaces(raw)).toEqual([]);
});

it("preserves valid places when parsing saved data", () => {
  const places = [
    {
      id: "1",
      name: "Montreal",
      category: "city" as const,
      notes: "Beautiful city",
    },
  ];

  const raw = JSON.stringify(places);

  expect(parsePlaces(raw)).toEqual(places);
});

it("keeps valid places and removes invalid ones", () => {
  const raw = JSON.stringify([
    { id: "1", name: "Montreal", category: "city" },
    { id: "2", name: "", category: "invalid" },
  ]);

  expect(parsePlaces(raw)).toEqual([
    { id: "1", name: "Montreal", category: "city" },
  ]);
});

it("returns an empty list when stored data is an empty string", () => {
  expect(parsePlaces("")).toEqual([]);
});
});