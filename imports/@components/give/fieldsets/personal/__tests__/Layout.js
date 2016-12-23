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
  const defaultProps = {};
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Header { ...newProps } />;
  };

  it("renders default if no override", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders override if override", () => {
    const result = renderer.create(generateComponent({
      override: <span>override</span>,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("NextButton", () => {
  const defaultProps = {
    personal: {
      email: "test@test.com",
      firstName: "Jim",
      campusId: "2",
    },
    next: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <NextButton { ...newProps } />;
  };

  it("renders enabled styles if everything present", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("renders disabled styles if no email", () => {
    const result = renderer.create(generateComponent({
      personal: {
        email: null,
        firstName: "Jim",
        campusId: "2",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("renders disabled styles if no firstName", () => {
    const result = renderer.create(generateComponent({
      personal: {
        email: "test@test.com",
        firstName: null,
        campusId: "2",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("renders disabled styles if no campusId", () => {
    const result = renderer.create(generateComponent({
      personal: {
        email: "test@test.com",
        firstName: "Jim",
        campusId: null,
      },
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("Layout", () => {
  const defaultProps = {
    campus: jest.fn(),
    campuses: [],
    children: <span>child</span>,
    firstName: jest.fn(),
    header: <span>header</span>,
    isEmail: jest.fn(),
    lastName: jest.fn(),
    next: jest.fn(),
    personal: {
      email: "test@test.com",
      firstName: "Jim",
      campusId: "2",
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Layout { ...newProps } />;
  };

  it("renders with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});
