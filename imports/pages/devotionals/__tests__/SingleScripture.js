import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import DevotionsSingleScripture from "../SingleScripture";

const defaultProps = {
  devotion: {
    content: {
      scripture: [
        { book: "Job", passage: "2" },
        { book: "Job", passage: "3" },
      ],
    },
  },
  classes: [],
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <DevotionsSingleScripture { ...newProps } />;
};

it("renders scriptures", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("getClasses returns default classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getClasses();
  expect(result).toMatchSnapshot();
});

it("getClasses appends additional classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["test", "test2"],
  }));
  const result = wrapper.instance().getClasses();
  expect(result).toMatchSnapshot();
});
