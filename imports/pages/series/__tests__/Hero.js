import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import SeriesHero from "../Hero";

const defaultProps = {
  series: {
    content: {
      colors: [
        { description: "primary", value: "0000ff" },
      ],
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.jpg",
        },
      ],
      ooyalaId: "testid",
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SeriesHero { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without video", () => {
  const props = clone(defaultProps);
  props.series.content.ooyalaId = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders close trailer button when playing", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ playing: true });
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("backgroundClasses returns css class string", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().backgroundClasses();
  expect(result).toMatchSnapshot()
});

it("ready sets the player", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().ready("testPlayer");
  expect(wrapper.instance().player).toBe("testPlayer");
});

it("play starts the player if player", () => {
  const mockShow = jest.fn();
  const mockPlayer = {
    show: mockShow,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().ready(mockPlayer);
  expect(wrapper.instance().player).toEqual(mockPlayer);
  wrapper.instance().play();
  expect(mockShow).toHaveBeenCalledTimes(1);
  expect(mockShow).toHaveBeenCalledWith({ play: true });
  expect(wrapper.state().playing).toBe(true);
});

it("play tries to star the player later if no player", () => {
  jest.useFakeTimers();
  const mockShow = jest.fn();
  const mockPlayer = {
    show: mockShow,
  };
  const wrapper = shallow(generateComponent());
  // call when no player
  wrapper.instance().play();
  // back door the player
  wrapper.instance().ready(mockPlayer);
  expect(wrapper.instance().player).toEqual(mockPlayer);
  // tries again after timeout
  jest.runAllTimers();
  expect(mockShow).toHaveBeenCalledTimes(1);
  expect(mockShow).toHaveBeenCalledWith({ play: true });
  expect(wrapper.state().playing).toBe(true);
});

it("stop hides the player", () => {
  const mockHide = jest.fn();
  const mockPlayer = {
    hide: mockHide,
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().ready(mockPlayer);
  expect(wrapper.instance().player).toEqual(mockPlayer);
  wrapper.instance().stop();
  expect(mockHide).toHaveBeenCalledTimes(1);
  expect(wrapper.state().playing).toBe(false);
});
