import renderer from "react-test-renderer";
import Svg from "../index";

describe("Svg Component", () => {
  it("should exist", () => {
    const svg = renderer.create(
      <Svg name={"home"} />
    );
    expect(svg).toBeDefined();
  });

  it ("should render a home svg", () => {
    const homeSvg = renderer.create(
      <Svg name={"home"} />
    );
    expect(homeSvg).toMatchSnapshot();
  })
})