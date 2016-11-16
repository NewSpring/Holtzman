import renderer from "react-test-renderer";
import Err, {
  StepOneAction,
  AdditionalMessage,
  ContactLink,
  ContactUs,
} from "../Err";

describe("StepOneAction", () => {
  const defaultProps = {
    goToStepOne: jest.fn(),
  };
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <StepOneAction { ...newProps } />;
  };

  it("renders if step one function", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("does not render if no step one function", () => {
    const result = renderer.create(generateComponent({
      goToStepOne: null,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("AdditionalMessage", () => {
  const defaultProps = {
    additionalMessage: "message",
  };
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <AdditionalMessage { ...newProps } />;
  };

  it("renders if additional message", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("does not render if no additional message", () => {
    const result = renderer.create(generateComponent({
      additionalMessage: null,
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("ContactLink", () => {
  const defaultProps = {};
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <ContactLink { ...newProps } />;
  };

  it("renders", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});

describe("ContactUs", () => {
  const defaultProps = {};
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <ContactUs { ...newProps } />;
  };

  it("renders", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});

describe("Err", () => {
  const defaultProps = {
    msg: "error",
    goToStepOne: jest.fn(),
    additionalMessage: "additional",
  };
  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Err { ...newProps } />;
  };

  it("renders", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });
});
