import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { TemplateWithoutData as Template } from "../";
import moment from "moment";

const defaultProps = {
  loading: false,
  transactions: [],
  changeDates: jest.fn(),
  changeFamily: jest.fn(),
  Loading: jest.fn(),
  done: false,
  filter: {
    family: [],
  },
  dispatch: jest.fn(),
  setRightProps: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Template { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("wrapRefetch updates refetching state", (done) => {
  const wrapper = shallow(generateComponent());
  const mockRefetch = jest.fn().mockReturnValue(new Promise((r) => r("test")));
  // call function returned by wrapRefetch
  wrapper.instance().wrapRefetch(mockRefetch)().then((x) => {
    expect(x).toBe("test");
    expect(mockRefetch).toHaveBeenCalledTimes(1);
    expect(wrapper.state().refetching).toBe(false);
    done();
  });
  expect(wrapper.state().refetching).toBe(true);
});

describe("onPrintClick", () => {
  it("should cancel default event action", () => {
    const getPDF = jest.fn(() => Promise.reject());
    const currentVariables = {limit: 20, start: "", end: ""};
    const click = shallow(generateComponent({getPDF, currentVariables})).instance().onPrintClick;
    const e = {...(new Event("hey")), preventDefault: jest.fn()}
    click(e);
    expect(e.preventDefault).toBeCalled();
  });

  it("should default to pull YTD statement", () => {
    const getPDF = jest.fn(() => Promise.reject());
    const currentVariables = {limit: 20, start: "", end: ""};
    const startOfYear = moment().startOf("year");
    const click = shallow(generateComponent({getPDF, currentVariables})).instance().onPrintClick;
    click(new Event("hey"));
    expect(getPDF).toBeCalledWith({...currentVariables, start: startOfYear});
  });

  it("should allow setting of custom start/end/limit", () => {
    const getPDF = jest.fn(() => Promise.reject());
    const currentVariables = {limit: 999, start: "yo", end: "dawg"};
    const click = shallow(generateComponent({getPDF, currentVariables})).instance().onPrintClick;
    click(new Event("hey"));
    expect(getPDF).toBeCalledWith(currentVariables);
  });

  it("should set printLoading to true before starting", () => {
    const getPDF = jest.fn(() => Promise.reject());
    const currentVariables = {limit: 999, start: "yo", end: "dawg"};
    const component = shallow(generateComponent({getPDF, currentVariables}));
    const click = component.instance().onPrintClick;
    click(new Event("hey"));
    expect(component.state().printLoading).toEqual(true);
  });
});
