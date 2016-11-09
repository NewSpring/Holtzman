
import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";
// import ReactTestUtils from 'react-addons-test-utils' // ES6

import { createStore } from "redux";

import { Provider } from "react-redux";
import { reset, startBuffering } from "aphrodite/lib/inject";
// import { getSingleSpecWrapper } from "../../../../util/tests/data-spec.js";

import Layout from "../Layout";

jest.mock("../Subfund", () => jest.fn(() => <div />));
jest.mock("../../checkout-buttons", () => jest.fn(() => <div />));

const additionalAccounts = [
  {value: 1, label: "TEST 1"},
  {value: 2, label: "TEST 2"},
  {value: 3, label: "TEST 3"},
];

const generateComponent = (additionalProps={}) => {
  const store = createStore(jest.fn());
  const defaultProps = {
    accounts: [
      {value: "test"}
    ],
    monentize: jest.fn(),
    preFill: () => {},
  };
  return (
    <Layout {...defaultProps} {...additionalProps} />
  );
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

xit ("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

// XXX this will work fully when the stuff isn't mocked'
xit ("should handle multiple accounts", () => {
  const component = mount(generateComponent({accounts: additionalAccounts}));
  expect(mountToJson(component)).toMatchSnapshot();
});

// it ("", () => {});
// it ("", () => {});
// it ("", () => {});

// describe ("Layout > Update", () => {});
// describe ("Layout > Remove", () => {});