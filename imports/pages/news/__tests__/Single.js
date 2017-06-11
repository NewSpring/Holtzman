import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../data/store";
import {
  StoriesSingleWithoutData as StoriesSingle,
  GET_NEWS_QUERY,
} from "../Single";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});

jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  news: {
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
    news: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query correctly", () => {
  expect(GET_NEWS_QUERY).toMatchSnapshot();
});
