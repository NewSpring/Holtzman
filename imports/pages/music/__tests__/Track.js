import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import { modal, audio as audioActions } from "../../../data/store";
import ListDetail from "../ListDetail";
import { AudioTrackWithoutData as AudioTrack } from "../Track";

jest.mock("../../../data/store", () => ({
  modal: {
    render: jest.fn(),
  },
  audio: {
    setPlaying: jest.fn(),
    setPlaylist: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  album: {
    content: {
      tracks: [
        { file: "http://test.com/test.mp3" },
        { file: "http://test.com/test.mp3" },
        { file: "http://test.com/test.mp3" },
      ],
    },
  },
  albumTitle: "test title",
  track: {
    title: "test",
  },
  trackNumber: 2,
  active: true,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <AudioTrack { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("ListDetail renders the modal", () => {
  const mockDispatch = jest.fn();
  modal.render = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().ListDetail();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(ListDetail);
  expect(modal.render.mock.calls[0][1]).toMatchSnapshot();
});

it("trackClasses returns active classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().trackClasses();
  expect(result).toMatchSnapshot();
});

it("trackClasses returns inactive classes", () => {
  const wrapper = shallow(generateComponent({
    active: false,
  }));
  const result = wrapper.instance().trackClasses();
  expect(result).toMatchSnapshot();
});

it("textClasses returns active classes", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().textClasses();
  expect(result).toMatchSnapshot();
});

it("textClasses returns inactive classes", () => {
  const wrapper = shallow(generateComponent({
    active: false,
  }));
  const result = wrapper.instance().textClasses();
  expect(result).toMatchSnapshot();
});

it("play prevents default and updates audio store", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  audioActions.setPlaying = jest.fn();
  audioActions.setPlaylist = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().play({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(audioActions.setPlaying).toHaveBeenCalledTimes(1);
  expect(audioActions.setPlaying.mock.calls[0][0]).toMatchSnapshot();
  expect(audioActions.setPlaylist).toHaveBeenCalledTimes(1);
  expect(audioActions.setPlaylist.mock.calls[0][0]).toMatchSnapshot();
});

it("play does nothing if no file", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  audioActions.setPlaying = jest.fn();
  audioActions.setPlaylist = jest.fn();
  const props = clone(defaultProps);
  props.album.content.tracks[2].file = null;
  const wrapper = shallow(generateComponent({
    album: props.album,
    dispatch: mockDispatch,
  }));
  wrapper.instance().play({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(0);
  expect(audioActions.setPlaying).toHaveBeenCalledTimes(0);
  expect(audioActions.setPlaylist).toHaveBeenCalledTimes(0);
});
