import { add } from "../add";

describe("Add function", () => {
  it("adds numbers correctly", () => {
    const expectedResult = 3;
    const result = add(1, 2);

    expect(result).toBe(expectedResult);
  });

  it("returns a number", () => {
    const result = add(1, 2);

    expect(typeof result).toBe("number");
  });
});
