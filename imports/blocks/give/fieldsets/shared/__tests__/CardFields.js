import renderer from "react-test-renderer";
import { CardFields } from "../";
import { RenderIcon } from "../CardFields";

describe("RenderIcon", () => {
  const defaultProps = {
    payment: {},
    savedAccount: {},
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <RenderIcon { ...newProps } />;
  };

  it("should not render if no accountNumber or cardNumber", () => {
    const result = renderer.create(generateComponent());
    expect(result).toMatchSnapshot();
  });

  it("should not render if ach but no accountNumber", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "ach",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("should not render if card by no cardNumber", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "cc",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("should not render if no returned card type", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "cc",
        cardNumber: "0",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("should render if ach and accountNumber", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "ach",
        accountNumber: "123456789",
      },
    }));
    expect(result).toMatchSnapshot();
  });

  it("should render if card and cardNumber and cardType returns", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "cc",
        cardNumber: "4111-1111-1111-1111",
      },
    }));
    expect(result).toMatchSnapshot();
  });
});

describe("CardFields", () => {
  const defaultProps = {
    format: () => {},
    payment: {},
    saveData: () => {},
    savedAccount: {},
    validate: () => {},
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <CardFields { ...newProps } />;
  };

  it("should not render if type is ach", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "ach",
      },
    }));
    expect(result).toMatchSnapshot();
  });
  it("should render with props", () => {
    const result = renderer.create(generateComponent({
      payment: {
        type: "cc",
        cardNumber: "4111-1111-1111-1111",
        expiration: "11/22",
        ccv: "111",
      },
    }));
    expect(result).toMatchSnapshot();
  });
});
