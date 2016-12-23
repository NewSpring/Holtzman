
import { shallow, mount } from "enzyme";
import { getSingleSpecWrapper } from "../../../util/tests/data-spec.js";

import Card from "../";

const generateComponent = (additionalProps={}) => (
    <Card {...additionalProps} />
);

it ('should render', () => {
  let wrapper = mount(generateComponent());

  expect(wrapper.html()).toMatchSnapshot();
});

it ('should accept linkAll prop', () => {
  //shallow here because meteor in imageloader is undefined
  const wrapper = shallow(generateComponent({
    link: "http://example.com",
    children: "hello world"
  }));
  const linked = shallow(generateComponent({
    link: "http://example.com",
    children: "hello world",
    linkAll: true
  }));

  const card = getSingleSpecWrapper(wrapper, "card");
  const linkedCard = getSingleSpecWrapper(linked, "card");

  expect(card.is("div")).toEqual(true);
  expect(linkedCard.is("Link")).toEqual(true);
});

it ('should accept classes prop', () => {
  let wrapper = mount(generateComponent({classes: ["test1", "test2"]}));
  let linked = mount(generateComponent({
      classes: ["test1", "test2"],
      linkAll: true
  }));

  const cardWrapper = getSingleSpecWrapper(wrapper, "card");
  const linkedCardWrapper = getSingleSpecWrapper(linked, "card");

  expect(linkedCardWrapper.hasClass("test1")).toEqual(true);
  expect(linkedCardWrapper.hasClass("test2")).toEqual(true);
  expect(cardWrapper.hasClass("test1")).toEqual(true);
  expect(cardWrapper.hasClass("test2")).toEqual(true);
});

it ('should accept theme prop', () => {
  let wrapper = mount(generateComponent({theme: "test"}));
  let linked = mount(generateComponent({
    theme: "test",
    linkAll: true
  }));

  const cardWrapper = getSingleSpecWrapper(wrapper, "card");
  const linkedCardWrapper = getSingleSpecWrapper(linked, "card");

  expect(linkedCardWrapper.hasClass("test")).toEqual(true);
  expect(cardWrapper.hasClass("test")).toEqual(true);
});

it ('should accept style prop', () => {
  const wrapper = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    styles: {backgroundColor: "red"}
  }));
  const linked = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    linkAll: true,
    styles: {backgroundColor: "red"}
  }));

  const cardWrapper = getSingleSpecWrapper(wrapper, "card");
  const linkedCardWrapper = getSingleSpecWrapper(linked, "card");

  expect(cardWrapper.html().indexOf("style=\"background-color: red;\"")).toBeGreaterThan(0);
  expect(linkedCardWrapper.html().indexOf("style=\"background-color: red;\"")).toBeGreaterThan(0);
});

it ('should accept wrapperClasses prop', () => {
  const wrapper = mount(generateComponent({
    children: "hello world",
    wrapperClasses: "test1 test2"
  }));
  const linkedWrapper = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    wrapperClasses: "test1 test2"
  }));
  const linkedAllWrapper = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    linkAll: true,
    wrapperClasses: "test1 test2"
  }));

  const imageWrapper = getSingleSpecWrapper(wrapper, "card-image-wrapper");
  const linkedImageWrapper = getSingleSpecWrapper(linkedWrapper, "card-image-wrapper");
  const linkedAllImageWrapper = getSingleSpecWrapper(linkedAllWrapper, "card-image-wrapper");

  expect(imageWrapper.hasClass("test1")).toEqual(true);
  expect(linkedImageWrapper.hasClass("test1")).toEqual(true);
  expect(linkedAllImageWrapper.hasClass("test1")).toEqual(true);
});

it ('should accept mobile prop', () => {
  const wrapper = mount(generateComponent({
    children: "hello world",
    wrapperClasses: "test1 test2",
    mobile: false
  }));

  const imageWrapper = getSingleSpecWrapper(wrapper, "card-image-wrapper");

  expect(imageWrapper.hasClass("visuallyhidden@handheld")).toEqual(true);
});

it ('should accept children prop', () => {
  const wrapper = mount(generateComponent({
    link: "http://example.com",
    children: "hello world"
  }));
  const linked = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    linkAll: true
  }));

  const cardItem = getSingleSpecWrapper(wrapper, "card-item");
  const linkedCardItem = getSingleSpecWrapper(linked, "card-item");

  expect(cardItem.text()).toEqual("hello world");
  expect(linkedCardItem.text()).toEqual("hello world");
});

