import renderer from "react-test-renderer";
import { ActionButton } from "../";

const defaultProps = {
  completeGift: () => {},
  payment: {
    type: "ach",
    accountNumber: "123456789",
  },
  schedule: { start: null },
};

it("should render web action button", () => {
  const result = renderer.create(
    <ActionButton { ...defaultProps } />
  );
  expect(result).toMatchSnapshot();
});

it("should render iOS action button", () => {
  // mock ios environment
  global.cordova = {
    platformId: "ios",
  };
  const result = renderer.create(
    <ActionButton { ...defaultProps } />
  );
  expect(result).toMatchSnapshot();
});

it("should only show the iOS messages if there isn't a schedule start", () => {
  // mock ios environment
  global.cordova = {
    platformId: "ios",
  };
  const theData = {
    completeGift: () => {},
    payment: {
      type: "ach",
      accountNumber: "123456789",
    },
    schedule: { start: "2017-01-10" },
  };
  const result = renderer.create(
    <ActionButton { ...theData } />
  );
  expect(result).toMatchSnapshot();
})
