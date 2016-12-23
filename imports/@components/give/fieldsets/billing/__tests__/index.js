import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Billing from "../";

const defaultProps = {
  data: {
    billing: {},
  },
  children: <span>hey</span>,
  save: () => {},
  clear: () => {},
  back: () => {},
  next: () => {},
  header: <span>header</span>,
  states: ["SC", "NC"],
  countries: ["USA", "CA"],
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Billing { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("streetAddress calls clear when no value", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().streetAddress("");
  expect(result).toBeTruthy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("billing", "streetAddress");
});

it("streetAddress calls save when value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().streetAddress("test");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    billing: {
      streetAddress: "test",
    },
  });
});

it("streetAddress2 calls save", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().streetAddress2("test");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    billing: {
      streetAddress2: "test",
    },
  });
});

it("saveState calls clear when no value", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().saveState("");
  expect(result).toBeTruthy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("billing", "state");
});

it("saveState calls save when value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().saveState("test");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    billing: {
      state: "test",
    },
  });
});

it("saveCountry calls clear when no value", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().saveCountry("");
  expect(result).toBeTruthy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("billing", "country");
});

it("saveCountry calls save when value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().saveCountry("test");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    billing: {
      country: "test",
    },
  });
});

it("city calls clear when no value", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().city("");
  expect(result).toBeTruthy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("billing", "city");
});

it("city calls save when value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().city("test");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    billing: {
      city: "test",
    },
  });
});

it("zip calls clear when no value", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().zip("");
  expect(result).toBeTruthy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("billing", "zip");
});

it("zip calls save when value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().zip("test");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    billing: {
      zip: "test",
    },
  });
});
