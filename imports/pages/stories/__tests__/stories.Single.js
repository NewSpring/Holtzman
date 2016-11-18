import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../store";
import {
  StoriesSingleWithoutData as StoriesSingle,
  GET_STORY_QUERY,
} from "../stories.Single";

jest.mock("../../../mixins/mixins.Header", () => {});
jest.mock("../../../mixins/mixins.Likeable", () => {});
jest.mock("../../../mixins/mixins.Shareable", () => {});
jest.mock("../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  story: {
    content: {},
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <StoriesSingle { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no content", () => {
  const wrapper = shallow(generateComponent({
    story: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query correctly", () => {
  expect(GET_STORY_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  navActions.setAction = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("CONTENT");
  expect(navActions.setAction).toHaveBeenCalledTimes(1);
  expect(navActions.setAction.mock.calls[0][0]).toBe("CONTENT");
  expect(navActions.setAction.mock.calls[0][1]).toMatchSnapshot();
});
