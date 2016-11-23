import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";

import SideBySide from "../SideBySide";

const defaultProps = {
  classes: [],
  theme: null,
  link: null,
  itemClasses: [],
  images: [
    { fileLabel: "2:1", url: "http://test.com/2x1.jpg" },
    { fileLabel: "1:1", url: "http://test.com/1x1.jpg" },
    { fileLabel: "1:2", url: "http://test.com/1x2.jpg" },
  ],
  styles: null,
  ratio: null,
  defaultImage: "http://test.com/default.jpg",
  itemTheme: null,
  itemStyles: {
    color: "red",
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <SideBySide { ...newProps }>
      <h1>test</h1>
    </SideBySide>
  );
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("should render with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides with theme", () => {
  const wrapper = shallow(generateComponent({
    theme: "override me",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides with styles", () => {
  const wrapper = shallow(generateComponent({
    styles: {
      color: "orange",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides item theme", () => {
  const wrapper = shallow(generateComponent({
    itemTheme: "myItem",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders link version", () => {
  const wrapper = shallow(generateComponent({
    link: "http://test.com/link",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders link version with theme override", () => {
  const wrapper = shallow(generateComponent({
    link: "http://test.com/link",
    theme: "override link",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders link version with style override", () => {
  const wrapper = shallow(generateComponent({
    link: "http://test.com/link",
    styles: {
      color: "blue",
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders link version with item theme override", () => {
  const wrapper = shallow(generateComponent({
    link: "http://test.com/link",
    itemTheme: "myOtherItem",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("itemClasses renders defaults", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().itemClasses()).toMatchSnapshot();
});

it("itemClasses appends additional item classes", () => {
  const wrapper = shallow(generateComponent({
    itemClasses: ["one", "two"],
  }));
  expect(wrapper.instance().itemClasses()).toMatchSnapshot();
});

it("cardClasses renders defaults", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().cardClasses()).toMatchSnapshot();
});

it("cardClasses appends additional item classes", () => {
  const wrapper = shallow(generateComponent({
    classes: ["three", "four"],
  }));
  expect(wrapper.instance().cardClasses()).toMatchSnapshot();
});

it("styles returns default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().styles()).toEqual({
    overflow: "hidden",
  });
});

it("getResponsiveImage returns false if no images", () => {
  const wrapper = shallow(generateComponent({
    images: null,
  }));
  expect(wrapper.instance().getResponsiveImage()).toBe(false);
});

it("getResponsiveImage returns for all browser breakpoints", () => {
  const imageTypes = [
    ["(max-width: 480px)", "2:1"],
    ["(max-width: 730px)", "1:2"],
    ["(max-width: 768px)", "1:1"],
    ["(max-width: 1024px)", "2:1"],
    ["(max-width: 1281px)", "1:2"],
    // if no match found
    [false, "1:1"],
  ];
  imageTypes.map((image) => {
    window.matchMedia = jest.fn((media) => (
      { matches: media === image[0] }
    ));
    const wrapper = shallow(generateComponent());
    const result = wrapper.instance().getResponsiveImage();
    expect(result).toBe(defaultProps.images.filter((i) => i.fileLabel === image[1])[0].url);
  });
});

it("getResponsiveImage works with legacy cloudfront attribute", () => {
  const imageTypes = [
    ["(max-width: 480px)", "2:1"],
    ["(max-width: 730px)", "1:2"],
    ["(max-width: 768px)", "1:1"],
    ["(max-width: 1024px)", "2:1"],
    ["(max-width: 1281px)", "1:2"],
    // if no match found
    [false, "1:1"],
  ];
  const props = {
    images: [
      { fileLabel: "2:1", cloudfront: "http://test.com/2x1.jpg" },
      { fileLabel: "1:1", cloudfront: "http://test.com/1x1.jpg" },
      { fileLabel: "1:2", cloudfront: "http://test.com/1x2.jpg" },
    ],
  };
  imageTypes.map((image) => {
    window.matchMedia = jest.fn((media) => (
      { matches: media === image[0] }
    ));
    const wrapper = shallow(generateComponent(props));
    const result = wrapper.instance().getResponsiveImage();
    expect(result).toBe(props.images.filter((i) => i.fileLabel === image[1])[0].cloudfront);
  });
});


it("createImage renders default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().createImage()).toMatchSnapshot();
});

it("createImage uses custom ratio class", () => {
  const wrapper = shallow(generateComponent({
    ratio: "myRatio",
  }));
  expect(wrapper.instance().createImage()).toMatchSnapshot();
});

it("createImage uses default image if no images", () => {
  const wrapper = shallow(generateComponent({
    images: null,
  }));
  expect(wrapper.instance().createImage()).toMatchSnapshot();
});
