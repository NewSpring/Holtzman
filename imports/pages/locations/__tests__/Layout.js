import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { clone } from "ramda";
import Layout, { campusLookup } from "../Layout";

const defaultProps = {
  data: {
    campuses: [
      {
        name: "anderson",
        distance: {
          value: 2,
        },
        location: {
          street1: "test",
          zip: "11111",
        },
        services: ["9:00", "11:00"],
      },
      {
        name: "anderson",
        distance: {
          value: 2,
        },
        location: {
          street1: "test",
          zip: "11111",
        },
        services: ["9:00", "11:00"],
      },
    ],
  },
  client: {
    query: jest.fn().mockReturnValue(
      new Promise(p => p({ data: {} }))
    ),
  },
};

window.isTablet = false;
document.getElementById = jest.fn().mockReturnValue({
  blur: jest.fn(),
});

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Layout { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders without campus distance", () => {
  const props = clone(defaultProps);
  props.data.campuses[0].distance = null;
  const wrapper = shallow(generateComponent(props));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses campusLookup query", () => {
  expect(campusLookup).toMatchSnapshot();
});

it("dynamicItemWidth returns item width based on window size", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicItemWidth();
  expect(result).toEqual({ width: 787.2, height: 787.2 });
});

it("dynamicItemWidth returns tablet item size", () => {
  window.isTablet = true;
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicItemWidth();
  expect(result).toEqual({ width: 393.6, height: 393.6 });
  window.isTablet = false;
});

it("dynamicWidth returns blank object if no campuses", () => {
  const wrapper = shallow(generateComponent({
    data: {
      campuses: null,
    },
  }));
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({});
});

it("dynamicWidth returns width based on items and window size", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: "1654.4px" });
});

it("dynamicWidth returns tablet version", () => {
  window.isTablet = true;
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().dynamicWidth();
  expect(result).toEqual({ width: "867.2px" });
  window.isTablet = false;
});

it("findByQuery calls preventDefault", () => {
  const mockPreventDefault = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().findByQuery({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
});

it("findByQuery blurs the search input", () => {
  const mockBlur = jest.fn();
  const mockGetElementById = jest.fn().mockReturnValue({
    blur: mockBlur,
  });
  document.getElementById = mockGetElementById;
  const wrapper = shallow(generateComponent());
  wrapper.instance().findByQuery();
  expect(mockGetElementById).toHaveBeenCalledWith("search");
  expect(mockBlur).toHaveBeenCalledTimes(1);
});

it("overflow contains styles", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().overflow).toMatchSnapshot();
});