it ('should accept itemClasses prop', () => {
  const wrapper = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    itemClasses: "test"
  }));
  const linked = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    linkAll: true,
    itemClasses: "test"
  }));

  const cardItem = getSingleSpecWrapper(wrapper, "card-item");
  const linkedCardItem = getSingleSpecWrapper(linked, "card-item");

  expect(cardItem.hasClass("test")).toEqual(true);
  expect(linkedCardItem.hasClass("test")).toEqual(true);
});

it ('should accept itemTheme prop', () => {
  //shallow here because meteor in imageloader is undefined
  const wrapper = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    itemTheme: "test"
  }));
  const linked = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    linkAll: true,
    itemTheme: "test"
  }));

  const cardItem = getSingleSpecWrapper(wrapper, "card-item");
  const linkedCardItem = getSingleSpecWrapper(linked, "card-item");

  expect(cardItem.hasClass("test")).toEqual(true);
  expect(linkedCardItem.hasClass("test")).toEqual(true);
});


it ('should accept itemStyles prop', () => {
  const wrapper = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    itemStyles: {backgroundColor: "red"}
  }));
  const linked = mount(generateComponent({
    link: "http://example.com",
    children: "hello world",
    linkAll: true,
    itemStyles: {backgroundColor: "red"}
  }));

  const cardItem = getSingleSpecWrapper(wrapper, "card-item");
  const linkedCardItem = getSingleSpecWrapper(linked, "card-item");

  expect(cardItem.html().indexOf("style=\"background-color: red;\"")).toBeGreaterThan(0);
  expect(linkedCardItem.html().indexOf("style=\"background-color: red;\"")).toBeGreaterThan(0);
});

it ('should accept background images option', () => {
  //shallow here because meteor in imageloader is undefined
  const wrapper = shallow(generateComponent({
    link: "http://example.com",
    image: {url: "http://placehold.it/100x100", full: true},
    children: "hello world",
    itemTheme: "test",
    linkAll: true
  }));

  const cardImage = getSingleSpecWrapper(wrapper, "card-image-wrapper");

  expect(
    cardImage
      .html()
      .indexOf("background-image:url(&#x27;http://placehold.it/100x100&#x27;);")
  ).toBeGreaterThan(0);
});

it ('should accept image ratio', () => {
  //shallow here because meteor in imageloader is undefined
  const wrapper = shallow(generateComponent({
    link: "http://example.com",
    image: {url: "http://placehold.it/100x100", ratio: "square"},
    children: "hello world",
    itemTheme: "test",
    linkAll: true
  }));

  const cardImage = getSingleSpecWrapper(wrapper, "card-image-wrapper");

  expect(cardImage.html().indexOf("ratio--square")).toBeGreaterThan(0);
});

// XXX Need to import meteor for this to work
/*
it ('should accept imageclasses prop', () => {
  //shallow here because meteor in imageloader is undefined
  const wrapper = mount(generateComponent({
    link: "http://example.com",
    image: {url: "http://placehold.it/100x100"},
    children: "hello world",
    imageclasses: ["test"]
  }));

  const cardImage = getSingleSpecWrapper(wrapper, "card-image-loader");

  expect(cardImage.find(".test").length).toBe(1);
});
*/

// XXX why is the link not rendering?
/*
it ('should accept link prop', () => {
  //shallow here because meteor in imageloader is undefined
  const wrapper = shallow(generateComponent({
    link: "http://example.com",
    image: {url: "http://placehold.it/100x100"},
    children: "hello world",
  }));
  const linked = shallow(generateComponent({
    link: "http://example.com",
    image: {url: "http://placehold.it/100x100"},
    children: "hello world",
    linkAll: true,
  }));

  const cardWrapper = getSingleSpecWrapper(wrapper, "card");
  const linkedCardWrapper = getSingleSpecWrapper(linked, "card");

  console.log(linkedCardWrapper.html());
  expect(cardWrapper.html().indexOf("href=\"http://example.com\"")).toBeGreaterThan(0);
  expect(linkedCardWrapper.html().indexOf("href=\"http://example.com\"")).toBeGreaterThan(0);
});
*/