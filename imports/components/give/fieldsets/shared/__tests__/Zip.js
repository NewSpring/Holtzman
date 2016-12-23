import renderer from "react-test-renderer";
import { Zip } from "../";

const defaultProps = {
  billing: {
    country: "US",
    zip: "12345",
  },
  zip: () => {},
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Zip { ...newProps } />;
};

it("renders one-half if country is `US`", () => {
  const result = renderer.create(generateComponent());
  expect(result).toMatchSnapshot();
});

it("renders one-half if country is `CA`", () => {
  const result = renderer.create(generateComponent({
    billing: {
      country: "CA",
      zip: "23456",
    },
  }));
  expect(result).toMatchSnapshot();
});

it("renders one-half if no country", () => {
  const result = renderer.create(generateComponent({
    billing: {
      country: null,
    },
  }));
  expect(result).toMatchSnapshot();
});

it("renders one-whole for countries with no states", () => {
  const result = renderer.create(generateComponent({
    billing: {
      country: "UK",
    },
  }));
  expect(result).toMatchSnapshot();
});
