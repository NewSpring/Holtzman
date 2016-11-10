import { shallow } from "enzyme";
import { shallowToJson }from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { Meteor } from "meteor/meteor";
import { CartContainer } from "../index";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("CartContainer", () => {

  it("renders the default component", () => {
    const functionMock = jest.fn();

    const tree = shallow(
      <CartContainer
        accounts={{map: functionMock}}
        alive={true}
        addTransactions={functionMock}
        clearAllSchedulesExcept={functionMock}
        clearSchedules={functionMock}
        clearTransactions={functionMock}
        onClick={functionMock}
        removeSchedule={functionMock}
        saveSchedule={functionMock}
        setTransactionType={functionMock}
        text=""
      />
    );

    // wrapper.setProps({
    //   accounts: {
    //     ...accountsMock,
    //     authorized: true,
    //   },
    // });

    expect(shallowToJson(tree)).toMatchSnapshot();
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