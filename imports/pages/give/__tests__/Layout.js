
import Layout from "../Layout";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

const mockProps = {
  pathname: "/give/home",
  location: {
    pathname: "/give/home"
  },
  routes: [
    {
      path: "home",
      component: <div />
    }
  ]
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...mockProps,
    ...additionalProps,
  };
  return <Layout {...newProps}><div /></Layout>;
};

it("renders a layout", () => {
  const component = shallow(generateComponent());
  expect(shallowToJson(component)).toMatchSnapshot();
});