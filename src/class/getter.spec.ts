import { Getter } from "./getter";

describe("class: getter", () => {
  it("Hello Thelonious", () => {
    const thelonious = new Getter("Thelonious");
    expect(thelonious.greeting).toBe("Hello Thelonious");
  });
  it("Hello Thelonious with a reassignment", () => {
    const thelonious = new Getter("Thelonious");
    expect(thelonious.greeting).toBe("Hello Thelonious");
    thelonious.name = "Thelonious Monk";
    expect(thelonious.greeting).toBe("Hello Thelonious Monk");
  });
});
