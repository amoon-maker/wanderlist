import { isValid, validatePlaceForm } from "./validation";

const goodPlace = {
  name: "Montreal",
  notes: "A beautiful city",
  category: "city",
};

describe("validatePlaceForm", () => {
  it("accepts a valid place", () => {
    expect(validatePlaceForm(goodPlace, [])).toEqual({});
  });

  it("rejects an empty name", () => {
    const errors = validatePlaceForm(
      { ...goodPlace, name: "" },
      [],
    );

    expect(errors.name).toBe("Name is required");
  });

  it("rejects a name containing only numbers", () => {
    const errors = validatePlaceForm(
      { ...goodPlace, name: "123" },
      [],
    );

    expect(errors.name).toBe("A name can't be only numbers");
  });

  it("rejects a name shorter than two characters", () => {
    const errors = validatePlaceForm(
      { ...goodPlace, name: "A" },
      [],
    );

    expect(errors.name).toBe("Name must be at least 2 characters");
  });
it("rejects a name longer than 40 characters", () => {
  const errors = validatePlaceForm(
    { ...goodPlace, name: "A".repeat(41) },
    [],
  );

  expect(errors.name).toBe("Name must be 40 characters or fewer");
});

it("rejects duplicate place names", () => {
  const existingPlaces = [
    { id: "1", name: "Montreal", category: "city" as const },
  ];

  const errors = validatePlaceForm(goodPlace, existingPlaces);

  expect(errors.name).toBe("Name already exists");
});

it("rejects notes longer than 200 characters", () => {
  const errors = validatePlaceForm(
    { ...goodPlace, notes: "A".repeat(201) },
    [],
  );

  expect(errors.notes).toBe("Notes must be 200 characters or fewer");
});

it("rejects an invalid category", () => {
  const errors = validatePlaceForm(
    { ...goodPlace, category: "shopping" },
    [],
  );

  expect(errors.category).toBe("Invalid category");
});
describe("isValid", () => {
  it("returns true when there are no errors", () => {
    expect(isValid({})).toBe(true);
  });

  it("returns false when errors exist", () => {
    expect(isValid({ name: "Name is required" })).toBe(false);
  });
});
});