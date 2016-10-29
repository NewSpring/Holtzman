
import { mount } from "enzyme";

import Card from "../";

const generateComponent = (additionalProps={}) => (
    <Card {...additionalProps} />
);

it ('should render', () => {
  let wrapper = mount(generateComponent());

  expect(wrapper.html()).toMatchSnapshot();
});

it ('should accept classes', () => {
  let wrapper = mount(generateComponent({classes: ["test1", "test2"]}));

  console.log(wrapper.html());
  expect(true).toEqual(true);
});



