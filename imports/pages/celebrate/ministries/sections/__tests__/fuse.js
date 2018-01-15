import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Fuse from "../fuse";

const generateComponent = () => {
  return <Fuse />;
};

describe("Fuse", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });
  it("renders a layout", () => {
    const component = shallow(generateComponent());
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
