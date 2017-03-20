import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { clone } from "ramda";
import headerActions from "../../../../../data/store/header";
import {
  FullPlayerWithoutData as FullPlayer,
} from "../FullPlayer.js";

jest.mock("../../../../../data/store/header", () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

const defaultProps = {
  dispatch: jest.fn(),
  header: {
    visible: true,
  },
  playing: {
    album: {
      channelName: "music",
      artist: "album artist",
      title: "test album",
      content: {
        colors: [
          { description: "primary", value: "ff0000" },
        ],
        isLight: false,
        images: [
          {
            fileLabel: "1:1",
            url: "http://test.com/1x1.jpg",
          },
          {
            fileLabel: "1:1",
            url: "http://test.com/1x1.blur.jpg",
          },
        ],
      },
    },
    track: {
      artist: "track artist",
    },
  },
  audio: {
    state: "default",
    order: "default",
    repeat: "default",
    playing: {
      album: {
        title: null,
      },
    },
  },
  data: {
    title: "test title",
    entryId: "2",
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.jpg",
        },
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.blur.jpg",
        },
      ],
    },
    tracks: [{}, {}],
  },
  setPlaylist: jest.fn(),
  setPlaying: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  resetOrder: jest.fn(),
  shuffle: jest.fn(),
  resetRepeat: jest.fn(),
  repeatOne: jest.fn(),
  state: "default",
  repeat: "default",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <FullPlayer { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without color", () => {
  const props = clone(defaultProps);
  props.playing.album.content.colors = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates header and state on mount", () => {
  const mockDispatch = jest.fn();
  headerActions.hide = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    header: {
      visible: false,
    },
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(headerActions.hide).toHaveBeenCalledTimes(1);
  expect(headerActions.hide).toHaveBeenCalledWith({
    statusBar: false,
  });
  expect(wrapper.state().hadHeader).toBe(false);
});

it("updates header on unmount", () => {
  const mockDispatch = jest.fn();
  headerActions.show = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
    header: {
      visible: false,
    },
  }));
  wrapper.unmount();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(headerActions.show).toHaveBeenCalledTimes(1);
  expect(headerActions.show).toHaveBeenCalledWith({
    visible: false,
    statusBar: true,
  });
});

it("setArtworkState updates to be short", () => {
  const mockArtworkContainer = {
    clientWidth: 2,
    clientHeight: 1,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  const result = wrapper.instance().setArtworkState();
  expect(result).toBe(null);
  expect(wrapper.state().isShort).toBe(true);
});

it("setArtworkState updates to be not short", () => {
  const mockArtworkContainer = {
    clientWidth: 1,
    clientHeight: 2,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  const result = wrapper.instance().setArtworkState();
  expect(result).toBe(null);
  expect(wrapper.state().isShort).toBe(false);
});

it("getArtist returns track artist first", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getArtist()).toBe(defaultProps.playing.track.artist);
});

it("getArtist returns album artist if no track artist", () => {
  const props = clone(defaultProps);
  props.playing.track.artist = null;
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().getArtist()).toBe(defaultProps.playing.album.artist);
});

it("getArtist returns NewSpring as last resort", () => {
  const props = clone(defaultProps);
  props.playing.track.artist = null;
  props.playing.album.artist = null;
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().getArtist()).toBe("NewSpring");
});

it("getImage returns regular image by default", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getImage(defaultProps.data);
  expect(result).toBe(defaultProps.data.content.images[0].url);
});

it("getImage returns blurred image if specified", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getImage(defaultProps.data, { blurred: true });
  expect(result).toBe(defaultProps.data.content.images[1].url);
});

