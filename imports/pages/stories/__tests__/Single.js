import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  StoriesSingleWithoutData as StoriesSingle,
  GET_STORY_QUERY,
} from "../Single";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});

jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});

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
