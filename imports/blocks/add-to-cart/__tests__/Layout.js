import { Component } from "react";
import { mount, shallow } from "enzyme";
import { mountToJson, shallowToJson } from "enzyme-to-json";

import { reset, startBuffering } from "aphrodite/lib/inject";

import Layout from "../Layout";

import Subfund from "../Subfund";

jest.mock("../Subfund", () => jest.fn(() => <div />));
jest.mock("../../checkout-buttons", () => jest.fn(() => <div />));
jest.useFakeTimers();

const additionalAccounts = [
  { value: 1, label: "TEST 1" },
  { value: 2, label: "TEST 2" },
  { value: 3, label: "TEST 3" },
  { value: 4, label: "TEST 4" },
];

const generateComponent = (additionalProps = {}) => {
  const defaultProps = {
    accounts: [
      { value: "test" }
    ],
    subfunds: [
      {
        id: 1,
        accounts: [],
      },
    ],
    tota: 0,
    changeFund: () => {},
    changeAmount: () => {},
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

it("should render with minimal props", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});

it("should render without subfunds ", () => {
  const component = shallow(generateComponent({ subfunds: [] }));
  expect(shallowToJson(component)).toMatchSnapshot();
});
