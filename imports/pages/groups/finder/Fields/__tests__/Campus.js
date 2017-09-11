import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Campus from "../Campus";

const defaultProps = {
  campuses: ["Greenville", "Anderson", "Aiken", "Northeast Columbia"],
  selectedCampus: "Anderson",
  onChange: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Campus {...newProps} />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with no campus", () => {
  const wrapper = shallow(
    generateComponent({
      selectedCampus: "",
    }),
  );
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("on inital load don't show the modal with selectedCampus", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().onFocus();
  expect(wrapper.state().focused).toBe(false);
  expect(wrapper.state().onload).toBe(false);
});

it("shows the modal with onFocus", () => {
  const wrapper = shallow(generateComponent());
  // onload prevents the modal from showing on inital load
  wrapper.setState({ onload: false });
  wrapper.instance().onFocus();
  expect(wrapper.state().focused).toBe(true);
});

it("shows the modal with onBlur", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().onBlur();
  expect(wrapper.state().focused).toBe(false);
});

it("sets campus state when campus is clicked", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().onClick({ target: { name: "aiken" } });
  expect(wrapper.state().campus).toEqual("aiken");
});
