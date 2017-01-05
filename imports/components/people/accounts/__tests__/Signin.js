import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Validate from "../../../../util/validate";
import SignIn from "../Signin";

const defaultProps = {
  setAcction: jest.fn(),
  clear: jest.fn(),
  save: jest.fn(),
  data: {
    terms: true,
  },
  forgot: jest.fn(),
  account: false,
  header: null,
  submit: jest.fn(),
  toggles: ["Sign In", "Register"],
  completeAccount: jest.fn(),
  alternateAccounts: [],
  peopleWithoutAccountEmails: [],
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SignIn { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("can override header with prop", () => {
  const wrapper = shallow(generateComponent({
    header: <h1>override</h1>,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders alternate account version", () => {
  const wrapper = shallow(generateComponent({
    alternateAccounts: ["alternate@account.com"],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders people without accounts version", () => {
  const wrapper = shallow(generateComponent({
    peopleWithoutAccountEmails: [
      {
        id: 1,
        firstName: "jim",
        lastName: "bob",
        email: "jim@bob.com",
      },
      {
        id: 2,
        firstName: "steve",
        lastName: "bob",
        email: "steve@bob.com",
      },
    ],
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders account version", () => {
  const wrapper = shallow(generateComponent({
    account: true,
    data: {
      firstName: "tim",
      lastName: "bob",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders enabled button if has email, password, and terms", () => {
  const wrapper = shallow(generateComponent({
    account: true,
    data: {
      email: "tim@bob.com",
      password: "password",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("header renders default header", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().header()).toMatchSnapshot();
});

it("toggle calls setAccount with boolean", () => {
  const mockSetAccount = jest.fn();
  const wrapper = shallow(generateComponent({
    setAccount: mockSetAccount,
  }));
  wrapper.instance().toggle(1);
  expect(mockSetAccount).toHaveBeenCalledTimes(1);
  expect(mockSetAccount).toHaveBeenCalledWith(false);
});

it("isEmail calls save and returns true if valid", () => {
  Validate.isEmail = jest.fn(() => true);
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }))
  wrapper.setState({ showAlternativePeople: false });
  const result = wrapper.instance().isEmail("test@gmail.com");
  expect(result).toBe(true);
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ email: "test@gmail.com" });
  expect(wrapper.state().showAlternativePeople).toBe(true);
});

it("isEmail calls clear and returns false if invalid", () => {
  Validate.isEmail = jest.fn(() => false);
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }))
  wrapper.setState({ showAlternativePeople: false });
  const result = wrapper.instance().isEmail("test@gmail.com");
  expect(result).toBe(false);
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("email");
  expect(wrapper.state().showAlternativePeople).toBe(true);
});

it("savePassword calls save with password", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().savePassword("1234");
  expect(result).toBe(true);
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ password: "1234" });
});

it("liveSavePassword calls clear and returns falsy if invalid", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().liveSavePassword("");
  expect(result).toBeFalsy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("password");
});

it("liveSavePassword calls save and returns truthy if valid", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().liveSavePassword("1234");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ password: "1234" });
});

it("firstName calls clear and returns falsy if invalid", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().firstName("");
  expect(result).toBeFalsy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("firstName");
});

it("firstName calls save and returns truthy if valid", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().firstName("jim");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ firstName: "jim" });
});

it("lastName calls clear and returns falsy if invalid", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const result = wrapper.instance().lastName("");
  expect(result).toBeFalsy();
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("lastName");
});

it("lastName calls save and returns truthy if valid", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const result = wrapper.instance().lastName("bob");
  expect(result).toBeTruthy();
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ lastName: "bob" });
});

it("saveTerms calls save with checked state", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  const mockTarget = document.createElement("input");
  mockTarget.type = "checkbox";
  mockTarget.checked = true;
  wrapper.instance().saveTerms({
    target: mockTarget,
  });
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ terms: true });
});

it("changeEmails calls isEmail and setAccount", () => {
  const mockSetAccount = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockEvent = {
    preventDefault: mockPreventDefault,
    currentTarget: {
      dataset: {
        email: "test@gmail.com",
      },
    },
  };
  const wrapper = shallow(generateComponent({
    setAccount: mockSetAccount,
  }));
  const mockIsEmail = jest.fn();
  wrapper.instance().isEmail = mockIsEmail;
  wrapper.instance().changeEmails(mockEvent);
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockIsEmail).toHaveBeenCalledTimes(1);
  expect(mockIsEmail).toHaveBeenCalledWith(mockEvent.currentTarget.dataset.email);
  expect(mockSetAccount).toHaveBeenCalledTimes(1);
  expect(mockSetAccount).toHaveBeenCalledWith(true);
});

it("submit calls submit if all inputs validate and email and password present", () => {
  const mockSubmit = jest.fn();
  const wrapper = mount(generateComponent({
    submit: mockSubmit,
    data: {
      email: "test@gmail.com",
      firstName: "jim",
      lastName: "bob",
    },
  }));
  // save password since no default value
  wrapper.instance().refs.password.setValue("1234");
  const mockPreventDefault = jest.fn();
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  expect(mockSubmit).toHaveBeenCalledTimes(1);
});

it("selectPerson updates state and calls save", () => {
  const mockSave = jest.fn();
  const wrapper = shallow(generateComponent({
    save: mockSave,
  }));
  wrapper.instance().selectPerson("1");
  expect(wrapper.state().selectedPerson).toBe("1");
  expect(mockSave).toHaveBeenCalledTimes(1);
  expect(mockSave).toHaveBeenCalledWith({ personId: "1" });
});

it("selectPerson updates state and calls clear if already selected", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  wrapper.setState({ selectedPerson: "1" });
  wrapper.instance().selectPerson("1");
  expect(wrapper.state().selectedPerson).toBe(null);
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("data");
});

it("createNewPerson calls preventDefault, updates state, and calls clear", () => {
  const mockClear = jest.fn();
  const wrapper = shallow(generateComponent({
    clear: mockClear,
  }));
  const mockPreventDefault = jest.fn();
  wrapper.instance().createNewPerson({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(wrapper.state().showAlternativePeople).toBe(false);
  expect(mockClear).toHaveBeenCalledTimes(1);
  expect(mockClear).toHaveBeenCalledWith("data");
});

it("completeAccount calls prevent default and completeAccount", () => {
  const mockCompleteAccount = jest.fn();
  const wrapper = shallow(generateComponent({
    completeAccount: mockCompleteAccount,
  }));
  const mockPreventDefault = jest.fn();
  wrapper.instance().completeAccount({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockCompleteAccount).toHaveBeenCalledTimes(1);
});
