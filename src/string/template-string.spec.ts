import { templateString } from "./template-string";

describe("string: template string", () => {
  it("hello coco", () => {
    expect(templateString("coco")).toBe("hello coco");
  });
});
