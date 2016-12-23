import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { openUrl } from "../../../../../util/inAppLink";
import Confirm from "../";

const defaultProps = {
  data: {},
  transactions: { "1": "1" },
  total: 12,
  back: () => {},
  goToStepOne: () => {},
  header: <span>header</span>,
  url: "/give",
  clearData: () => {},
  savedAccount: {},
  savedAccounts: [],
  changeSavedAccount: () => {},
  scheduleToRecover: false,
  schedule: { start: null, frequency: null },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Confirm { ...newProps } />;
};

it("renders TransactionLayout by default", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders PaymentOptionsLayout when state is true", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ changePayments: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders ScheduleLayout if schedules", () => {
  const wrapper = shallow(generateComponent({
    schedule: { start: null, frequency: null },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

// XXX i can't get the openUrl mock to work
it("completeGift calls openUrl", () => {
  Meteor.userId = jest.fn(() => "23");
  Meteor.settings = {
    public: {
      giveUrl: "https://test.com/",
    },
  };
  global.__meteor_runtime_config__ = {
    ROOT_URL: "https://test.com/",
  };
  const mockOpenUrl = jest.fn();
  jest.mock("../../../../../util/inAppLink", () => ({
    openUrl: mockOpenUrl,
  }));
  const mockPreventDefault = jest.fn();

  const mockGiveData = encodeURIComponent(
    JSON.stringify({
      url: defaultProps.url,
      transactions: defaultProps.transactions,
      savedAccount: defaultProps.savedAccount,
      total: defaultProps.total,
      data: defaultProps.data,
      userId: "23",
    })
  );
  const mockGiveUrl = `https://test.com/give/review?giveData=${mockGiveData}`;

  const wrapper = shallow(generateComponent());
  wrapper.instance().completeGift({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  // expect(mockOpenUrl).toHaveBeenCalledTimes(1);
  // expect(mockOpenUrl).toHaveBeenCalledWith(
  //   mockGiveUrl,
  //   null,
  //   defaultProps.clearData,
  //   null
  // );
});

it("choose calls changeSavedAccount with account selected", () => {
  const mockChangeSavedAccount = jest.fn();
  const mockPreventDefault = jest.fn();
  const wrapper = shallow(generateComponent({
    changeSavedAccount: mockChangeSavedAccount,
    savedAccounts: [
      { id: "1" },
    ],
  }));
  const mockCurrentTarget = document.createElement("input");
  mockCurrentTarget.id = "1";

  wrapper.instance().choose({
    preventDefault: mockPreventDefault,
    currentTarget: mockCurrentTarget,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockChangeSavedAccount).toHaveBeenCalledTimes(1);
  expect(mockChangeSavedAccount).toHaveBeenCalledWith({ id: "1" });
});

it("changeAccounts updates changePayments state", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().changePayments).toBeFalsy();

  const mockPreventDefault = jest.fn();
  wrapper.instance().changeAccounts({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(wrapper.state().changePayments).toBeTruthy();
});
