import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import mockDate from "mockdate";
import {
  nav,
} from "../../../../../data/store";
import {
  PersonalDetailsWithoutData as PersonalDetails,
  CAMPUSES_QUERY,
  PERSON_QUERY,
} from "../";

// XXX god bless you
mockDate.set('1/1/2000');

jest.mock("../../../../../deprecated/methods/accounts/browser", () => ({
  update: jest.fn(),
}));
jest.mock("../../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  person: {
    person: {},
    refetch: jest.fn(),
  },
  campuses: {
    campuses: [
      {
        name: "test",
        id: "1",
      },
      {
        name: "test",
        id: "1",
      },
    ],
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <PersonalDetails { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders error version", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ state: "error", err: Error });
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

it("parses campuses query", () => {
  expect(CAMPUSES_QUERY).toMatchSnapshot();
});

it("parses person query", () => {
  expect(PERSON_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
  const mockDispatch = jest.fn();
  nav.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(nav.setLevel).toHaveBeenCalledTimes(1);
  expect(nav.setLevel).lastCalledWith("BASIC_CONTENT");
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
  expect(nav.setLevel).lastCalledWith("TOP");
});

it("getDays returns an array of days in the month", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getDays();
  expect(result).toMatchSnapshot();
});

it("getDays returns an array of days in the month based on state", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({
    month: 9,
  });
  const result = wrapper.instance().getDays();
  expect(result).toMatchSnapshot();
});

it("getMonths returns array of short month names", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getMonths();
  expect(result).toMatchSnapshot();
});

it("getYears returns array of 150 years", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getYears();
  expect(result.length).toBe(150);
  expect(result).toMatchSnapshot();
});

it("saveMonth updates the month state", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().saveMonth(3);
  expect(wrapper.state().month).toBe(3);
});

it("updatePerson updates state nd calls update", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().updatePerson(3);
  expect(wrapper.state().state).toBe("loading");
});
