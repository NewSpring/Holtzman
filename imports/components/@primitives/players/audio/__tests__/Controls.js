import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import ListDetail from "../../../../../pages/music/ListDetail";
import { actions as audioActions } from "../../../../../data/store/audio";
import { modal, nav as navActions } from "../../../../../data/store";
import {
  AudioControlsWithoutData as AudioControls,
} from "../Controls";

jest.mock("../../../../../data/store/audio", () => ({
  actions: {
    play: jest.fn(),
    pause: jest.fn(),
    seek: jest.fn(),
    next: jest.fn(),
    previous: jest.fn(),
    repeat: jest.fn(),
    repeatOne: jest.fn(),
    resetRepeat: jest.fn(),
    resetOrder: jest.fn(),
    shuffle: jest.fn(),
  },
}));
jest.mock("../../../../../data/store", () => ({
  modal: {
    render: jest.fn(),
    setRetrigger: jest.fn(),
  },
  nav: {
    setColor: jest.fn(),
  },
}));

const defaultProps = {
  audio: {
    order: "default",
    repeat: "default",
    state: "default",
    visibility: "expanded",
    playing: {
      album: {
        channelName: "music",
        content: {
          tracks: [
            {
              title: "one",
            },
            {
              title: "two",
            },
          ],
        },
      },
      track: {
        title: "one",
      },
    },
  },
  isLight: false,
  dispatch: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <AudioControls { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders dock version", () => {
  const props = clone(defaultProps);
  props.audio.visibility = "dock";
  const wrapper = shallow(generateComponent(props))
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("getTertiaryTextColor returns different versions for light and dark", () => {
  const wrapper = shallow(generateComponent());
  // dark version
  expect(wrapper.instance().getTertiaryTextColor(true)).toMatchSnapshot();
  // light version
  expect(wrapper.instance().getTertiaryTextColor(false)).toMatchSnapshot();
});

it("getPrimaryTextColor returns different versions for light and dark", () => {
  const wrapper = shallow(generateComponent());
  // dark version
  expect(wrapper.instance().getPrimaryTextColor(true)).toMatchSnapshot();
  // light version
  expect(wrapper.instance().getPrimaryTextColor(false)).toMatchSnapshot();
});

it("getTertiaryTextClass returns different versions for light and dark", () => {
  const wrapper = shallow(generateComponent({
    isLight: false,
  }));
  // dark
  expect(wrapper.instance().getTertiaryTextClass()).toBe("text-light-tertiary");
  // light
  wrapper.setProps({ isLight: true });
  expect(wrapper.instance().getTertiaryTextClass()).toBe("text-dark-tertiary");
});

it("getSecondayTextClass returns different versions for light and dark", () => {
  const wrapper = shallow(generateComponent({
    isLight: false,
  }));
  // dark
  expect(wrapper.instance().getSecondayTextClass()).toBe("text-light-secondary");
  // light
  wrapper.setProps({ isLight: true });
  expect(wrapper.instance().getSecondayTextClass()).toBe("text-dark-secondary");
});

it("getPrimaryTextClass returns different versions for light and dark", () => {
  const wrapper = shallow(generateComponent({
    isLight: false,
  }));
  // dark
  expect(wrapper.instance().getPrimaryTextClass()).toBe("text-light-primary");
  // light
  wrapper.setProps({ isLight: true });
  expect(wrapper.instance().getPrimaryTextClass()).toBe("text-dark-primary");
});

it("shuffleClasses returns defaults", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().shuffleClasses();
  expect(result).toMatchSnapshot();
});

it("activeShuffleStyles returns tertiary if not shuffle", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().activeShuffleStyles();
  expect(result).toMatchSnapshot();
});

it("activeShuffleStyles returns primary if shuffle", () => {
  const props = clone(defaultProps);
  props.audio.order = "shuffle";
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().activeShuffleStyles();
  expect(result).toMatchSnapshot();
});

it("repeatClasses returns defaults", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().repeatClasses();
  expect(result).toMatchSnapshot();
});

it("repeatIconStyles returns defaults", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().repeatIconStyles;
  expect(result).toMatchSnapshot();
});

it("repeatIcon returns default icon", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().repeatIcon();
  expect(result).toMatchSnapshot();
});

it("repeatIcon returns repeat icon", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat";
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().repeatIcon();
  expect(result).toMatchSnapshot();
});

it("repeatIcon returns repeat one icon", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat-one";
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().repeatIcon();
  expect(result).toMatchSnapshot();
});

it("activeRepeatStyles returns tertiary if not repeat", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().activeRepeatStyles();
  expect(result).toMatchSnapshot();
});

it("activeRepeatStyles returns primary if repeat", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat";
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().activeRepeatStyles();
  expect(result).toMatchSnapshot();
});

