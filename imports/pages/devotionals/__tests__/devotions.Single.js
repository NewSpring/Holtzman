import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { DevotionsSingleWithoutData as DevotionsSingle } from "../devotions.Single";

jest.mock("../../../mixins/mixins.Likeable", () => {});
jest.mock("../../../mixins/mixins.Shareable", () => {});
jest.mock("../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
  header: {
    set: jest.fn(),
    hide: jest.fn(),
  },
  live: {
    hide: jest.fn(),
  },
}));


const defaultProps = {
  dispatch: jest.fn(),
  live: {},
  devotion: {
    content: {
      content: {
        body: "<h1>devotion</h1>",
        images: [],
      },
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <DevotionsSingle { ...newProps } />;
};

it("renders without scripture or image", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading with no devotion", () => {
  const wrapper = shallow(generateComponent({
    devotion: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with image", () => {
  const wrapper = shallow(generateComponent({
    devotion: {
      content: {
        content: {
          body: "<h1>devotion</h1>",
          images: [
            { fileLabel: "1:1", url: "http://test.com/1x1.jpg" },
          ],
        },
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with scripture", () => {
  const wrapper = shallow(generateComponent({
    devotion: {
      content: {
        content: {
          body: "<h1>devotion</h1>",
          images: [
            { fileLabel: "1:1", url: "http://test.com/1x1.jpg" },
          ],
        },
        scripture: [
          { book: "Job", passage: "2" },
        ],
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
