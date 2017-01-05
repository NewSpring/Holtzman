import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Layout, { Header, NextButton } from "../Layout";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("Header", () => {
  const generateComponent = (additionalProps = {}) => (
    <Header { ...additionalProps } />
  );

  it("renders default if no override", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders override if override", () => {
    const result = renderer.create(generateComponent({
      override: <span>meow</span>,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("NextButton", () => {
  const defaultProps = {
    billing: {
      streetAddress: "123 Some St.",
      city: "Someville",
    },
    next: () => {},
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <NextButton { ...newProps } />;
  };

  it("renders enabled styles when billing information present", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders disabled styles when no streetAddress", () => {
    const result = renderer.create(generateComponent({
      billing: {
        city: "Someville",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("renders disabled styles when no city", () => {
    const result = renderer.create(generateComponent({
      billing: {
        streetAddress: "123 Some St.",
      },
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("Layout", () => {
  const defaultProps = {
    back: () => {},
    billing: {
      streetAddress: "123 Some St.",
      streetAddress2: "Apt. 1",
      city: "Someville",
    },
    children: <span>child</span>,
    city: "Someville",
    countries: ["US", "CA"],
    header: <span>header</span>,
    next: () => {},
    saveCountry: () => {},
    saveState: () => {},
    states: ["SC", "NC"],
    streetAddress: "123 Some St.",
    streetAddress2: "Apt. 1",
    zip: "12345",
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Layout { ...newProps } />;
  };

  it("renders US by default", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders your country instead", () => {
    const result = renderer.create(generateComponent({
      billing: {
        streetAddress: "123 Some St.",
        streetAddress2: "Apt. 1",
        city: "Someville",
        country: "CA",
      },
    }));
    expect(result).toMatchSnapshot();
  });
});
