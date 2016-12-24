import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { search as searchActions } from "../../../store";
import { HeaderWithoutData as Header } from "../"

jest.mock("../../../store", () => ({
  search: {
    searching: jest.fn(),
    term: jest.fn(),
  },
}));

const defaultProps = {
  showSettings: false,
  dispatch: jest.fn(),
  light: false,
  visible: true,
  isSearch: false,
  color: "green",
  searching: false,
  searchSubmit: jest.fn(),
  text: "test",
  subText: null,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Header { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders searching version", () => {
  const wrapper = shallow(generateComponent({
    searching: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders isSearch version", () => {
  const wrapper = shallow(generateComponent({
    isSearch: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders default text version", () => {
  const wrapper = shallow(generateComponent({
    text: "default",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders NewSpring text version", () => {
  const wrapper = shallow(generateComponent({
    text: "NewSpring",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders subtext if present", () => {
  const wrapper = shallow(generateComponent({
    subText: "some subtext",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders live version", () => {
  const wrapper = shallow(generateComponent({
    visible: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders light version", () => {
  const wrapper = shallow(generateComponent({
    light: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("showSettings return undefined if not showSettings", () => {
  const wrapper = shallow(generateComponent({
    showSettings: false,
  }));
  const result = wrapper.instance().showSettings();
  expect(result).toBe(undefined);
});

it("showSettings returns if showSettings", () => {
  const wrapper = shallow(generateComponent({
    showSettings: true,
  }));
  const result = wrapper.instance().showSettings();
  expect(result).toMatchSnapshot();
});

it("cancelSearch calls preventDefault and updates search store", () => {
  const mockDispatch = jest.fn();
  searchActions.searching = jest.fn();
  searchActions.term = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().searchInput = {
    value: "something",
  };
  const mockPreventDefault = jest.fn();
  wrapper.instance().cancelSearch({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(searchActions.searching).toHaveBeenCalledTimes(1);
  expect(searchActions.searching).toHaveBeenCalledWith(false);
  expect(searchActions.term).toHaveBeenCalledTimes(1);
  expect(searchActions.term).toHaveBeenCalledWith(null);
  expect(wrapper.instance().searchInput.value).toBe("");
});
