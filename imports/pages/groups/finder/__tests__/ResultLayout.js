import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Layout from "../ResultLayout";
import { getSingleSpecWrapper } from "../../../../util/tests/data-spec.js";

const defaultProps = {
  groups: [],
  tags: ["test", "test"],
  loading: false,
  count: 12,
  query: "test",
  campuses: [],
  schedules: [1],
  showSearch: true,
  toggleSearch: true,
  showTags: true,
  toggleTags: true,
  onCardHover: jest.fn(),
  LoadingComponent: () => <div>HARAMBE</div>,
};

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

it("renders spinner when loading is true", () => {
  const someProps = {
    loading: true,
  }
  const wrapper = shallow(generateComponent(someProps));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("shows up arrow on filter tag when tags are shown", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  const iconTag = getSingleSpecWrapper(wrapper, "iconTag").props();
  expect(iconTag.iconClass).toEqual("icon-arrow-up");
});

it("shows down arrow on filter tag when tag drawer is closed", () => {
  const wrapper = shallow(generateComponent({
    showTags: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();

  const iconTag = getSingleSpecWrapper(wrapper, "iconTag").props();
  expect(iconTag.iconClass).toEqual("icon-arrow-down");
});
