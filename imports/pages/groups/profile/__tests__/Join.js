import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Join, { ShowPhoneTextArea } from "../Join";

describe("Join", () => {
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
    loading: false,
    phones: [],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Join {...newProps} />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("calls the onClick function", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(generateComponent({
      onExit: mockOnClick,
    }));
    expect(mockOnClick).not.toHaveBeenCalled();
    wrapper.find("button[data-spec=\"cancel\"]").simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
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
});

describe("ShowPhoneTextArea", () => {
  const defaultProps = {
    loading: false,
    phones: [],
    show: true,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <ShowPhoneTextArea {...newProps} />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("shouldn't render if there is a phone number", () => {
    const additionalProps = {
      phones: ["(555) 555-5555"],
    };
    const wrapper = shallow(generateComponent(additionalProps));
    expect(shallowToJson(wrapper)).toBe("");
  });

  it("returns null if still loading", () => {
    const additionalProps = {
      loading: true,
      phones: ["(555) 555-5555"],
    };
    const wrapper = shallow(generateComponent(additionalProps));
    expect(shallowToJson(wrapper)).toBe("");
  });
});
