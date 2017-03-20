import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import { actions as audioActions } from "../../../../../data/store/audio";
import { modal, nav as navActions } from "../../../../../data/store";
import FullPlayer from "../FullPlayer";
import { AudioPlayerWithoutData as AudioPlayer } from "../";

jest.mock("../../../../../data/store/header", () => jest.fn());
// jest.mock("../../../../store/audio", () => ({
//   play: jest.fn(),
//   pause: jest.fn(),
//   next: jest.fn(),
//   previous: jest.fn(),
//   setVisibility: jest.fn(),
// }));
jest.mock("../../../../../data/store", () => ({
  modal: {
    render: jest.fn(),
    setRetrigger: jest.fn(),
  },
  nav: {
    setLevel: jest.fn(),
    setColor: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  audio: {
    visibility: "default",
    playing: {
      album: {
        content: {
          isLight: false,
        },
      },
      track: {
        file: "http://test.com/test.mp3",
      },
    },
  },
  modal: {
    visible: false,
    retrigger: false,
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <AudioPlayer { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders with mini player", () => {
  const props = clone(defaultProps);
  props.audio.visibility = "dock";
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("triggers modal if expanding", () => {
  const mockDispatch = jest.fn();
  modal.render = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const nextProps = clone(defaultProps);
  nextProps.audio.visibility = "expand";
  wrapper.setProps(nextProps);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(FullPlayer);
  expect(modal.render.mock.calls[0][1]).toEqual({
    coverHeader: true,
    audioPlayer: true,
  });
});

it("updates nav if phone", () => {
  window.isPhone = true;
  const mockDispatch = jest.fn();
  modal.render = jest.fn();
  navActions.setLevel = jest.fn();
  navActions.setColor = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const nextProps = clone(defaultProps);
  nextProps.audio.visibility = "expand";
  wrapper.setProps(nextProps);
  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("DOWN");
  expect(navActions.setColor).toHaveBeenCalledTimes(1);
  expect(navActions.setColor).toHaveBeenCalledWith("transparent", "dark");
});

it("sets visibility to dock if modal closing", () => {
  audioActions.setVisibility = jest.fn();
  const props = clone(defaultProps);
  props.audio.visibility = "expand";
  props.modal.visible = true;
  const wrapper = shallow(generateComponent(props));
  wrapper.setProps({
    modal: {
      visible: false,
    },
  });
  expect(audioActions.setVisibility).toHaveBeenCalledTimes(1);
  expect(audioActions.setVisibility).toHaveBeenCalledWith("dock");
});

it("sets retriggers FullPlayer if necessary", () => {
  audioActions.setVisibility = jest.fn();
  modal.setRetrigger = jest.fn();
  const props = clone(defaultProps);
  props.audio.visibility = "expand";
  props.modal.visible = true;
  props.modal.retrigger = "FullPlayer";
  const wrapper = shallow(generateComponent(props));
  wrapper.setProps({
    modal: {
      visible: false,
    },
  });
  expect(audioActions.setVisibility).not.toHaveBeenCalled();
  expect(modal.setRetrigger).toHaveBeenCalledTimes(1);
  expect(modal.setRetrigger).toHaveBeenCalledWith(null);
});

it("shouldDisplayMini returns false if not dock or fade", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().shouldDisplayMini()).toBe(false);
});

it("shouldDisplayMini returns false if no file", () => {
  const props = clone(defaultProps);
  props.audio.playing.track.file = null;
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().shouldDisplayMini()).toBe(false);
});

it("shouldDisplayMini returns true if dock", () => {
  const props = clone(defaultProps);
  props.audio.visibility = "dock";
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().shouldDisplayMini()).toBe(
    props.audio.playing.track.file
  );
});

it("shouldDisplayMini returns true if fade", () => {
  const props = clone(defaultProps);
  props.audio.visibility = "fade";
  const wrapper = shallow(generateComponent(props));
  expect(wrapper.instance().shouldDisplayMini()).toBe(
    props.audio.playing.track.file
  );
});
