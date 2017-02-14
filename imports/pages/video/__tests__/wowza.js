import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { TemplateWithoutData as Template } from "../wowza";

import navActions from "../../../data/store/nav";
import headerActions from "../../../data/store/header";

navActions.setLevel = jest.fn();
headerActions.set = jest.fn();

const defaultProps = {
  dispatch: jest.fn(),
  params: {
    embedCode: "testcode",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Template { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toBeDefined();
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates nav and header on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  headerActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
  expect(headerActions.set).toHaveBeenCalledTimes(1);
  expect(headerActions.set).toHaveBeenCalledWith({
    title: "Live",
  });
});
