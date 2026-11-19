import { formatPopulation } from "./format";

describe("formatPopulation", () => {
  it("formats millions", () => {
    expect(formatPopulation(1762949)).toBe("1.8M");
  });

  it("formats thousands", () => {
    expect(formatPopulation(45000)).toBe("45K");
  });

  it("keeps small numbers unchanged", () => {
    expect(formatPopulation(812)).toBe("812");
  });

  it("formats zero", () => {
    expect(formatPopulation(0)).toBe("0");
  });
});