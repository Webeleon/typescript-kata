import { include } from "./include";

describe("regex: include", () => {
  it("abc include a", () => {
    expect(include("abc", "a")).toBe(true);
  });

  it("abc does not include d", () => {
    expect(include("abc", "d")).toBe(false);
  });
});
