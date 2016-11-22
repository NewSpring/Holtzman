import { Meteor } from "meteor/meteor";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import AccountsContainerWithData, {
  AccountsContainer,
  Accounts,
} from "../";

jest.mock("../../../store/accounts", () => jest.fn());
jest.mock("../../../store/modal", () => jest.fn());

describe("redirect after sign in", () => {
  beforeEach(() => {
    // make window.location.href writable
    Object.defineProperty(window.location, "href", {
      writable: true,
      value: "/"
    });
    // mock Meteor.user
    Meteor.user = jest.fn();
  });

  it("redirects to relative url", () => {
    const url = "/test";
    const accountsMock = mockAccountsStore();
    const locationMock = mockLocationStore(url);
    const hideMock = jest.fn();

    const wrapper = shallow(
      <AccountsContainer
        accounts={accountsMock}
        location={locationMock}
        hide={hideMock}
      />
    );

    wrapper.setProps({
      accounts: {
        ...accountsMock,
        authorized: true,
      },
    });

    expect(window.location.href).toBe(url);
  });

  it("redirects to external url", () => {
    const url = "http://test.com";
    const accountsMock = mockAccountsStore();
    const locationMock = mockLocationStore(url);
    const hideMock = jest.fn();

    const wrapper = shallow(
      <AccountsContainer
        accounts={accountsMock}
        location={locationMock}
        hide={hideMock}
      />
    );

    wrapper.setProps({
      accounts: {
        ...accountsMock,
        authorized: true,
      },
    });

    expect(window.location.href).toBe(url);
  });

  it("does not redirect if no query param", () => {
    const accountsMock = mockAccountsStore();
    const locationMock = {
      query: {},
    };
    const hideMock = jest.fn();

    const wrapper = shallow(
      <AccountsContainer
        accounts={accountsMock}
        location={locationMock}
        hide={hideMock}
      />
    );

    wrapper.setProps({
      accounts: {
        ...accountsMock,
        authorized: true,
      },
    });

    expect(window.location.href).toBe("/");
  });
});

const mockAccountsStore = (overrides) => {
  const defaults = {
    data: {},
    errors: {},
    success: false,
    forgot: false,
    authorized: false,
    person: {},
    showWelcome: false,
    alternateAccounts: {},
    peopleWithoutAccountEmails: {},
    resettingAccount: false,
  };

  return {
    ...defaults,
    ...overrides,
  };
};

const mockLocationStore = (redirect) => (
  {
    query: {
      redirect
    },
  }
);

describe("Accounts", () => {
  const defaultProps = {
    setAccount: jest.fn(),
    save: jest.fn(),
    peopleWithoutAccountEmails: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Accounts { ...newProps } />
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("calls all the functions when not loading and person is present", () => {
    const mockSetAccount = jest.fn();
    const mockSave = jest.fn();
    const mockPeopleWithoutAccountEmails = jest.fn();
    const wrapper = shallow(generateComponent({
      setAccount: mockSetAccount,
      save: mockSave,
      peopleWithoutAccountEmails: mockPeopleWithoutAccountEmails,
    }));
    const nextProps = {
      data: {
        loading: false,
        person: {},
      },
    };
    wrapper.setProps(nextProps);
    expect(mockSetAccount).toHaveBeenCalledTimes(1);
    expect(mockSetAccount).toHaveBeenCalledWith(false);
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith(nextProps.data.person);
    expect(mockPeopleWithoutAccountEmails).toHaveBeenCalledTimes(1);
    expect(mockPeopleWithoutAccountEmails).toHaveBeenCalledWith([nextProps.data.person]);
  });

  it("does not call all the functions when loading", () => {
    const mockSetAccount = jest.fn();
    const mockSave = jest.fn();
    const mockPeopleWithoutAccountEmails = jest.fn();
    const wrapper = shallow(generateComponent({
      setAccount: mockSetAccount,
      save: mockSave,
      peopleWithoutAccountEmails: mockPeopleWithoutAccountEmails,
    }));
    const nextProps = {
      data: {
        loading: true,
        person: {},
      },
    };
    wrapper.setProps(nextProps);
    expect(mockSetAccount).toHaveBeenCalledTimes(0);
    expect(mockSave).toHaveBeenCalledTimes(0);
    expect(mockPeopleWithoutAccountEmails).toHaveBeenCalledTimes(0);
  });

  it("does not call all the functions when no person", () => {
    const mockSetAccount = jest.fn();
    const mockSave = jest.fn();
    const mockPeopleWithoutAccountEmails = jest.fn();
    const wrapper = shallow(generateComponent({
      setAccount: mockSetAccount,
      save: mockSave,
      peopleWithoutAccountEmails: mockPeopleWithoutAccountEmails,
    }));
    const nextProps = {
      data: {
        loading: false,
        person: null,
      },
    };
    wrapper.setProps(nextProps);
    expect(mockSetAccount).toHaveBeenCalledTimes(0);
    expect(mockSave).toHaveBeenCalledTimes(0);
    expect(mockPeopleWithoutAccountEmails).toHaveBeenCalledTimes(0);
  });
});
