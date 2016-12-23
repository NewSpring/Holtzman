import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Validate from "../../../../../util/validate";
import Personal from "../";

const defaultProps = {
  data: {
    personal: {},
  },
  campuses: [],
  header: <span>header</span>,
  save: jest.fn(),
  clear: jest.fn(),
  next: jest.fn(),
  children: <span>child</span>,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Personal { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("firstName calls clear if no value", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));

  const result = wrapper.instance().firstName("");
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("firstName");
  expect(result).toBeTruthy();
});

it("firstName calls save if value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));

  const result = wrapper.instance().firstName("test");
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    personal: {
      firstName: "test",
    },
  });
  expect(result).toBeTruthy();
});

it("isEmail calls clear if not valid", () => {
  const mockIsEmail = jest.fn(() => false);
  Validate.isEmail = mockIsEmail;
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));

  const result = wrapper.instance().isEmail("");
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("email");
  expect(mockIsEmail).toHaveBeenCalledTimes(1);
  expect(mockIsEmail).toHaveBeenCalledWith("");
  expect(result).toBeFalsy();
});

it("isEmails calls save if value", () => {
  const mockIsEmail = jest.fn(() => true);
  Validate.isEmail = mockIsEmail;
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));

  const result = wrapper.instance().isEmail("test@test.com");
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    personal: {
      email: "test@test.com",
    },
  });
  expect(result).toBeTruthy();
});

it("lastName calls clear if no value", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));

  const result = wrapper.instance().lastName("");
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("lastName");
  expect(result).toBeTruthy();
});

it("lastName calls save if value", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));

  const result = wrapper.instance().lastName("test");
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    personal: {
      lastName: "test",
    },
  });
  expect(result).toBeTruthy();
});

it("campus calls save with value for campusId", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));

  const result = wrapper.instance().campus("2");
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({
    personal: {
      campusId: "2",
    },
  });
  expect(result).toBeTruthy();
});

it("campus calls save with value again for campus label", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    campuses: [
      { value: "1", label: "Anderson" },
      { value: "2", label: "Greenville" },
    ],
    save: mockSave,
  }));

  const result = wrapper.instance().campus("2");
  expect(mockSave).toHaveBeenCalledTimes(2);
  expect(mockSave).toHaveBeenCalledWith({
    personal: {
      campusId: "2",
    },
  });
  expect(mockSave).toHaveBeenCalledWith({
    personal: {
      campus: "Greenville",
    },
  });
  expect(result).toBeTruthy();
});

