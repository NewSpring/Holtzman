import { mount, shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Layout from "../Layout";

const defaultProps = {
  home: {
    city: "anderson",
    zip: "22222",
    state: "SC",
    street1: "test street",
    street2: "apt. 1",
  },
  update: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("submit calls update with values from inputs", () => {
  const mockPreventDefault = jest.fn();
  const mockUpdate = jest.fn();
  const wrapper = mount(generateComponent({
    update: mockUpdate,
  }));
  wrapper.instance().submit({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockUpdate).toHaveBeenCalledTimes(1);
  // slightly different than props
  expect(mockUpdate).toHaveBeenCalledWith({
    City: "anderson",
    PostalCode: 22222,
    State: "SC",
    Street1: "test street",
    Street2: "apt. 1"
  });
});
