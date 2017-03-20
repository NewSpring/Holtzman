import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import { Meteor } from "meteor/meteor";
import { actions as audioActions } from "../../../../../data/store/audio";
import Audio from "../../../../../util/vendor/players/audio";
import {
  AudioPlayerUtilityWithoutData as AudioPlayerUtility,
} from "../PlayerUtility";

global.Audio5 = jest.fn(() => ({
  on: jest.fn(),
  play: jest.fn(),
}));

const defaultProps = {
  audio: {
    state: "default",
    seek: 0,
    playing: {
      track: {
        title: "track title",
        duration: "12:23",
        file: "http://test.com/track.mp3",
      },
    },
    playlist: [
      {
        title: "track title",
        file: "http://test.com/1.mp3"
      },
      {
        title: "track title 2",
        file: "http://test.com/2.mp3"
      },
    ],
    repeat: "default",
    order: "default",
  },
  loading: jest.fn(),
  ready: jest.fn(),
  play: jest.fn(),
  setProgress: jest.fn(),
  next: jest.fn(),
  restart: jest.fn(),
  seek: jest.fn(),
  setPlaying: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <AudioPlayerUtility { ...newProps } />;
};

it("renders nothing but span", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("creates player when current title is not next title", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().player).toBeFalsy();
  const props = clone(defaultProps);
  props.audio.playing.track.title = "new track";
  wrapper.setProps(props);
  expect(wrapper.instance().player).toBeTruthy();
});

it("calls toggle when next state is not this state (play/pause) and not default", () => {
  const props = clone(defaultProps);
  props.audio.state = "playing";
  const wrapper = shallow(generateComponent(props));
  const nextProps = clone(props);
  nextProps.audio.state = "paused";
  const mockToggle = jest.fn();
  wrapper.instance().toggle = mockToggle;
  wrapper.setProps(nextProps);
  expect(mockToggle).toHaveBeenCalledTimes(1);
});

it("calls next when next state is not this state (playing) and not default", () => {
  const props = clone(defaultProps);
  props.audio.state = "playing";
  const wrapper = shallow(generateComponent(props));
  const nextProps = clone(props);
  nextProps.audio.state = "next";
  const mockNext = jest.fn();
  wrapper.instance().next = mockNext;
  wrapper.setProps(nextProps);
  expect(mockNext).toHaveBeenCalledTimes(1);
});

it("calls previous when next state is not this state (playing) and not default", () => {
  const props = clone(defaultProps);
  props.audio.state = "playing";
  const wrapper = shallow(generateComponent(props));
  const nextProps = clone(props);
  nextProps.audio.state = "previous";
  const mockPrevious = jest.fn();
  wrapper.instance().previous = mockPrevious;
  wrapper.setProps(nextProps);
  expect(mockPrevious).toHaveBeenCalledTimes(1);
});

it("calls seek if current seek is not next seek", () => {
  const wrapper = shallow(generateComponent());
  const nextProps = clone(defaultProps);
  nextProps.audio.seek = 1;
  const mockSeek = jest.fn();
  wrapper.instance().seek = mockSeek;
  wrapper.setProps(nextProps);
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(1);
});

it("tracksWithFiles returns files from playlist", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().tracksWithFiles();
  expect(result).toEqual([
    {
      title: defaultProps.audio.playlist[0].title,
      file: defaultProps.audio.playlist[0].file
    },
    {
      title: defaultProps.audio.playlist[1].title,
      file: defaultProps.audio.playlist[1].file
    },
  ]);
});

it("createPlayer returns null if no file", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().createPlayer({}, false);
  expect(result).toBe(null);
});

it("createPlayer calls loading", () => {
  const mockLoading = jest.fn();
  const wrapper = shallow(generateComponent({
    loading: mockLoading,
  }));
  wrapper.instance().createPlayer(defaultProps.audio.playlist[0], false);
  expect(mockLoading).toHaveBeenCalledTimes(1);
});

it("createPlayer creates Audio on not ios", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().createPlayer(
    defaultProps.audio.playlist[0],
    false
  );
  expect(String(result.constructor.name)).toBe("Audio");
});

it("createPlayer calls release", () => {
  const wrapper = shallow(generateComponent());
  const mockRelease = jest.fn();
  const mockExisitingPlayer = new Audio();
  mockExisitingPlayer.release = mockRelease;
  wrapper.instance().player = mockExisitingPlayer;
  const result = wrapper.instance().createPlayer(
    defaultProps.audio.playlist[0],
    false
  );
  expect(mockRelease).toHaveBeenCalledTimes(1);
});

it("createPlayer prefixes tracks with https", () => {
  const props = clone(defaultProps);
  props.audio.playlist[0].file = "//test.com/no.mp3";
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().createPlayer(
    props.audio.playlist[0],
    false
  );
  // thanks param reassign
  expect(props.audio.playlist[0].file).toBe("https://test.com/no.mp3");
});

it("toggle returns if no player", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().toggle();
});

it("toggle returns if no playPause", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().player = {};
  wrapper.instance().toggle();
});

