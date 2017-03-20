import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import {
  modal,
  nav as navActions,
  share as shareActions,
  header as headerActions,
  audio as audioActions,
} from "../../../data/store";
import { ListDetailWithoutData as ListDetail } from "../ListDetail";

jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store", () => ({
  modal: {
    hide: jest.fn(),
  },
  nav: {
    setLevel: jest.fn(),
    setColor: jest.fn(),
  },
  share: {
    share: jest.fn(),
  },
  header: {
    statusBarColor: jest.fn(),
  },
  audio: {
    setVisibility: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  header: {
    content: {
      color: "#000000",
    },
  },
  audio: {
    visibility: "default",
  },
  album: {
    entryId: "1",
    title: "test album",
    artist: "test artist",
    content: {
      images: [
        {
          fileName: "default",
          size: "small",
          url: "http://test.com/small.jpg",
        },
      ],
      tracks: [
        { title: "one" },
        { title: "two" },
        { title: "three" },
      ],
    },
  },
  trackNumber: 2,
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ListDetail { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders default artist", () => {
  const props = clone(defaultProps);
  props.album.artist = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("closeModal just hides the modal if audio not expended", () => {
  const mockDispatch = jest.fn();
  modal.hide = jest.fn();
  audioActions.setVisibility = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().closeModal();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.hide).toHaveBeenCalledTimes(1);
  expect(audioActions.setVisibility).not.toHaveBeenCalled();
});

it("closeModal docks the music player before hiding if expanded", () => {
  jest.useFakeTimers();
  const mockDispatch = jest.fn();
  modal.hide = jest.fn();
  audioActions.setVisibility = jest.fn();
  const wrapper = shallow(generateComponent({
    audio: {
      visibility: "expand",
    },
    dispatch: mockDispatch,
  }));
  wrapper.instance().closeModal();
  jest.runAllTimers();
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(audioActions.setVisibility).toHaveBeenCalledTimes(1);
  expect(audioActions.setVisibility).toHaveBeenCalledWith("dock");
  expect(modal.hide).toHaveBeenCalledTimes(1);
});

it("share prevents default and calls share action", () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  shareActions.share = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().share({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(shareActions.share).toHaveBeenCalledTimes(1);
});

it("sectionStyles returns styles", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().sectionStyles).toMatchSnapshot();
});
