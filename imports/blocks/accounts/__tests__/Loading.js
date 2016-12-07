import { shallow } from "enzyme";
import Loading from "../Loading";

const defaultProps = {
  account: false,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Loading { ...newProps } />;
};

it("renders no account version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});

it("renders account version", () => {
  const wrapper = shallow(generateComponent({
    account: true,
  }));
  expect(wrapper).toMatchSnapshot();
});
