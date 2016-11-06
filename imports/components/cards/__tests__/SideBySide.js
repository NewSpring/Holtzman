
import { shallow, mount } from "enzyme";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../util/tests/data-spec.js";

import SideBySide from "../SideBySide";

const generateComponent = (additionalProps={}) => (
    <SideBySide {...additionalProps} />
);

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it ('should render', () => {
  let wrapper = mount(generateComponent());

  expect(wrapper.html()).toMatchSnapshot();
});
