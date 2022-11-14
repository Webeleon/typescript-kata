import { sum } from "./sum";

describe("array: sum", () => {
  it("1", () => {
    expect(sum([1])).toBe(1);
  });
  it("1, 2, 3", () => {
    expect(sum([1, 2, 3])).toBe(6);
  });
  it("1, -1", () => {
    expect(sum([1, -1])).toBe(0);
  });
  it("empty array", () => {
    expect(sum([])).toBe(0);
  });
});
