// __tests__/Input.js

import React from "react";
import { mount } from "enzyme";
import Input from "../Input.js";
import { getSingleSpecWrapper } from "../../../../../util/tests/data-spec.js";
import { mountToJson } from "enzyme-to-json";

const generateComponent = (additionalProps = {}) =>
  <Input {...additionalProps} />;

it("Password input allows <> in field", () => {
  // Render a password with <> in the value
  const passwordInput = mount(<Input name="password" defaultValue="1234<>" />);

  expect(passwordInput.instance().getValue()).toEqual("1234<>");
});

it("Name input does not allow <> in field", () => {
  // Render a input with <> in the value
  const passwordInput = mount(<Input name="something" defaultValue="1234<>" />);

  expect(passwordInput.instance().getValue()).toEqual("1234");
});

it("should render with no props", () => {
  const component = mount(generateComponent());
  expect(mountToJson(component)).toMatchSnapshot();
});

// XXX should input ID be the label? Can contain spaces
it("should accept label prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
    }),
  );
  expect(component.find("label").text()).toEqual("test label");
});

it("should accept name prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      name: "myname",
    }),
  );

  const labelProps = component.find("label").props();
  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(labelProps.htmlFor).toEqual("myname");
  expect(inputProps.name).toEqual("myname");
  expect(inputProps.id).toEqual("myname");
});

it("should accept id prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      name: "myname",
      id: "myid",
    }),
  );

  const labelProps = component.find("label").props();
  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(labelProps.htmlFor).toEqual("myid");
  expect(inputProps.id).toEqual("myid");
});

it("should accept hideLabel prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      hideLabel: true,
    }),
  );

  expect(component.find("label").length).toEqual(0);
});

it("should accept defaultValue", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      hideLabel: true,
      defaultValue: "test value",
    }),
  );

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.defaultValue).toEqual("test value");
});

// XXX Need to test label has disabled prop.
it("should accept disabled prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      disabled: true,
    }),
  );

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.disabled).toEqual(true);
  expect(inputProps.style).toEqual({ cursor: "inherit" });
});

it("should accept type prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
    }),
  );

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.type).toEqual("text");
});

it("should accept classes prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      classes: "testClass",
    }),
  );

  const componentArr = mount(
    generateComponent({
      label: "test label",
      type: "text",
      classes: ["test1", "test2"],
    }),
  );

  const wrapper = getSingleSpecWrapper(component, "input-wrapper");
  const wrapper2 = getSingleSpecWrapper(componentArr, "input-wrapper");

  expect(wrapper.hasClass("testClass")).toEqual(true);
  expect(wrapper2.hasClass("test2")).toEqual(true);
});

it("should accept inputClasses prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      inputClasses: "testClass",
    }),
  );

  const input = getSingleSpecWrapper(component, "input");

  expect(input.hasClass("testClass")).toEqual(true);
});

it("should accept style prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      style: { backgroundColor: "red" },
    }),
  );

  const wrapperProps = getSingleSpecWrapper(component, "input-wrapper").props();

  expect(wrapperProps.style).toEqual({ backgroundColor: "red" });
});

it("should accept placeholder prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      placeholder: "harambe",
    }),
  );

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.placeholder).toEqual("harambe");
});

it("should accept children", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      children: "hey there!",
    }),
  );

  expect(component.html()).toContain("hey there!");
});

it("should accept maxLength prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      maxLength: 10,
    }),
  );

  const inputProps = getSingleSpecWrapper(component, "input").props();

  expect(inputProps.maxLength).toEqual(10);
});

it("should accept autoFocus prop", () => {
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      autoFocus: true,
    }),
  );

  expect(component.state("focused")).toEqual(true);
});

it("should accept onChange prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      onChange: spy,
    }),
  );

  const input = getSingleSpecWrapper(component, "input");

  input.simulate("change");
  expect(spy).toBeCalled();
});

it("should accept onBlur prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      onBlur: spy,
    }),
  );

  const input = getSingleSpecWrapper(component, "input");

  input.simulate("focus");
  input.simulate("blur");
  expect(spy).toBeCalled();
});

it("should accept validation prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      validation: spy,
    }),
  );

  const input = getSingleSpecWrapper(component, "input");

  input.simulate("focus");
  input.simulate("blur");
  expect(spy).toBeCalled();
});

it("should accept format prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      format: spy,
    }),
  );

  const input = getSingleSpecWrapper(component, "input");

  input.simulate("change");
  expect(spy).toBeCalled();
});

it("should accept errorText prop", () => {
  // simulate error in validation
  const spy = jest.fn().mockReturnValue(false);
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      validation: spy,
      errorText: "my text",
    }),
  );

  const input = getSingleSpecWrapper(component, "input");

  input.simulate("focus");
  input.simulate("blur"); // validation calls after blur
  expect(spy).toBeCalled();

  const help = getSingleSpecWrapper(component, "help");

  expect(help.text()).toEqual("my text");
});

it("should accept an iconName prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      iconName: "location",
    }),
  );
  const componentProps = component.props();
  expect(componentProps.iconName).toEqual("location");
});

it("should accept an iconFill prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      iconName: "location",
      iconFill: "#4B384C",
    }),
  );
  const componentProps = component.props();
  expect(componentProps.iconFill).toEqual("#4B384C");
});

it("should accept an iconWidth prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      iconName: "location",
      iconFill: "#4B384C",
      iconWidth: "24px",
    }),
  );
  const componentProps = component.props();
  expect(componentProps.iconWidth).toEqual("24px");
});

it("should accept an iconHeight prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      iconName: "location",
      iconFill: "#4B384C",
      iconWidth: "24px",
      iconHeight: "24px",
    }),
  );
  const componentProps = component.props();
  expect(componentProps.iconHeight).toEqual("24px");
});

it("should accept an iconTitle prop", () => {
  const spy = jest.fn();
  const component = mount(
    generateComponent({
      label: "test label",
      type: "text",
      iconName: "location",
      iconFill: "#4B384C",
      iconWidth: "24px",
      iconHeight: "24px",
      iconTitle: "Location Icon",
    }),
  );
  const componentProps = component.props();
  expect(componentProps.iconTitle).toEqual("Location Icon");
});

// TODO
// it ("should accept value prop", () => {
//   let component = mount(generateComponent({
//     label: "test label",
//     type: "text",
//     value: "harambe"
//   }));

//   component.simulate("focus");
//   component.simulate("change");
//   component.simulate("blur");
//   console.log(component.html());
//   const wrapperHTML = getSingleSpecWrapper(component, "input-wrapper").html();
// });
