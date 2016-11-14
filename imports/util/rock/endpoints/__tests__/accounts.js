import accounts from "../accounts";

it("should parse correctly", () => {
  expect(accounts).toMatchSnapshot();
});
