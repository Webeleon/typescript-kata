import { Getter } from "./getter";

describe("class: getter", () => {
  it("Hello Thelonious", () => {
    const thelonious = new Getter("Thelonious");
    expect(thelonious.greeting).toBe("Hello Thelonious");
  });
});
