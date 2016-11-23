import Validate from "../";

it("has defaults", () => {
  expect(Validate.isCCV).toBeTruthy();
  expect(Validate.isCreditCard).toBeTruthy();
  expect(Validate.isExpiry).toBeTruthy();
});

describe("addValidator", () => {
  it("throws error if already assigned", () => {
    try {
      Validate.addValidator("isCCV", jest.fn());
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("Validator assigned");
    }
  });

  it("throws if no handler", () => {
    try {
      Validate.addValidator("test", null);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("Validator TypeError");
    }
  });

  it("throws if handler not a function", () => {
    try {
      Validate.addValidator("test", "test");
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe("Validator TypeError");
    }
  });

  it("adds it", () => {
    const mockHandler = jest.fn();
    const result = Validate.addValidator("test", mockHandler);
    expect(result).toEqual({
      test: mockHandler,
    });
    expect(Validate.test).toBe(mockHandler);
  });
});