it("listDetail triggers modal", () => {
  const mockDispatch = jest.fn();
  modal.render = jest.fn();
  modal.setRetrigger = jest.fn();
  navActions.setColor = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().listDetail();

  expect(mockDispatch).toHaveBeenCalledTimes(3);

  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(ListDetail);
  expect(modal.render.mock.calls[0][1]).toEqual({
    color: "background--dark-primary",
    modalBackground: "dark",
    album: defaultProps.audio.playing.album,
    trackNumber: 0,
    style: {
      opacity: 0.9,
    },
  });

  expect(modal.setRetrigger).toHaveBeenCalledTimes(1);
  expect(modal.setRetrigger).toHaveBeenCalledWith("FullPlayer");

  expect(navActions.setColor).toHaveBeenCalledTimes(1);
  expect(navActions.setColor).toHaveBeenCalledWith("#202020", "light");
});

it("controlGridStyles matches defaults", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().controlGridStyles).toEqual({
    maxHeight: "30px",
  });
});

it("backClasses matches defaults", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().backClasses()).toMatchSnapshot();
});

it("nextClasses matches defaults", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().nextClasses()).toMatchSnapshot();
});

it("toggleClasses matches defaults", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().toggleClasses()).toMatchSnapshot();
});

it("playIconPosition returns 6px if not playing", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().playIconPosition()).toEqual({
    left: "6px",
    position: "relative",
  });
});

it("playIconPosition returns 2px if playing", () => {
  const props = clone(defaultProps);
  props.audio.state = "playing";
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().playIconPosition()).toEqual({
    left: "2px",
    position: "relative",
  });
});

it("toggle calls preventDefault and play if not playing", () => {
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.play = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().toggle({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.play).toHaveBeenCalledTimes(1);
});

it("toggle calls preventDefault and pause if playing", () => {
  const props = clone(defaultProps);
  props.audio.state = "playing";
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.pause = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    dispatch: mockDispatch,
  }));
  wrapper.instance().toggle({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.pause).toHaveBeenCalledTimes(1);
});

it("next calls preventDefault and next if not series", () => {
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.next = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().next({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.next).toHaveBeenCalledTimes(1);
});

it("next calls preventDefault and seek if series", () => {
  const props = clone(defaultProps);
  props.audio.playing.album.channelName = "series_newspring";
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.seek = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    dispatch: mockDispatch,
  }));
  wrapper.instance().next({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.seek).toHaveBeenCalledTimes(1);
  expect(audioActions.seek).toHaveBeenCalledWith(0);
});

it("back calls preventDefault and previous if not series", () => {
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.previous = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().back({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.previous).toHaveBeenCalledTimes(1);
});

it("back calls preventDefault and seek if series", () => {
  const props = clone(defaultProps);
  props.audio.playing.album.channelName = "series_newspring";
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.seek = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    dispatch: mockDispatch,
  }));
  wrapper.instance().back({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.seek).toHaveBeenCalledTimes(1);
  expect(audioActions.seek).toHaveBeenCalledWith(0);
});

it("repeat calls preventDefault and repeat if default", () => {
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.repeat = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().repeat({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.repeat).toHaveBeenCalledTimes(1);
});

it("repeat calls preventDefault and repeatOne if default", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat";
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.repeatOne = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    dispatch: mockDispatch,
  }));
  wrapper.instance().repeat({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.repeatOne).toHaveBeenCalledTimes(1);
});

it("repeat calls preventDefault and resetRepeat if default", () => {
  const props = clone(defaultProps);
  props.audio.repeat = "repeat-one";
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.resetRepeat = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    dispatch: mockDispatch,
  }));
  wrapper.instance().repeat({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.resetRepeat).toHaveBeenCalledTimes(1);
});

it("shuffle calls preventDefault and shuffle if default", () => {
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.shuffle = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().shuffle({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.shuffle).toHaveBeenCalledTimes(1);
});

it("shuffle calls preventDefault and shuffle if default", () => {
  const props = clone(defaultProps);
  props.audio.order = "shuffle";
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  const mockStopPropagation = jest.fn();
  audioActions.resetOrder = jest.fn();
  const wrapper = shallow(generateComponent({
    ...props,
    dispatch: mockDispatch,
  }));
  wrapper.instance().shuffle({
    preventDefault: mockPreventDefault,
    stopPropagation: mockStopPropagation,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.resetOrder).toHaveBeenCalledTimes(1);
});

it("showControls returns null if series", () => {
  const props = clone(defaultProps);
  props.audio.playing.album.channelName = "series_newspring";
  const wrapper = shallow(generateComponent(props));
  const result = wrapper.instance().playlistControls();
  expect(result).toBe(null);
});

it("showControls returns if not series", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().playlistControls();
  expect(result).toMatchSnapshot();
});
