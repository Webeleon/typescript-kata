import { matrixCoordinate } from "./matrix-coordinate";

const matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 23, 25],
];

describe("array: matrix coordinate", () => {
  it("coordinate: 0, 0", () => {
    expect(matrixCoordinate(0, 0, matrix)).toBe(1);
  });

  it("coordinate: 1, 1", () => {
    expect(matrixCoordinate(1, 1, matrix)).toBe(7);
  });

  it("coordinate: 5, 5", () => {
    expect(matrixCoordinate(5, 5, matrix)).toBe(undefined);
  });
});
