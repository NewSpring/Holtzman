import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { TemplateWithoutData as Template } from "../";

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
