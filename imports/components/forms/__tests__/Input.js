// __tests__/Input.js

import React from 'react';
import { mount } from 'enzyme';
import Input from '../Input.js';
import { getSingleSpecWrapper } from "../../../util/tests/data-spec.js";

const generateComponent = (additionalProps={}) => (
    <Input {...additionalProps} />
);

it('Password input allows <> in field', () => {
  // Render a password with <> in the value
  const passwordInput = mount(
    <Input name="password" defaultValue="1234<>" />
  );

  expect(passwordInput.instance().getValue()).toEqual("1234<>");
});

it('Name input does not allow <> in field', () => {
  // Render a input with <> in the value
  const passwordInput = mount(
    <Input name="something" defaultValue="1234<>" />
  );

  expect(passwordInput.instance().getValue()).toEqual("1234");
});

it ("should render with no props", () => {
  let component = mount(generateComponent());
  expect(component.html()).toMatchSnapshot();
});

// XXX should input ID be the label? Can contain spaces
it ("should accept label prop", () => {
  let component = mount(generateComponent({
    label: "test label"
  }));
  expect(component.find("label").text()).toEqual("test label");
});

it ("should accept name prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    name: "myname"
  }));

  const labelProps = component.find("label").props();
  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(labelProps.htmlFor).toEqual("myname");
  expect(inputProps.name).toEqual("myname");
  expect(inputProps.id).toEqual("myname");
});

it ("should accept id prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    name: "myname",
    id: "myid"
  }));

  const labelProps = component.find("label").props();
  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(labelProps.htmlFor).toEqual("myid");
  expect(inputProps.id).toEqual("myid");
});

it ("should accept hideLabel prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    hideLabel: true
  }));

  expect(component.find("label").length).toEqual(0);
});

it ("should accept defaultValue", () => {
  let component = mount(generateComponent({
    label: "test label",
    hideLabel: true,
    defaultValue: "test value"
  }));

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.defaultValue).toEqual("test value");
});

// XXX Need to test label has disabled prop.
it ("should accept disabled prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    disabled: true
  }));

  // const inputHTML = getSingleSpecWrapper(component, "input").html();
  const inputProps = getSingleSpecWrapper(component, "input").props();

  // expect(inputHTML).toContain("disabled=\"\"");
  // expect(inputHTML).toContain("cursor: inherit");
  expect(inputProps.disabled).toEqual(true);
  expect(inputProps.style).toEqual({"cursor": "inherit"});
});

it ("should accept type prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    type: "text"
  }));

  // const inputHTML = getSingleSpecWrapper(component, "input").html();
  const inputProps = getSingleSpecWrapper(component, "input").props();

  // expect(inputHTML).toContain("type=\"text\"");
  expect(inputProps.type).toEqual("text");
});

it ("should accept classes prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    type: "text",
    classes: "testClass"
  }));

  let componentArr = mount(generateComponent({
    label: "test label",
    type: "text",
    classes: ["test1", "test2"]
  }));

  const wrapper = getSingleSpecWrapper(component, "input-wrapper");
  const wrapper2 = getSingleSpecWrapper(componentArr, "input-wrapper");

  expect(wrapper.hasClass("testClass")).toEqual(true);
  expect(wrapper2.hasClass("test2")).toEqual(true);
});

it ("should accept inputClasses prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    type: "text",
    inputClasses: "testClass"
  }));

  const input = getSingleSpecWrapper(component, "input");

  expect(input.hasClass("testClass")).toEqual(true);
});

it ("should accept style prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    type: "text",
    style: {backgroundColor: "red"}
  }));

  // const wrapperHTML = getSingleSpecWrapper(component, "input-wrapper").html();
  const wrapperProps = getSingleSpecWrapper(component, "input-wrapper").props();

  // expect(wrapperHTML).toContain("background-color: red");
  expect(wrapperProps.style).toEqual({"backgroundColor": "red"});
});

// TODO
it ("should accept value prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    type: "text",
    value: "harambe"
  }));

  // component.unmount();
  // component.mount();
  // console.log(component.html());
  const wrapperHTML = getSingleSpecWrapper(component, "input-wrapper").html();

  // expect(wrapperHTML).toContain("background-color: red");
});

it ("should accept placeholder prop", () => {
  let component = mount(generateComponent({
    label: "test label",
    type: "text",
    placeholder: "harambe"
  }));

  const inputProps = getSingleSpecWrapper(component,"input").props();

  expect(inputProps.placeholder).toEqual("harambe");
});

/* ==== PROPS ====

DONE  defaultValue: PropTypes.string,
      status: PropTypes.string,
DONE  disabled: PropTypes.any, // eslint-disable-line
      validation: PropTypes.func,
      errorText: PropTypes.string,
DEPR  theme: PropTypes.string,
DONE  type: PropTypes.string,
XXXX  error: PropTypes.any, // eslint-disable-line
DONE  classes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
      ]),
      children: PropTypes.any, // eslint-disable-line
DONE  id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
DONE  label: PropTypes.string,
DONE  name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]),
DONE  inputClasses: PropTypes.string, // eslint-disable-line
DONE  hideLabel: PropTypes.bool,
      autofocus: PropTypes.any, // eslint-disable-line
      format: PropTypes.func,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
DONE  style: PropTypes.object, //eslint-disable-line
DONE  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
DONE  placeholder: PropTypes.string,
      maxLength: PropTypes.number,
*/