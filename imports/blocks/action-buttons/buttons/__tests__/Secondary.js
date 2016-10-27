import renderer from "react-test-renderer";
import SecondaryButton from "../Secondary";

it("has dark styles if not disabled", () => {
  const tree = renderer.create(
    <SecondaryButton
      disabled={false}
      onClick={() => {}}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("has disabled styles if disabled", () => {
  const tree = renderer.create(
    <SecondaryButton
      disabled={true}
      onClick={() => {}}
    />
  );
  expect(tree).toMatchSnapshot();
});
