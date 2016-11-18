import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  nav as navActions,
  header as headerActions,
} from "../../../../store";
import Following from "../../../../blocks/following";
import {
  HomeWithoutData as Home,
  GET_PERSON_QUERY,
} from "../";

jest.mock("../../../../blocks/likes", () => jest.fn());
jest.mock("../../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
  header: {
    set: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    person: {
      photo: "http://test.com/photo.jpg",
    },
  },
  upload: jest.fn(),
  photo: "test",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Home { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without person", () => {
  const wrapper = shallow(generateComponent({
    data: {
      person: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without photo", () => {
  const wrapper = shallow(generateComponent({
    photo: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query correctly", () => {
  expect(GET_PERSON_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().componentDidMount();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("ontoggle updates state content", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().onToggle(1);
  expect(wrapper.state().content).toBe(1);
});

it("getContent returns state content", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ content: 1 });
  const result = wrapper.instance().getContent();
  expect(result).toEqual(<Following />);
});
