
import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import TagSelect from "../TagSelect";

jest.mock("../../tags", () => () => <div/>);

const props = {
  items: [
    { label: "foo", value: "bar" },
    { label: "baz", value: "zoo" },
  ],
  onClick: jest.fn(),
};

it("renders with props", () => {
  const wrapper = shallow(<TagSelect {...props} />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

describe("Class", () => {
  describe("handleTagClick", () => {
    it("updates the state with the new value", () => {
      const wrapper = mount(<TagSelect {...props} />);
      const { handleTagClick } = wrapper.instance();
      handleTagClick(true);
      expect(wrapper.state().active).toEqual(true);
    });

    it("emptys the state if called with the current active value", () => {
      const wrapper = mount(<TagSelect {...props} />);
      const { handleTagClick } = wrapper.instance();
      handleTagClick("foo");
      expect(wrapper.state().active).toEqual("foo");
      handleTagClick("foo");
      expect(wrapper.state().active).toEqual("");
    });

    it("calls an onClick if present", () => {
      const spy = jest.fn();
      const wrapper = mount(<TagSelect {...props} onClick={spy} />);
      const { handleTagClick } = wrapper.instance();
      handleTagClick("foo");
      expect(spy).toBeCalledWith("foo");
    });
  });

  describe("isActive", () => {
    it("returns a boolean (true) if value matches state", () => {
      const wrapper = mount(<TagSelect {...props} />);
      const { handleTagClick, isActive } = wrapper.instance();
      handleTagClick("foo");

      expect(isActive("foo")).toEqual(true);
    });

    it("returns a boolean (false) if value matches state", () => {
      const wrapper = mount(<TagSelect {...props} />);
      const { handleTagClick, isActive } = wrapper.instance();
      handleTagClick("foobar");

      expect(isActive("foo")).toEqual(false);
    });
  });

  describe("canBeActive", () => {
    it("returns a boolean (true) if there is no active state", () => {
      const wrapper = mount(<TagSelect {...props} />);
      const { handleTagClick, canBeActive } = wrapper.instance();
      expect(canBeActive("foo")).toEqual(true);
    });

    it("returns a boolean (false) if value matches state", () => {
      const wrapper = mount(<TagSelect {...props} />);
      const { handleTagClick, canBeActive } = wrapper.instance();
      handleTagClick("foo");

      expect(canBeActive("foo")).toEqual(true);
    });
  });
});
