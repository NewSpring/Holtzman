
import { mount } from "enzyme";
import { getSingleSpecWrapper } from "../../../util/tests/data-spec.js";

import Card from "../";

const generateComponent = (additionalProps={}) => (
    <Card {...additionalProps} />
);

it ('should render', () => {
  let wrapper = mount(generateComponent());

  expect(wrapper.html()).toMatchSnapshot();
});

it ('should accept classes prop', () => {
  let wrapper = mount(generateComponent({classes: ["test1", "test2"]}));
  let linked = mount(generateComponent(
    {
      classes: ["test1", "test2"],
      linkAll: true
    }
  ));

  const cardWrapper = getSingleSpecWrapper(wrapper, "card-wrapper");
  const linkedCardWrapper = getSingleSpecWrapper(linked, "card-wrapper");

  expect(linkedCardWrapper.hasClass("test1")).toEqual(true);
  expect(linkedCardWrapper.hasClass("test2")).toEqual(true);
  expect(cardWrapper.hasClass("test1")).toEqual(true);
  expect(cardWrapper.hasClass("test2")).toEqual(true);
});

it ('should accept theme prop', () => {
  let wrapper = mount(generateComponent({theme: "test"}));
  let linked = mount(generateComponent(
    {
      theme: "test",
      linkAll: true
    }
  ));

  const cardWrapper = getSingleSpecWrapper(wrapper, "card-wrapper");
  const linkedCardWrapper = getSingleSpecWrapper(linked, "card-wrapper");

  expect(linkedCardWrapper.hasClass("test")).toEqual(true);
  expect(cardWrapper.hasClass("test")).toEqual(true);
});