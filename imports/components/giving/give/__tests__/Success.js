import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Success, {
  ScheduleThanks,
  OneTimeThanks,
  AdditionalMessage,
  CreateAccountFromGuest,
  ContactUs,
  ContactLink,
} from "../Success";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("ScheduleThanks", () => {
  const defaultProps = {
    total: 12,
    schedule: {
      start: "1912-12-12T19:00:32+00:00",
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <ScheduleThanks { ...newProps } />;
  };

  it("renders with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("does not render if no schedule", () => {
    const result = renderer.create(generateComponent({
      schedule: false,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("OneTimeThanks", () => {
  const defaultProps = {
    total: 12,
    email: "test@test.com",
    schedule: false,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <OneTimeThanks { ...newProps } />;
  };

  it("renders with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("does not render if schedule", () => {
    const result = renderer.create(generateComponent({
      schedule: {},
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("AdditionalMessage", () => {
  const defaultProps = {
    additionalMessage: "test",
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <AdditionalMessage { ...newProps } />;
  };

  it("renders with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("does not render if no additionalMessage", () => {
    const result = renderer.create(generateComponent({
      additionalMessage: null,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("CreateAccountFromGuest", () => {
  const defaultProps = {
    guest: true,
    onClick: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <CreateAccountFromGuest { ...newProps } />;
  };

  it("renders with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("does not render if not guest", () => {
    const result = renderer.create(generateComponent({
      guest: false,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("ContactLink", () => {
  const generateComponent = () => (
    <ContactLink />
  );

  it("renders", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});

describe("ContactUs", () => {
  const generateComponent = () => (
    <ContactUs />
  );

  it("renders", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});

describe("Success", () => {
  const defaultProps = {
    total: 12,
    email: "test@test.com",
    guest: false,
    onClick: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Success { ...newProps } />;
  };

  it("renders with props", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});
