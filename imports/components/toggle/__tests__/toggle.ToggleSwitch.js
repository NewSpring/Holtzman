import ToggleSwitch from "../toggle.ToggleSwitch";
import renderer from "react-test-renderer";

describe("Toggle Switch", () => {
  it("should exist", () => {
    const toggle = renderer.create(
      <ToggleSwitch followingId="test" />
    );
    expect(toggle).toBeDefined();
  });

  it("should match snapshot", () => {
    const toggle = renderer.create(
      <ToggleSwitch followingId="test" />
    );
    expect(toggle).toMatchSnapshot();
  });
});
