import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Join from "../Join";

const defaultProps = {
  onClick: jest.fn(),
  group: {
    name: "happy group",
    members: [
      { role: "leader", person: { firstName: "jim" } },
      { role: "leader", person: { nickName: "bob" } },
    ],
  },
  onExit: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Join { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("onClick calls updates state and calls onClick", () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(generateComponent({
    onClick: mockOnClick,
  }));
  wrapper.instance().onClick("e");
  expect(wrapper.state().state).toBe("loading");
  expect(mockOnClick).toHaveBeenCalledTimes(1);
  expect(mockOnClick.mock.calls[0][0]).toBe("e");

  // callback without error
  const result = mockOnClick.mock.calls[0][1](null);
  expect(wrapper.state().state).toBe("success");
  expect(result).toBe(null);
});

it("onClick calls updates state and calls onClick with error", () => {
  jest.useFakeTimers();
  const mockOnClick = jest.fn();
  const wrapper = shallow(generateComponent({
    onClick: mockOnClick,
  }));
  wrapper.instance().onClick("e");
  expect(wrapper.state().state).toBe("loading");
  expect(mockOnClick).toHaveBeenCalledTimes(1);
  expect(mockOnClick.mock.calls[0][0]).toBe("e");

  // callback without error
  mockOnClick.mock.calls[0][1](true);
  expect(wrapper.state().state).toBe("error");
  jest.runAllTimers();
  expect(wrapper.state().state).toBe("default");
});
