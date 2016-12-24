import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import AudioTitle from "../audio.Title";

const defaultProps = {
  trackTitle: "test title",
  artistName: "test artist",
  albumTitle: "test album",
  isPlaying: false,
  isLight: false,
  channelName: "music",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <AudioTitle { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders playing version", () => {
  const wrapper = shallow(generateComponent({
    isPlaying: true,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("getTertiaryTextColor has a dark version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getTertiaryTextColor(true)).toMatchSnapshot();
});

it("getTertiaryTextColor has a light version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getTertiaryTextColor(false)).toMatchSnapshot();
});

it("getTertiaryTextClass has a dark version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getTertiaryTextClass(true)).toMatchSnapshot();
});

it("getTertiaryTextClass has a light version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getTertiaryTextClass(false)).toMatchSnapshot();
});

it("getPrimaryTextClass has a dark version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getPrimaryTextClass(true)).toMatchSnapshot();
});

it("getPrimaryTextClass has a light version", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getPrimaryTextClass(false)).toMatchSnapshot();
});

it("getArtistLine returns artist then title if not series", () => {
  const wrapper = shallow(generateComponent({
    channelName: "music",
  }));
  expect(wrapper.instance().getArtistLine()).toMatchSnapshot();
});

it("getArtistLine returns title then artist if series", () => {
  const wrapper = shallow(generateComponent({
    channelName: "series_newspring",
  }));
  expect(wrapper.instance().getArtistLine()).toMatchSnapshot();
});
