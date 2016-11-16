import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { StateOrTerritory } from "../";

const defaultProps = {
  billing: {
    country: "US",
  },
  states: ["SC", "NC", "WC", "EC"],
  saveState: () => {},
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <StateOrTerritory { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders with default state as SC", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("renders with predefined state", () => {
  const result = renderer.create(generateComponent({
    billing: {
      state: "NC",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("renders if country is `CA`", () => {
  const result = renderer.create(generateComponent({
    billing: {
      country: "CA",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("renders if no country", () => {
  const result = renderer.create(generateComponent({
    billing: {
      country: null,
    },
  }));
  expect(result).toMatchSnapshot();
});

it("does not render if country without states", () => {
  const result = renderer.create(generateComponent({
    billing: {
      country: "UK",
    },
  }));
  expect(result).toMatchSnapshot();
});
