/* eslint-disable */
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import Slider from "../Slider";

jest.mock("../../../../components/controls/toggle");
jest.mock("../Content");
jest.mock("../ScriptureWrapper");

const defaultProps = {
  studyEntry: {
    content: {
      ooyalaId: null,
      images: [],
      body: "<h2>study body</h2>",
    },
  },
  toggleColor: "",
  isLight: false,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
      ...defaultProps,
      ...additionalProps,
    };

  return <Slider { ...newProps } />;
};

it("renders with props", () => {
  const tree = renderer.create(generateComponent());
  expect(tree).toMatchSnapshot();
});




