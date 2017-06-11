import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  audio as audioActions,
} from "../../../data/store";
import {
  MusicAlbumWithoutData as MusicAlbum,
  ALBUM_QUERY,
} from "../Album";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});

jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store", () => ({
  audio: {
    dock: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  album: {
    content: {
      content: {
        id: "1",
        title: "sweet jams",
        tracks: [
          { file: "http://test.com/test.mp3" },
          { file: "http://test.com/test.mp3" },
          { file: "http://test.com/test.mp3" },
        ],
        images: [
          {
            fileName: "blur",
            size: "xsmall",
            url: "http://test.com/xsmall.blur.jpg",
          },
          {
            fileName: "normal",
            size: "medium",
            url: "http://test.com/medium.blur.jpg",
          },
        ],
      },
    },
  },
  modalVisible: false,
  albumArtist: "artist",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <MusicAlbum { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without album artist", () => {
  const wrapper = shallow(generateComponent({
    albumArtist: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if not content", () => {
  const wrapper = shallow(generateComponent({
    album: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("adjust style if modal visible", () => {
  const wrapper = shallow(generateComponent({
    modalVisible: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query correctly", () => {
  expect(ALBUM_QUERY).toMatchSnapshot();
});

it("shuffle toggles repeatPattern between shuffle and next", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().repeatPattern).toBe("next");
  wrapper.instance().shuffle();
  expect(wrapper.state().repeatPattern).toBe("shuffle");
  wrapper.instance().shuffle();
  expect(wrapper.state().repeatPattern).toBe("next");
});

it("repeat toggles repeatPattern between repeat, repeatAll and next", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().repeatPattern).toBe("next");
  wrapper.instance().repeat();
  expect(wrapper.state().repeatPattern).toBe("repeat");
  wrapper.instance().repeat();
  expect(wrapper.state().repeatPattern).toBe("repeatAll");
  wrapper.instance().repeat();
  expect(wrapper.state().repeatPattern).toBe("next");
});