it("getArtworkStyles returns regular styles if not short", () => {
  const mockArtworkContainer = {
    clientWidth: 1,
    clientHeight: 2,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  wrapper.instance().setArtworkState();
  const result = wrapper.instance().getArtworkStyles(defaultProps.playing.album);
  expect(result).toMatchSnapshot();
});

it("getArtworkStyles short styles if short", () => {
  const mockArtworkContainer = {
    clientWidth: 2,
    clientHeight: 1,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  wrapper.instance().setArtworkState();
  const result = wrapper.instance().getArtworkStyles(defaultProps.playing.album);
  expect(result).toMatchSnapshot();
});

it("getArtworkClasses returns default classes if short", () => {
  const mockArtworkContainer = {
    clientWidth: 2,
    clientHeight: 1,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  wrapper.instance().setArtworkState();
  const result = wrapper.instance().getArtworkClasses(defaultProps.playing.album);
  expect(result).toMatchSnapshot();
});

it("getArtworkClasses returns ratio classes if not short", () => {
  const mockArtworkContainer = {
    clientWidth: 1,
    clientHeight: 2,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  wrapper.instance().setArtworkState();
  const result = wrapper.instance().getArtworkClasses(defaultProps.playing.album);
  expect(result).toMatchSnapshot();
});

it("getArtworkContainerStyles returns blank object if not short", () => {
  const mockArtworkContainer = {
    clientWidth: 1,
    clientHeight: 2,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  wrapper.instance().setArtworkState();
  const result = wrapper.instance().getArtworkContainerStyles();
  expect(result).toEqual({});
});

it("getArtworkContainerStyles returns styles object if short", () => {
  const mockArtworkContainer = {
    clientWidth: 2,
    clientHeight: 1,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().refs = {
    artworkContainer: mockArtworkContainer,
  };
  wrapper.instance().setArtworkState();
  const result = wrapper.instance().getArtworkContainerStyles();
  expect(result).toMatchSnapshot();
});

it("toggle updates play state and playlist if not playing", () => {
  const mockSetPlaylist = jest.fn();
  const mockSetPlaying = jest.fn();
  const mockPlay = jest.fn();
  const wrapper = shallow(generateComponent({
    setPlaylist: mockSetPlaylist,
    setPlaying: mockSetPlaying,
    play: mockPlay,
  }));
  wrapper.instance().toggle();
  expect(mockSetPlaylist).toHaveBeenCalledTimes(1);
  expect(mockSetPlaylist).toHaveBeenCalledWith(defaultProps.data.tracks);
  expect(mockSetPlaying).toHaveBeenCalledTimes(1);
  expect(mockSetPlaying).toHaveBeenCalledWith({
    album: {
      title: defaultProps.data.title,
      image: defaultProps.data.content.images[0].url,
      blurredImage: defaultProps.data.content.images[1].url,
      id: defaultProps.data.entryId,
    },
    track: defaultProps.data.tracks[0],
  });
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it("toggle updates just pauses if playing and play state exists", () => {
  const props = clone(defaultProps);
  props.audio.playing.album.title = "test";
  props.audio.state = "playing";
  const mockSetPlaylist = jest.fn();
  const mockSetPlaying = jest.fn();
  const mockPause = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    setPlaylist: mockSetPlaylist,
    setPlaying: mockSetPlaying,
    pause: mockPause,
  }));
  wrapper.instance().toggle();
  expect(mockSetPlaylist).not.toHaveBeenCalled();
  expect(mockSetPlaying).not.toHaveBeenCalled();
  expect(mockPause).toHaveBeenCalledTimes(1);
});

it("shuffle calls shuffle if not shuffling", () => {
  const mockShuffle = jest.fn();
  const wrapper = shallow(generateComponent({
    shuffle: mockShuffle,
  }));
  wrapper.instance().shuffle();
  expect(mockShuffle).toHaveBeenCalledTimes(1);
});

it("shuffle calls reset order if shuffling", () => {
  const props = clone(defaultProps);
  props.audio.order = "shuffle";
  const mockResetOrder = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    resetOrder: mockResetOrder,
  }));
  wrapper.instance().shuffle();
  expect(mockResetOrder).toHaveBeenCalledTimes(1);
});

it("repeat calls repeat if default", () => {
  const mockRepeat = jest.fn();
  const wrapper = shallow(generateComponent({
    repeat: mockRepeat,
  }));
  wrapper.instance().repeat();
  expect(mockRepeat).toHaveBeenCalledTimes(1);
});

it("repeat calls reset repeat if repeat one", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat-one";
  const mockResetRepeat = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    resetRepeat: mockResetRepeat,
  }));
  wrapper.instance().repeat();
  expect(mockResetRepeat).toHaveBeenCalledTimes(1);
});

it("repeat calls repeat one if repeat", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat";
  const mockRepeatOne = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    repeatOne: mockRepeatOne,
  }));
  wrapper.instance().repeat();
  expect(mockRepeatOne).toHaveBeenCalledTimes(1);
});

it("hackBackgroundStyles returns style object", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().hackBackgroundStyles).toMatchSnapshot();
});
