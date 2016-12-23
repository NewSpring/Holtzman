import renderer from "react-test-renderer";
import Guest from "../Guest";

it("has dark styles if not disabled", () => {
  const tree = renderer.create(
    <Guest
      disabled={false}
      onClick={() => {}}
      text={"meow"}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("has light styles if disabled", () => {
  const tree = renderer.create(
    <Guest
      disabled={true}
      onClick={() => {}}
      text={"meow"}
    />
  );
  expect(tree).toMatchSnapshot();
});
