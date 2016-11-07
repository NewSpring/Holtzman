
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
  expect(wrapper2.hasClass("harambe")).toEqual(true);
});

it ("should display children", () => {
  let component = mount(generateComponent({
    children: "this is a test",
  }));
  expect(mountToJson(component)).toMatchSnapshot();

  const labelProps = getSingleSpecWrapper(component, "input-label").props();

  expect(labelProps.children).toEqual("this is a test");
});

it ("should accept an id", () => {
  let component = mount(generateComponent({
    id: "harambe",
  }));
  expect(mountToJson(component)).toMatchSnapshot();

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.id).toEqual("harambe");
});

// XXX Label doesn't actually display anything. Is that right?
it ("should accept label", () => {
  let component = mount(generateComponent({
    label: "harambe",
  }));
  expect(mountToJson(component)).toMatchSnapshot();
});

it ("should accept name prop", () => {
  let component = mount(generateComponent({
    name: "harambe",
  }));
  expect(mountToJson(component)).toMatchSnapshot();
});

it ("should add inputClasses with inputClasses prop", () => {
  let component = mount(generateComponent({
    inputClasses: "test1 harambe",
  }));

  expect(mountToJson(component)).toMatchSnapshot();

  const input = getSingleSpecWrapper(component, "input");

  expect(input.hasClass("harambe")).toEqual(true);
});

it ("should respond to onclick prop", () => {
  const spy = jest.fn();
  let component = mount(generateComponent({
    clicked: spy,
  }));

  expect(mountToJson(component)).toMatchSnapshot();

  const input = getSingleSpecWrapper(component, "input");
  input.simulate("click");

  expect(spy).toBeCalled();
});

it ("should hide label with hideLabel prop", () => {
  let component = mount(generateComponent({
    hideLabel: true,
  }));

  expect(mountToJson(component)).toMatchSnapshot();

  expect(component.find("label").length).toEqual(0);
});
