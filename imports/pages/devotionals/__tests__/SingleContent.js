import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import DevotionsSingleContent from "../SingleContent";

const defaultProps = {
  devotion: {
    content: {
      body: "<h1>devotion</h1>",
      images: [],
    },
  },
  classes: [],
  onClickLink: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <DevotionsSingleContent { ...newProps } />;
};

it("renders without images or scripture", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with an image", () => {
  const wrapper = shallow(generateComponent({
    devotion: {
      content: {
        body: "<h1>devotion</h1>",
        images: [
          { fileLabel: "1:1", url: "http://test.com/1x1.jpg" }
        ],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with scripture", () => {
  const wrapper = shallow(generateComponent({
    devotion: {
      content: {
        body: "<h1>devotion</h1>",
        images: [
          { fileLabel: "1:1", url: "http://test.com/1x1.jpg" }
        ],
        scriptures: [
          { book: "Job", passage: "2" },
        ],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("getClasses returns default classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getClasses();
  expect(result).toMatchSnapshot();
});

it("getClasses appends other classes provided", () => {
  const wrapper = shallow(generateComponent({
    classes: ["test", "test2"],
  }));
  const result = wrapper.instance().getClasses();
  expect(result).toMatchSnapshot();
});
