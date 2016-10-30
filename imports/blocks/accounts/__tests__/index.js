import { Meteor } from "meteor/meteor";
import { shallow } from "enzyme";

import { AccountsContainer } from "../index";

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
