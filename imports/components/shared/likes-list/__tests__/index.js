import LikesList, { getImage } from "../";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

jest.mock("../../../@primitives/UI/cards", () => ({
  MiniCard: (props) => <div />,
}));

describe("getImage", () => {
  let mockImages = [
    { fileLabel: "1:1", url: "harambe"},
    { fileLabel: "2:1", url: "cincinnati zoo"},
  ];

  it("should return empty string with null input", () => {
    expect(getImage()).toEqual("");
  });
  it("should find image by matching with label", () => {
    expect(getImage(mockImages, "1:1")).toEqual("harambe");
  });
  it("should default to 2:1 if no label passed", () => {
    expect(getImage(mockImages)).toEqual("cincinnati zoo");
  });
});

describe("likes list", () => {

  const mockLikes = [
    {__typename: "Group", id: "12345", name: "hello", photo: "zookeeper"},
    {
      __typename: "Content",
      channelName: "study_entries",
      content: {images: [{ fileLabel: "1:1", url: "harambe"}]},
      id: "12345",
      parent: null,
      title: "harambe"
    },
    {
      __typename: "Content",
      title: "Able",
      channelName: "newspring_albums",
      id: "3776",
      parent: null,
      content: {
        images: [
          {
            url: "harambe-tribute-one",
            fileLabel: null,
          },
          {
            url: "harambe-tribute-two",
            fileLabel: null,
          },
        ],
      },
    },
  ];

  const generateComponent = (additionalProps) =>
    <LikesList {...additionalProps} />

  it("should render with no likes", () => {
    const component = mount(generateComponent());
    expect(component.find("div").length).toEqual(1);
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should render likes", () => {
    const component = mount(generateComponent({
      likes: mockLikes,
    }));
    expect(component.find("MiniCard").length).toEqual(3);
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it("should properly parse category for likes", () => {
    const component = mount(generateComponent({
      likes: mockLikes,
    }));
    expect(component.find("MiniCard").get(0).props.category).toEqual("Groups");
    expect(component.find("MiniCard").get(1).props.category).toEqual("Devotionals");
    expect(component.find("MiniCard").get(2).props.category).toEqual("Albums");
  });

  it("should properly parse title for likes", () => {
    const component = mount(generateComponent({
      likes: mockLikes,
    }));
    expect(component.find("MiniCard").get(0).props.title).toEqual("hello");
    expect(component.find("MiniCard").get(1).props.title).toEqual("harambe");
    expect(component.find("MiniCard").get(2).props.title).toEqual("Able");
  });

  it("should properly parse image for likes", () => {
    const component = mount(generateComponent({
      likes: [...mockLikes, {
        __typename: "Content",
        channelName: "study_entries",
        content: {images: []},
        id: "12345",
        parent: {content: {images: [{ fileLabel: "1:1", url: "harambe's dad"}]}},
        title: "harambe's dad"
      }],
    }));
    expect(component.find("MiniCard").get(0).props.image).toEqual("zookeeper");
    expect(component.find("MiniCard").get(1).props.image).toEqual("harambe");
    expect(component.find("MiniCard").get(2).props.image).toEqual("harambe-tribute-one");
    expect(component.find("MiniCard").get(3).props.image).toEqual("harambe's dad");
  });

  it("should properly parse icon for likes", () => {
    const component = mount(generateComponent({
      likes: mockLikes,
    }));
    expect(component.find("MiniCard").get(0).props.icon).toEqual("icon-groups");
    expect(component.find("MiniCard").get(1).props.icon).toEqual("icon-category-text");
  });

  it("should properly parse link for likes", () => {
    const component = mount(generateComponent({
      likes: mockLikes,
    }));
    expect(component.find("MiniCard").get(0).props.link).toEqual("/groups/12345");
    expect(component.find("MiniCard").get(1).props.link).toEqual("/studies/null/entry/12345");
    expect(component.find("MiniCard").get(2).props.link).toEqual("/music/3776");
  });

});
