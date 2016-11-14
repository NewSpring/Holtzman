import renderer from "react-test-renderer";
import Layout from "../Layout";

const defaultProps = {
  submit: jest.fn(),
  save: jest.fn(),
  state: {},
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
};

it("renders with disabled button without newP", () => {
  const result = renderer.create(generateComponent({
    state: {
      newP: false,
      newPDup: true,
    },
  }));
  expect(result).toMatchSnapshot();
});

it("renders with disabled button without newPDup", () => {
  const result = renderer.create(generateComponent({
    state: {
      newP: true,
      newPDup: false,
    },
  }));
  expect(result).toMatchSnapshot();
});

it("render with enabled button if newP and newPDup", () => {
  const result = renderer.create(generateComponent({
    state: {
      newP: true,
      newPDup: true,
    },
  }));
  expect(result).toMatchSnapshot();
});
