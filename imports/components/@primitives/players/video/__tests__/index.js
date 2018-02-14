import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { audio as audioActions } from "../../../../../data/store";
import { VideoPlayerWithoutData as VideoPlayer } from "../";

window.Wistia = {
  ready: jest.fn(),
  Player: {
    create: jest.fn(),
  },
};

const defaultProps = {
  id: "2",
  hide: false,
  success: jest.fn(),
  style: {
    color: "red",
  },
  audioState: "default",
  dispatch: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <VideoPlayer {...newProps} />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

xit("calls createPlayer on mount", () => {
  const wrapper = shallow(generateComponent());
  const mockCreatePlayer = jest.fn();
  wrapper.instance().createPlayer = mockCreatePlayer;
  wrapper.instance().componentDidMount();
  expect(mockCreatePlayer).toHaveBeenCalledTimes(1);
  expect(mockCreatePlayer).toHaveBeenCalledWith(defaultProps.id, defaultProps.success);
});

xit("calls setEmbedCode if current id is not next id", () => {
  const wrapper = shallow(generateComponent());
  const mockSetEmbedCode = jest.fn();
  wrapper.instance().player = {
    setEmbedCode: mockSetEmbedCode,
  };
  wrapper.setProps({ id: "3" });
  expect(mockSetEmbedCode).toHaveBeenCalledTimes(1);
  expect(mockSetEmbedCode).toHaveBeenCalledWith("3");
});

xit("calls pause if next state is playing and current state is default", () => {
  const wrapper = shallow(generateComponent());
  const mockPause = jest.fn();
  wrapper.instance().player = {
    pause: mockPause,
  };
  wrapper.setProps({ audioState: "playing" });
  expect(mockPause).toHaveBeenCalledTimes(1);
});

xit("calls pause if next state is loading and current state is default", () => {
  const wrapper = shallow(generateComponent());
  const mockPause = jest.fn();
  wrapper.instance().player = {
    pause: mockPause,
  };
  wrapper.setProps({ audioState: "loading" });
  expect(mockPause).toHaveBeenCalledTimes(1);
});

xit("Removes the player on unmount", () => {
  const wrapper = shallow(generateComponent());
  const mockRemove = jest.fn();
  wrapper.instance().player = {
    remove: mockRemove,
  };
  wrapper.unmount();
  expect(mockRemove).toHaveBeenCalledTimes(1);
});

xit("createPlayer sets timeout to try again if no OO", () => {
  jest.useFakeTimers();
  window.OO = null;
  const mockCallback = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().createPlayer("2", mockCallback);
  const mockCreatePlayer = jest.fn();
  wrapper.instance().createPlayer = mockCreatePlayer;
  jest.runAllTimers();
  expect(mockCreatePlayer).toHaveBeenCalled();
});

// XXX yep
xit("createPlayer sets up player", () => {
  jest.useFakeTimers();
  const mockReady = jest.fn();
  const mockCreate = jest.fn(() => {});
  window.OO = {
    ready: mockReady,
    Player: {
      create: mockCreate,
    },
    EVENTS: {
      PLAYED: "PLAYED",
      PLAY: "PLAY",
      PLAY_FAILED: "PLAY_FAILED",
      FULLSCREEN_CHANGED: "FULLSCREEN_CHANGED",
    },
  };
  const mockDispatch = jest.fn();
  audioActions.pause = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const mockCallback = jest.fn();
  wrapper.instance().createPlayer("2", mockCallback);
  expect(mockReady).toHaveBeenCalled();
  // simulate OO.ready
  mockReady.mock.calls[0][0]();
  expect(mockCreate).toHaveBeenCalled();
  expect(mockCreate.mock.calls[0][0]).toBe("ooyala-player-2");
  expect(mockCreate.mock.calls[0][1]).toBe("2");
  // simulate onCreate callback
  const mockPlayer = {
    isPlaying: jest.fn(() => true),
    isFullscreen: jest.fn(() => false),
    mb: {
      subscribe: jest.fn(),
    },
  };
  mockCreate.mock.calls[0][2].onCreate(mockPlayer);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.pause).toHaveBeenCalledTimes(1);
  // expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockPlayer.mb.subscribe).toHaveBeenCalledTimes(4);
  const mockDestroy = jest.fn();
  wrapper.instance().destroy = mockDestroy;
  // PLAYED callback
  expect(mockPlayer.mb.subscribe.mock.calls[0][0]).toBe(window.OO.EVENTS.PLAYED);
  expect(mockPlayer.mb.subscribe.mock.calls[0][1]).toBe("Video");
  mockPlayer.mb.subscribe.mock.calls[0][2]();
  expect(mockDestroy).toHaveBeenCalled();
  // PLAY callback
  expect(mockPlayer.mb.subscribe.mock.calls[1][0]).toBe(window.OO.EVENTS.PLAY);
  expect(mockPlayer.mb.subscribe.mock.calls[1][1]).toBe("Video");
  mockPlayer.mb.subscribe.mock.calls[1][2]();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(audioActions.pause).toHaveBeenCalled();
  // PLAY_FAILED callback
  expect(mockPlayer.mb.subscribe.mock.calls[2][0]).toBe(window.OO.EVENTS.PLAY_FAILED);
  expect(mockPlayer.mb.subscribe.mock.calls[2][1]).toBe("Video");
  mockPlayer.mb.subscribe.mock.calls[2][2]();
  expect(mockDestroy).toHaveBeenCalled();
  // FULLSCREEN_CHANGED callback
  global.StatusBar = {
    styleLightContent: jest.fn(),
  };
  mockPlayer.mb.subscribe.mock.calls[3][2]();
  jest.runAllTimers();
  expect(global.StatusBar.styleLightContent).toHaveBeenCalled();
});

