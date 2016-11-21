import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import cloneDeep from "lodash.clonedeep";
import { Meteor } from "meteor/meteor";
import { actions as audioActions } from "../../../../store/audio";
import {
  AudioPlayerUtilityWithoutData as AudioPlayerUtility,
} from "../audio.PlayerUtility";

global.Audio5 = jest.fn(() => ({
  on: jest.fn(),
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
      { file: "http://test.com/1.mp3" },
      { file: "http://test.com/2.mp3" },
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
  const props = cloneDeep(defaultProps);
  props.audio.playing.track.title = "new track";
  wrapper.setProps(props);
  expect(wrapper.instance().player).toBeTruthy();
});

it("calls toggle when next state is not this state (play/pause) and not default", () => {
  const props = cloneDeep(defaultProps);
  props.audio.state = "playing";
  const wrapper = shallow(generateComponent(props));
  const nextProps = cloneDeep(props);
  nextProps.audio.state = "paused";
  const mockToggle = jest.fn();
  wrapper.instance().toggle = mockToggle;
  wrapper.setProps(nextProps);
  expect(mockToggle).toHaveBeenCalledTimes(1);
});

it("calls next when next state is not this state (playing) and not default", () => {
  const props = cloneDeep(defaultProps);
  props.audio.state = "playing";
  const wrapper = shallow(generateComponent(props));
  const nextProps = cloneDeep(props);
  nextProps.audio.state = "next";
  const mockNext = jest.fn();
  wrapper.instance().next = mockNext;
  wrapper.setProps(nextProps);
  expect(mockNext).toHaveBeenCalledTimes(1);
});

it("calls previous when next state is not this state (playing) and not default", () => {
  const props = cloneDeep(defaultProps);
  props.audio.state = "playing";
  const wrapper = shallow(generateComponent(props));
  const nextProps = cloneDeep(props);
  nextProps.audio.state = "previous";
  const mockPrevious = jest.fn();
  wrapper.instance().previous = mockPrevious;
  wrapper.setProps(nextProps);
  expect(mockPrevious).toHaveBeenCalledTimes(1);
});

it("calls seek if current seek is not next seek", () => {
  const wrapper = shallow(generateComponent());
  const nextProps = cloneDeep(defaultProps);
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
    { file: defaultProps.audio.playlist[0].file },
    { file: defaultProps.audio.playlist[1].file },
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
