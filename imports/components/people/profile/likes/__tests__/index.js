import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import {
  RenderLikes,
  LikesContainer,
} from "../";

jest.mock("../../../../shared/likes-list", () => (props) => <div>{JSON.stringify(props)}</div>);
jest.mock("../../../../@primitives/UI/loading", () => "Loading");

jest.mock("../../../../../deprecated/database/collections/likes", () => jest.fn());

const mockData = {
  likes: {
    loading: false,
    userFeed: [
      "hello",
      "world",
    ],
  },
  recentLikes: {
    loading: false,
    recentlyLiked: [
      "much recent",
      "so like",
      "very wow",
    ],
  }
};

const generateRenderLikes = (additionalProps) =>
  <RenderLikes {...additionalProps} />;

const generateLikesContainer = (additionalProps) =>
  <LikesContainer {...additionalProps} />

describe("RenderLikes", () => {
  it("should render loading with no props", () => {
    const component = mount(generateRenderLikes());
    expect(component.find("Loading").length).toEqual(1);
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should render likes only when provided", () => {
    const component = mount(generateRenderLikes({
      likes: mockData.likes,
      recentLikes: mockData.recentLikes,
    }));

    expect(component.find("Loading").length).toEqual(0);
    expect(component.html().includes("hello")).toEqual(true);
    expect(component.html().includes("such")).toEqual(false);
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should render recentLikes only when likes not provided", () => {
    const component = mount(generateRenderLikes({
      likes: { loading: false },
      recentLikes: mockData.recentLikes,
    }));

    expect(component.find("Loading").length).toEqual(0);
    expect(component.html().includes("very")).toEqual(true);
    expect(mountToJson(component)).toMatchSnapshot();
  });
});

describe("LikesContainer", () => {
  it("should render children", () => {
    const component = mount(generateLikesContainer());

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find(RenderLikes).length).toEqual(1);
  });

  it("should pass props to children", () => {
    const component = mount(generateLikesContainer({
      likes: {loading: true},
      recentLikes: {loading: false},
    }));

    expect(mountToJson(component)).toMatchSnapshot();
    expect(component.find(RenderLikes).length).toEqual(1);
    expect(component.find("Loading").length).toEqual(1);
  });

});
