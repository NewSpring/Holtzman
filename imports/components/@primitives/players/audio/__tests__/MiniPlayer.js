import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { clone } from "ramda";
import { actions as audioActions } from "../../../../../data/store/audio";
import { MiniPlayerWithoutData as MiniPlayer } from "../MiniPlayer";

const defaultProps = {
  classes: null,
  audio: {
    playing: {
      album: {
        channelName: "music",
        title: "test title",
        artist: "album artist",
        content: {
          images: [
            {
              fileLabel: "1:1",
              url: "http://test.com/1x1.jpg",
              size: "small",
            },
          ],
        },
      },
      track: {
        artist: "track artist",
      },
    },
    state: "default",
  },
  dispatch: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  hide: jest.fn(),
  reset: jest.fn(),
  fade: jest.fn(),
  theme: null,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <MiniPlayer { ...newProps } />;
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

it("works without fileLabel", () => {
  const props = clone(defaultProps);
  props.audio.playing.album.content.images[0].fileLabel = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides with theme", () => {
  const wrapper = shallow(generateComponent({
    theme: "override",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("getArtistList returns track artist first", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getArtistLine();
  const trackArtist = defaultProps.audio.playing.track.artist;
  const collectionTitle = defaultProps.audio.playing.album.title;
  const expectedResult = `${trackArtist} – ${collectionTitle}`;
  expect(result).toBe(expectedResult);
});

it("getArtistList returns triest album artist next", () => {
  const props = clone(defaultProps);
  props.audio.playing.track.artist = null;
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().getArtistLine();
  const albumArtist = defaultProps.audio.playing.album.artist;
  const collectionTitle = defaultProps.audio.playing.album.title;
  const expectedResult = `${albumArtist} – ${collectionTitle}`;
  expect(result).toBe(expectedResult);
});

it("getArtistList returns NewSpring if nothing else", () => {
  const props = clone(defaultProps);
  props.audio.playing.track.artist = null;
  props.audio.playing.album.artist = null;
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().getArtistLine();
  const collectionTitle = defaultProps.audio.playing.album.title;
  const expectedResult = `NewSpring – ${collectionTitle}`;
  expect(result).toBe(expectedResult);
});

it("getArtistList returns reversed if series", () => {
  const props = clone(defaultProps);
  props.audio.playing.album.channelName = "series_newspring";
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().getArtistLine();
  const trackArtist = defaultProps.audio.playing.track.artist;
  const collectionTitle = defaultProps.audio.playing.album.title;
  const expectedResult = `${collectionTitle} – ${trackArtist}`;
  expect(result).toBe(expectedResult);
});

it("layoutClasses returns default classes by default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses appends classes from props", () => {
  const wrapper = shallow(generateComponent({
    classes: ["one", "two"],
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses adds transition class if transitioning", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ transition: true });
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("stopClasses returns default classes by default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().stopClasses()).toMatchSnapshot();
});

it("stopClasses adds transition class if transitioning", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ transition: true });
  expect(wrapper.instance().stopClasses()).toMatchSnapshot();
});

it("stopH6Classes returns default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().stopH6Classes()).toMatchSnapshot();
});

it("stopH6IconClasses returns default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().stopH6IconClasses()).toMatchSnapshot();
});

it("albumClasses returns default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().albumClasses()).toMatchSnapshot();
});

it("toggle stops event and starts play if not playing", () => {
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  const mockPlay = jest.fn();
  const wrapper = shallow(generateComponent({
    play: mockPlay,
  }));
  wrapper.instance().toggle({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockPlay).toHaveBeenCalledTimes(1);
});

it("toggle stops event and pauses if playing", () => {
  const props = clone(defaultProps);
  props.audio.state = "playing";
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  const mockPause = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    pause: mockPause,
  }));
  wrapper.instance().toggle({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockPause).toHaveBeenCalledTimes(1);
});

it("startHideTimer eventually pauses hides and resets the player", () => {
  jest.useFakeTimers();
  const mockPause = jest.fn();
  const mockHide = jest.fn();
  const mockReset = jest.fn();
  const wrapper = shallow(generateComponent({
    pause: mockPause,
    hide: mockHide,
    reset: mockReset,
  }));
  expect(wrapper.instance().timeout).toBeFalsy();
  wrapper.instance().startHideTimer();
  expect(wrapper.instance().timeout).toBeTruthy();
  jest.runAllTimers();
  expect(mockPause).toHaveBeenCalledTimes(1);
  expect(mockHide).toHaveBeenCalledTimes(1);
  expect(mockReset).toHaveBeenCalledTimes(1);
});

it("removeHideTimer prevents player from eventually being killed", () => {
  jest.useFakeTimers();
  const mockClearInterval = jest.fn();
  global.clearInterval = mockClearInterval;
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().timeout).toBeFalsy();
  wrapper.instance().startHideTimer();
  expect(wrapper.instance().timeout).toBeTruthy();
  wrapper.instance().removeHideTimer();
  jest.runAllTimers();
  expect(mockClearInterval).toHaveBeenCalledTimes(1);
  expect(mockClearInterval).toHaveBeenCalledWith(wrapper.instance().timeout);
});

it("openFullPlayer sets audio visiblity to expand", () => {
  const mockDispatch = jest.fn();
  audioActions.setVisibility = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().openFullPlayer();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.setVisibility).toHaveBeenCalledTimes(1);
  expect(audioActions.setVisibility).toHaveBeenCalledWith("expand");
});

