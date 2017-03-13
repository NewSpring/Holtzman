import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { nav as navActions } from "../../../../data/store";
import { TemplateWithoutData as Template } from "../Result";

jest.mock("../../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  q: "test",
  dispatch: jest.fn(),
  tags: "one,two",
  location: {},
  router: {
    createPath: jest.fn(),
    replace: jest.fn(),
  },
  done: false,
  loading: false,
  Loading: jest.fn(),
  data: {
    groups: {
      count: 2,
      results: [
        {
          id: "1",
          locations: [
            {
              location: {
                latitude: 2,
                longitude: 3,
              },
            },
          ],
        },
        {
          id: "2",
          locations: [
            {
              location: {
                latitude: 2,
                longitude: 3,
              },
            },
          ],
        },
      ],
    },
  },
  campusLocations: [],
  campuses: "one,two",
  schedules: "1",
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Template { ...newProps } />;
};

window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without map on mobile", () => {
  const mockMatchMedia = jest.fn().mockReturnValue({
    matches: true,
  });
  window.matchMedia = mockMatchMedia;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
  expect(mockMatchMedia).toHaveBeenCalledTimes(1);
  expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 768px)");
});

it("renders without map on server", () => {
  Meteor.isServer = true;
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
  Meteor.isServer = false;
});

it("updates search state and sets nav level on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(wrapper.state().showSearch).toBe(true);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("BASIC_CONTENT");
});

it("onCardHover updates state from target", () => {
  const mockEvent = {
    currentTarget: {
      id: "test",
    },
  };
  const wrapper = shallow(generateComponent());
  wrapper.instance().onCardHover(mockEvent);
  expect(wrapper.state().hover).toBe("test");
});

it("onMarkerHover updates state from marker", () => {
  const wrapper = shallow(generateComponent());
  wrapper.instance().onMarkerHover({ id: "marker" });
  expect(wrapper.state().hover).toBe("marker");
});

it("getMarkers returns markers", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getMarkers(defaultProps.data.groups.results);
  const group1 = defaultProps.data.groups.results[0];
  const group2 = defaultProps.data.groups.results[1];
  expect(result).toEqual([
    {
      latitude: group1.locations[0].location.latitude,
      longitude: group1.locations[0].location.longitude,
      id: group1.id,
    },
    {
      latitude: group2.locations[0].location.latitude,
      longitude: group2.locations[0].location.longitude,
      id: group2.id,
    },
  ]);
});

it("toggleSearch change show search state", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().showSearch).toBe(true);
  wrapper.instance().toggleSearch();
  expect(wrapper.state().showSearch).toBe(false);
  wrapper.instance().toggleSearch();
  expect(wrapper.state().showSearch).toBe(true);
});

it("toggleSearch change show search state", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().showTags).toBe(false);
  wrapper.instance().toggleTags();
  expect(wrapper.state().showTags).toBe(true);
  wrapper.instance().toggleTags();
  expect(wrapper.state().showTags).toBe(false);
});

it("removeQueryString calls preventDefault", () => {
  const wrapper = shallow(generateComponent());
  const mockPreventDefault = jest.fn();
  wrapper.instance().removeQueryString({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
});

it("removeQueryString updates router with blank object", () => {
  const mockCreatePath = jest.fn().mockReturnValue("newPath");
  const mockReplace = jest.fn();
  const wrapper = shallow(generateComponent({
    router: {
      createPath: mockCreatePath,
      replace: mockReplace,
    },
  }));
  wrapper.instance().removeQueryString();
  expect(mockCreatePath).toHaveBeenCalledTimes(1);
  expect(mockCreatePath).toHaveBeenCalledWith({});
  expect(mockReplace).toHaveBeenCalledTimes(1);
  expect(mockReplace).toHaveBeenCalledWith("newPath");
});
