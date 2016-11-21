import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json"
import AudioTrack from "../audio.Track";

const defaultProps = {
  track: {
    title: "test track",
    duration: "12:23",
    file: "http://test.com/test.mp3",
  },
  play: jest.fn(),
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

it("trackClasses has active version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().trackClasses()).toMatchSnapshot();
});

it("trackClasses has inactive version", () => {
  const wrapper = shallow(generateComponent({
    active: false,
  }));
  expect(wrapper.instance().trackClasses()).toMatchSnapshot();
});

it("textClasses has active version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().textClasses()).toMatchSnapshot();
});

it("textClasses has inactive version", () => {
  const wrapper = shallow(generateComponent({
    active: false,
  }));
  expect(wrapper.instance().textClasses()).toMatchSnapshot();
});

it("play calls play with track", () => {
  const mockPlay = jest.fn();
  const wrapper = shallow(generateComponent({
    play: mockPlay,
  }));
  const mockPreventDefault = jest.fn()
  wrapper.instance().play({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockPlay).toHaveBeenCalledTimes(1);
  expect(mockPlay).toHaveBeenCalledWith(defaultProps.track);
});

it("play does not play if no file", () => {
  const mockPlay = jest.fn();
  const wrapper = shallow(generateComponent({
    track: {
      file: null,
    },
    play: mockPlay,
  }));
  const mockPreventDefault = jest.fn()
  wrapper.instance().play({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(mockPlay).not.toHaveBeenCalled();
});

it("buttonClasses has active state", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().buttonClasses()).toMatchSnapshot();
});

it("buttonClasses has inactive state", () => {
  const wrapper = shallow(generateComponent({
    track: {
      file: null,
    },
  }));
  expect(wrapper.instance().buttonClasses()).toMatchSnapshot();
});

it("durationClasses has active state", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().durationClasses()).toMatchSnapshot();
});

it("durationClasses has inactive state", () => {
  const wrapper = shallow(generateComponent({
    track: {
      file: null,
    },
  }));
  expect(wrapper.instance().durationClasses()).toMatchSnapshot();
});
