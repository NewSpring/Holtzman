import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { getSingleSpecWrapper } from "../../../util/tests/data-spec.js";

import Remind from "../Remind";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("Remind", () => {
  it("should give default info if no props are passed", () => {
    const tree = shallow(
      <Remind />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("should click the back button one time", () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(
      <Remind back={mockOnClick} />
    );
    expect(mockOnClick).not.toHaveBeenCalled();
    getSingleSpecWrapper(wrapper, "back-button").simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should click the submit button one time", () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(
      <Remind onSubmit={mockOnClick} />
    );
    expect(mockOnClick).not.toHaveBeenCalled();
    wrapper.find("form").simulate("submit");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});