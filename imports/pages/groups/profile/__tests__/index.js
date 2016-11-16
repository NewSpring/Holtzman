import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { Meteor } from "meteor/meteor";
import { nav as navActions, modal } from "../../../../store";
import { TemplateWithoutData as Template } from "../";

jest.mock("../../../../mixins/mixins.Header", () => {});
jest.mock("../../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
  modal: {
    update: jest.fn(),
    hide: jest.fn(),
    render: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    loading: false,
    group: {
      entityId: "1",
      locations: [
        {
          location: {
            latitude: 2,
            longitude: 2,
          },
        },
      ],
      members: [
        { role: "default" },
        { role: "leader" },
      ],
      photo: "http://test.com/test.jpg",
    },
    person: {},
  },
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

Meteor.isServer = false;

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading", () => {
  const wrapper = shallow(generateComponent({
    data: {
      loading: true,
    },
  }));
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
