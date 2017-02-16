import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Layout, { getImage, RenderRecentLikes } from "../Layout";
import { getSingleSpecWrapper } from "../../../../util/tests/data-spec";
import RecentLikes from "../../../shared/likes-list";

describe("getImage", () => {
  it("returns 2:1 by default", () => {
    const images = [
      { url: "http://test.com/1x1.jpg", fileLabel: "1:1" },
      { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
    ];
    const result = getImage(images);
    expect(result).toBe(images[1].url);
  });

  it("returns label if specified", () => {
    const images = [
      { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
      { url: "http://test.com/1x1.jpg", fileLabel: "1:1" },
    ];
    const result = getImage(images, "1:1");
    expect(result).toBe(images[1].url);
  });

  it("returns any image if not the one you want", () => {
    const images = [
      { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
    ];
    const result = getImage(images, "1:1");
    expect(result).toBe(images[0].url);
  });
});

describe("Layout", () => {
  const defaultProps = {
    featuredItem: {
      title: "test title",
      meta: {
        urlTitle: "test-title",
      },
      content: {
        images: [
          { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
        ],
      },
    },
    recommendedItems: [
      {
        title: "recommend one",
        meta: {
          urlTitle: "recommend-one",
          date: "12-12-2012",
        },
        content: {
          images: [
            { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
          ],
        },
      },
      {
        title: "recommend two",
        meta: {
          urlTitle: "recommend-two",
          date: "12-12-2012",
        },
        content: {
          images: [
            { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
          ],
        },
      },
    ],
    textItems: [
      {
        title: "text one",
        meta: {
          urlTitle: "text-one",
          date: "12-12-2012",
        },
        content: {
          images: [
            { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
          ],
        },
      },
      {
        title: "text two",
        meta: {
          urlTitle: "text-two",
          date: "12-12-2012",
        },
        content: {
          images: [
            { url: "http://test.com/2x1.jpg", fileLabel: "2:1" },
          ],
        },
      },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Layout { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("works without featured item", () => {
    const wrapper = shallow(generateComponent({
      featuredItem: null,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("RenderRecentLikes", () => {

  const defaultProps = {
    recentLikes: [],
    recentLoading: false,
    show: true,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <RenderRecentLikes { ...newProps } />;
  };

  beforeEach(() => {

  });

  it("should not render with no likes", () => {
    const component = shallow(generateComponent({ show: true, recentLoading: false, recentLikes: null }));
    expect(shallowToJson(component)).toEqual(null);
  });

  it("should not render if on web", () => {
    const component = shallow(generateComponent({ show: false }));
    expect(shallowToJson(component)).toEqual(null);
  });

  it("should render loading if it is loading", () => {
    const component = shallow(generateComponent({ recentLoading: true, show: true }));
    expect(component.find("Spinner").length).toEqual(1);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  fit("should render likes if not loading", () => {
    const component = shallow(generateComponent({ recentLoading: false, show: true, recentLikes: ["yo", "dawg"] }));
    expect(component.find("Spinner").length).toEqual(0);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

});
