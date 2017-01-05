import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  nav,
} from "../../../../../data/store";
import {
  HomeAddressWithoutData as HomeAddress,
  PERSON_HOME_QUERY,
} from "../";

jest.mock("../../../../../deprecated/methods/accounts/browser", () => ({
  updateHome: jest.fn(),
}));
jest.mock("../../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    refetch: jest.fn(),
    person: {
      home: {},
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <HomeAddress { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without person home", () => {
  const wrapper = shallow(generateComponent({
    data: {
      person: {
        home: null,
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders error version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ state: "error" });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ state: "loading" });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders success version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ state: "success" });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query", () => {
  expect(PERSON_HOME_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  nav.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(nav.setLevel).toHaveBeenCalledTimes(1);
  expect(nav.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});

it("updates nav on unmount", () => {
  const mockDispatch = jest.fn();
  nav.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(nav.setLevel).toHaveBeenCalledTimes(2);
  expect(nav.setLevel).toHaveBeenCalledWith("TOP");
});

it("updateAddress calls updateHome with data", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().updateAddress();
  expect(wrapper.state().state).toBe("loading");
});
