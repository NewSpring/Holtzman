import { mount, shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { serverWatch } from "meteor/bjwiley2:server-watch";
import {
  PageWithoutData as Page,
  IsAlive,
} from "../";

describe("Page", () => {
  const defaultProps = {
    dispatch: jest.fn(),
    setRightProps: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Page { ...newProps } />
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("mounts and unmounts correctly", () => {
    const mockSetRightProps = jest.fn();
    const wrapper = mount(generateComponent({
      setRightProps: mockSetRightProps,
      accounts: {
        loading: false,
      },
    }));
    expect(mockSetRightProps).toHaveBeenCalledTimes(1);
    wrapper.unmount();
    expect(mockSetRightProps).toHaveBeenCalledTimes(2);
  });
});

describe("TemplateWithData", () => {
  it("returns true from serverWatch", () => {
    serverWatch.isAlive = jest.fn(() => false);
    const result = IsAlive();
    expect(result).toEqual({
      alive: false,
    });
  });

  it("returns false from serverWatch", () => {
    serverWatch.isAlive = jest.fn(() => true);
    const result = IsAlive();
    expect(result).toEqual({
      alive: true,
    });
  });

  it("catches errros from serverWatch", () => {
    serverWatch.isAlive = jest.fn(() => { throw "Error" });
    const result = IsAlive();
    expect(result).toEqual({
      alive: true,
    });
  });
});
