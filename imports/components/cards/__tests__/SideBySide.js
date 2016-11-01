
import { shallow, mount } from "enzyme";
import { getSingleSpecWrapper } from "../../../util/tests/data-spec.js";

import SideBySide from "../SideBySide";

const generateComponent = (additionalProps={}) => (
    <SideBySide {...additionalProps} />
);

it ('should render', () => {
  let wrapper = mount(generateComponent());

  expect(wrapper.html()).toMatchSnapshot();
});
