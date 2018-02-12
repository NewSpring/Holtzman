import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import StoriesContent, { StoryImage } from "../Content";

describe("StoryImage", () => {
  const defaultProps = {
    story: {
      content: {
        images: [
          {
            fileLabel: "2:1",
            url: "http://test.com/2x1.jpg",
          },
          {
            fileLabel: "1:1",
            url: "http://test.com/1x1.jpg",
          },
          {
            fileLabel: "1:2",
            url: "http://test.com/1x2.jpg",
          },
        ],
      },
    },
  };

  const generateComponent = () => (
    <StoryImage { ...defaultProps } />
  );

  it("renders non tablet version", () => {
    window.isTablet = false;
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  // XXX mocking isTablet doesn't work here or some reason
  xit("renders tablet version", () => {
    window.isTablet = true
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("StoriesContent", () => {
  const defaultProps = {
    story: {
      id: "1",
      title: "test story",
      subtitle: "test subtitle",
      content: {
        body: "test body",
        images: [
          {
            fileLabel: "2:1",
            url: "http://test.com/2x1.jpg",
          },
          {
            fileLabel: "1:1",
            url: "http://test.com/1x1.jpg",
          },
          {
            fileLabel: "1:2",
            url: "http://test.com/1x2.jpg",
          },
        ],
        tags: ["one", "two"],
        wistiaId: "",
      },
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <StoriesContent { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders with video", () => {
    const props = clone(defaultProps);
    props.story.content.wistiaId = "test";
    const wrapper = shallow(generateComponent(props));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders without imaes", () => {
    const props = clone(defaultProps);
    props.story.content.images = [];
    const wrapper = shallow(generateComponent(props));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