it("toggle calls play if playing", () => {
  const wrapper = shallow(generateComponent());
  const mockPlay = jest.fn();
  wrapper.instance().player = {
    play: mockPlay,
    playPause: jest.fn(),
  };
  wrapper.instance().toggle("playing");
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it("toggle calls pause if paused", () => {
  const wrapper = shallow(generateComponent());
  const mockPause = jest.fn();
  wrapper.instance().player = {
    pause: mockPause,
    playPause: jest.fn(),
  };
  wrapper.instance().toggle("paused");
  expect(mockPause).toHaveBeenCalledTimes(1);
});

it("createPlayer creates Media on ios", () => {
  Meteor.isCordova = true;
  global.cordova = {
    platformId: "ios",
  };
  global.Media = jest.fn(() => ({
    constructor: {
      name: "Media",
    },
    timeupdate: jest.fn(),
    ended: jest.fn(),
  }));
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().createPlayer(
    defaultProps.audio.playlist[0],
    false
  );
  expect(String(result.constructor.name)).toBe("Media");
});

it("toggle calls playPause otherwise", () => {
  const wrapper = shallow(generateComponent());
  const mockPlayPause = jest.fn();
  wrapper.instance().player = {
    playPause: mockPlayPause,
  };
  wrapper.instance().toggle();
  expect(mockPlayPause).toHaveBeenCalledTimes(1);
});

it("seek calls seekTo with new position", () => {
  const wrapper = shallow(generateComponent());
  const mockSeekTo = jest.fn();
  wrapper.instance().player = {
    seekTo: mockSeekTo,
  };
  wrapper.instance().seek(20);
  expect(mockSeekTo).toHaveBeenCalledTimes(1);
  expect(mockSeekTo).toHaveBeenCalledWith(148600);
});

it("next calls setPlaying with next track", () => {
  const mockSetPlaying = jest.fn();
  const wrapper = shallow(generateComponent({
    setPlaying: mockSetPlaying,
  }));
  wrapper.instance().next();
  expect(mockSetPlaying).toHaveBeenCalledTimes(1);
  expect(mockSetPlaying).toHaveBeenCalledWith({
    track: defaultProps.audio.playlist[1],
  });
});

it("next calls setPlaying with random track", () => {
  const props = clone(defaultProps);
  props.audio.order = "shuffle";
  const mockSetPlaying = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    setPlaying: mockSetPlaying,
  }));
  wrapper.instance().next();
  expect(mockSetPlaying).toHaveBeenCalledTimes(1);
  expect(mockSetPlaying).toHaveBeenCalledWith({
    track: props.audio.playlist[1],
  });
});

it("next calls restart and play if repeat one", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat-one";
  const mockSetPlaying = jest.fn();
  const mockPlay = jest.fn();
  const mockRestart = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    setPlaying: mockSetPlaying,
    restart: mockRestart,
    play: mockPlay,
  }));
  wrapper.instance().next();
  expect(mockSetPlaying).not.toHaveBeenCalled();
  expect(mockRestart).toHaveBeenCalledTimes(1);
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it("next calls seek and play if cordova", () => {
  Meteor.isCordova = true;
  const props = clone(defaultProps);
  props.audio.repeat = "repeat-one";
  const mockSetPlaying = jest.fn();
  const mockPlay = jest.fn();
  const mockSeek = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    setPlaying: mockSetPlaying,
    seek: mockSeek,
  }));
  wrapper.instance().player = {
    play: mockPlay,
  };
  wrapper.instance().next();
  expect(mockSetPlaying).not.toHaveBeenCalled();
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(0);
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it("previous calls setPlaying with previous track", () => {
  const mockSetPlaying = jest.fn();
  const wrapper = shallow(generateComponent({
    setPlaying: mockSetPlaying,
  }));
  wrapper.instance().previous();
  expect(mockSetPlaying).toHaveBeenCalledTimes(1);
  expect(mockSetPlaying).toHaveBeenCalledWith({
    track: defaultProps.audio.playlist[1],
  });
  expect(wrapper.state().force).toBe(false);
});

it("previous calls setPlaying with random track", () => {
  const props = clone(defaultProps);
  props.audio.order = "shuffle";
  const mockSetPlaying = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    setPlaying: mockSetPlaying,
  }));
  wrapper.instance().previous();
  expect(mockSetPlaying).toHaveBeenCalledTimes(1);
  expect(mockSetPlaying).toHaveBeenCalledWith({
    track: props.audio.playlist[1],
  });
});

it("previous calls restart and play if repeat one", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat-one";
  const mockSetPlaying = jest.fn();
  const mockPlay = jest.fn();
  const mockRestart = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    setPlaying: mockSetPlaying,
    restart: mockRestart,
    play: mockPlay,
  }));
  wrapper.instance().previous();
  expect(mockSetPlaying).not.toHaveBeenCalled();
  expect(mockRestart).toHaveBeenCalledTimes(1);
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it("previous calls seek and play if cordova", () => {
  Meteor.isCordova = true;
  const props = clone(defaultProps);
  props.audio.repeat = "repeat-one";
  const mockSetPlaying = jest.fn();
  const mockPlay = jest.fn();
  const mockSeek = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    setPlaying: mockSetPlaying,
    seek: mockSeek,
  }));
  wrapper.instance().player = {
    play: mockPlay,
  };
  wrapper.instance().previous();
  expect(mockSetPlaying).not.toHaveBeenCalled();
  expect(mockSeek).toHaveBeenCalledTimes(1);
  expect(mockSeek).toHaveBeenCalledWith(0);
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it("createPlayer creates Media on ios", () => {
  Meteor.isCordova = true;
  global.cordova = {
    platformId: "ios",
  };
  global.Media = jest.fn(() => ({
    constructor: {
      name: "Media",
    },
    timeupdate: jest.fn(),
    ended: jest.fn(),
  }));
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().createPlayer(
    defaultProps.audio.playlist[0],
    false
  );
  expect(String(result.constructor.name)).toBe("Media");
});