it("touchStart updates state from event", () => {
  const mockEvent = {
    touches: [
      { clientX: 2 },
    ],
  };
  const wrapper = shallow(generateComponent());
  wrapper.setState({ transition: true });
  wrapper.instance().touchStart(mockEvent);
  expect(wrapper.state().startX).toBe(mockEvent.touches[0].clientX);
  expect(wrapper.state().transition).toBe(false);
});

it("touchMove updates state from event", () => {
  const mockEvent ={
    currentTarget: {
      offsetWidth: 100,
    },
    touches: [
      { clientX: 2 },
    ],
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().touchMove(mockEvent);
  expect(wrapper.state().lastPercent).toBe(2);
});

it("touchEnd sets to 0 if less than decider", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ lastPercent: 24 });
  wrapper.instance().touchEnd();
  expect(wrapper.state().lastPercent).toBe(0);
  expect(wrapper.state().transition).toBe(true);
});

it("touchEnd pauses and eventually fades, hides, and resets if > decider", () => {
  jest.useFakeTimers();
  const mockPause = jest.fn();
  const mockHide = jest.fn();
  const mockReset = jest.fn();
  const wrapper = shallow(generateComponent({
    pause: mockPause,
    hide: mockHide,
    reset: mockReset,
  }));
  wrapper.setState({ lastPercent: 26 });
  wrapper.instance().touchEnd();
  expect(wrapper.state().lastPercent).toBe(100);
  expect(wrapper.state().transition).toBe(true);
  jest.runAllTimers();
  expect(mockPause).toHaveBeenCalledTimes(1);
  expect(mockHide).toHaveBeenCalledTimes(1);
  expect(mockReset).toHaveBeenCalledTimes(1);
});

it("calculatePercent returns percentage", () => {
  const mockTarget = {
    offsetWidth: 100,
  };
  const wrapper = shallow(generateComponent());
  wrapper.setState({ startX: 5 });
  const result = wrapper.instance().calculatePercent(mockTarget, 20);
  expect(result).toBe(15);
});

it("calculatePercent returns 100 if > 100", () => {
  const mockTarget = {
    offsetWidth: 100,
  };
  const wrapper = shallow(generateComponent());
  wrapper.setState({ startX: 5 });
  const result = wrapper.instance().calculatePercent(mockTarget, 120);
  expect(result).toBe(100);
});

it("calculatePercent returns 0 if < 0", () => {
  const mockTarget = {
    offsetWidth: 100,
  };
  const wrapper = shallow(generateComponent());
  wrapper.setState({ startX: 5 });
  const result = wrapper.instance().calculatePercent(mockTarget, -120);
  expect(result).toBe(0);
});

it("playerStyle returns style object", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().playerStyle()).toMatchSnapshot();
});

it("fadeClass returns undefined if not fading", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().fadeClass()).toBe(undefined);
});

it("fadeClass returns style class if fading", () => {
  const props = clone(defaultProps);
  props.audio.visibility = "fade";
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().fadeClass()).toMatchSnapshot();
});
