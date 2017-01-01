import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import {
  RenderLikes,
  RenderRecents,
  LikesContainer,
} from "../";

jest.mock("../../../../../deprecated/database/collections/likes", () => jest.fn());

describe("RenderLikes", () => {
  const defaultProps = {
    likes: [
      {
        entryId: "1",
        category: "test category",
        image: "http://test.com/1.jpg",
        icon: "test-icon",
        link: "http://test.com/1",
      },
      {
        entryId: "2",
        category: "test category",
        image: "http://test.com/2.jpg",
        icon: "test-icon",
        link: "http://test.com/2",
      },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <RenderLikes { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("does not render without likes", () => {
    const wrapper = shallow(generateComponent({
      likes: null,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("does not render if blank array", () => {
    const wrapper = shallow(generateComponent({
      likes: [],
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("RenderRecents", () => {
  const defaultProps = {
    recentLikes: [
      {
        entryId: "1",
        category: "test category",
        image: "http://test.com/1.jpg",
        icon: "test-icon",
        link: "http://test.com/1",
      },
      {
        entryId: "2",
        category: "test category",
        image: "http://test.com/2.jpg",
        icon: "test-icon",
        link: "http://test.com/2",
      },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <RenderRecents { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("does not render if likes defined", () => {
    const wrapper = shallow(generateComponent({
      likes: [{}],
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("LikesContainer", () => {
  const defaultProps = {
    recentLikes: [
      {
        entryId: "1",
        category: "test category",
        image: "http://test.com/1.jpg",
        icon: "test-icon",
        link: "http://test.com/1",
      },
      {
        entryId: "2",
        category: "test category",
        image: "http://test.com/2.jpg",
        icon: "test-icon",
        link: "http://test.com/2",
      },
    ],
    likes: [
      {
        entryId: "1",
        category: "test category",
        image: "http://test.com/1.jpg",
        icon: "test-icon",
        link: "http://test.com/1",
      },
      {
        entryId: "2",
        category: "test category",
        image: "http://test.com/2.jpg",
        icon: "test-icon",
        link: "http://test.com/2",
      },
    ],
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <LikesContainer { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders loading if no likes", () => {
    const wrapper = shallow(generateComponent({
      likes: null,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
