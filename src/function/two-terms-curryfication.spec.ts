import { twoTermsCurryfication } from "./two-terms-curryfication";

describe("two terms curryfication", () => {
  it("twoTermsCurryfication(1)(2)", () => {
    expect(twoTermsCurryfication(1)(2)).toBe(3);
  });

  it("2 step process", () => {
    const addFive = twoTermsCurryfication(5);
    expect(addFive(1)).toBe(6);
  });
});