xit("show calls createPlayer if no player", () => {
  const wrapper = shallow(generateComponent());
  const mockCreatePlayer = jest.fn();
  wrapper.instance().createPlayer = mockCreatePlayer;
  wrapper.instance().show();
  expect(mockCreatePlayer).toHaveBeenCalledTimes(1);
  expect(mockCreatePlayer.mock.calls[0][0]).toBe(defaultProps.id);
  // simulate player ready callback
  wrapper.setState({ hide: true });
  mockCreatePlayer.mock.calls[0][1]();
  expect(wrapper.state().hide).toBe(false);
});

xit("show calls createPlayer if destroyed player", () => {
  const wrapper = shallow(generateComponent());
  const mockCreatePlayer = jest.fn();
  wrapper.instance().createPlayer = mockCreatePlayer;
  wrapper.instance().player = {
    state: "destroyed",
  };
  wrapper.instance().show();
  expect(mockCreatePlayer).toHaveBeenCalled();
  expect(mockCreatePlayer.mock.calls[0][0]).toBe(defaultProps.id);
  // simulate player ready callback
  wrapper.setState({ hide: true });
  mockCreatePlayer.mock.calls[0][1]();
  expect(wrapper.state().hide).toBe(false);
});

xit("show pauses audio", () => {
  const mockDispatch = jest.fn();
  audioActions.pause = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ hide: true });
  // const mockPlay = jest.fn();
  // const mockPlayer = {
  //   play: mockPlay,
  // };
  // wrapper.instance().player = mockPlayer;
  wrapper.instance().show();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(audioActions.pause).toHaveBeenCalledTimes(1);
  // expect(mockPlay).toHaveBeenCalledTimes(1);
  expect(wrapper.state().hide).toBe(false);
});

xit("hide updates state", () => {
  const wrapper = shallow(generateComponent());
  // const mockPause = jest.fn();
  // const mockPlayer = {
  //   pause: mockPause,
  // };
  // wrapper.instance().player = mockPlayer;
  wrapper.instance().hide();
  // expect(mockPause).toHaveBeenCalledTimes(1);
  expect(wrapper.state().hide).toBe(true);
});

xit("styles has non hidden styles", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().styles()).toMatchSnapshot();
});

xit("styles has hidden styles", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ hide: true });
  expect(wrapper.instance().styles()).toMatchSnapshot();
});
