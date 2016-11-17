import types from "../types";

it("matches the previous build", () => {
  expect(types).toMatchSnapshot();
});
