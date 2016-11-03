import { mount } from 'enzyme';
import Checkbox from '../Checkbox.js';
import { getSingleSpecWrapper } from "../../../util/tests/data-spec.js";
import { mountToJson } from "enzyme-to-json";

const generateComponent = (additionalProps={}) => (
    <Checkbox {...additionalProps} />
);

it ("should render with minimal props", () => {
  let component = mount(generateComponent());
  expect(mountToJson(component)).toMatchSnapshot();
});

it ("should accept a default value", () => {
  let component = mount(generateComponent({
    defaultValue: true
  }));
  expect(mountToJson(component)).toMatchSnapshot();

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.defaultChecked).toEqual("checked");
});

it ("should disable input with disabled prop", () => {
  let component = mount(generateComponent({
    disabled: true,
  }));
  expect(mountToJson(component)).toMatchSnapshot();

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.disabled).toEqual(true);
});

it ("should add classes with classes prop", () => {
  let component = mount(generateComponent({
    classes: ["test1", "harambe"],
  }));
  let component2 = mount(generateComponent({
    classes: "test1 harambe",
  }));
  expect(mountToJson(component)).toMatchSnapshot();
  expect(mountToJson(component2)).toMatchSnapshot();

  const wrapper = getSingleSpecWrapper(component, "input-wrapper");
  const wrapper2 = getSingleSpecWrapper(component2, "input-wrapper");

  expect(wrapper.hasClass("harambe")).toEqual(true);
  expect(wrapper.hasClass("harambe")).toEqual(true);
});

/*
DONE  defaultValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
      ]),
DEPR  status: PropTypes.string,
DONE  disabled: PropTypes.any, // eslint-disable-line
DEPR  validation: PropTypes.func,
      errorText: PropTypes.string,
DEPR  theme: PropTypes.string,
DEPR  type: PropTypes.string,
      error: PropTypes.any, // eslint-disable-line
      classes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
      ]),
      children: PropTypes.any, // eslint-disable-line
      id: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      inputClasses: PropTypes.array, // eslint-disable-line
      clicked: PropTypes.func,
      hideLabel: PropTypes.bool,
*/