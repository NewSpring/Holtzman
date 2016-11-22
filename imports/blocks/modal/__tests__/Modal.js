import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import SideModal from "../Modal";

const defaultProps = {
  childClasses: [],
  float: false,
  offset: false,
  styles: {},
  close: jest.fn(),
  component: () => <h1>test</h1>,
  props: {},
  style: {},
  modal: {
    props: {
      classes: [],
      layoutOverride: null,
      modalBackground: "test--background",
    },
  },
  theme: null,
  visible: true,
};

const generateComponent = (additionalClasses = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalClasses,
  };
  return <SideModal { ...newProps } />;
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("does not render if not visible", () => {
  const wrapper = shallow(generateComponent({
    visible: false,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("does not render if no component", () => {
  const wrapper = shallow(generateComponent({
    component: null,
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("overrides with theme", () => {
  const wrapper = shallow(generateComponent({
    theme: "mytheme",
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("scrolls window on render", () => {
  window.scrollTo = jest.fn();
  const wrapper = shallow(generateComponent());
  expect(window.scrollTo).toHaveBeenCalledTimes(1);
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});

it("updates styles with mobile styles", () => {
  window.matchMedia = jest.fn(() => ({
    matches: true,
  }));
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().props.styles.transform).toBe("translateY(80px)");
  expect(wrapper.instance().props.styles.opacity).toBe(0);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates styles with non mobile styles", () => {
  window.matchMedia = jest.fn(() => ({
    matches: false,
  }));
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().props.styles.transform).toBe("translateY(-20px)");
  expect(wrapper.instance().props.styles.opacity).toBe(0);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates cover header if state is different", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.state().coverHeader).toBe(false);
  wrapper.instance().componentWillUpdate({
    props: {
      coverHeader: true,
    },
  });
  expect(wrapper.state().coverHeader).toBe(true);
});

it("getContainerStyle returns non mini style", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().getContainerStyle()).toEqual({
    zIndex: 100,
    position: "fixed",
  });
});

it("getContainerStyle returns mini style", () => {
  const wrapper = shallow(generateComponent({
    props: {
      coverMiniPlayer: true,
    },
  }));
  expect(wrapper.instance().getContainerStyle()).toEqual({
    zIndex: 102,
    position: "fixed",
  });
});

it("childClasses returns default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().childClasses()).toMatchSnapshot();
});

it("childClasses appends additional childClasses", () => {
  const wrapper = shallow(generateComponent({
    childClasses: ["one", "two"],
  }));
  expect(wrapper.instance().childClasses()).toMatchSnapshot();
});

it("childClasses adjusts for float", () => {
  const wrapper = shallow(generateComponent({
    float: true,
  }));
  expect(wrapper.instance().childClasses()).toMatchSnapshot();
});

it("layoutClasses returns default", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses appends additional classes", () => {
  const wrapper = shallow(generateComponent({
    modal: {
      props: {
        classes: ["one", "two"],
      },
    },
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses has dark version", () => {
  const wrapper = shallow(generateComponent({
    modal: {
      props: {
        modalBackground: "dark",
      },
    },
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses appends layout overrides", () => {
  const wrapper = shallow(generateComponent({
    modal: {
      props: {
        layoutOverride: "three four",
      },
    },
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses handles float", () => {
  const wrapper = shallow(generateComponent({
    float: true,
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("layoutClasses handles offset", () => {
  const wrapper = shallow(generateComponent({
    offset: true,
  }));
  expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
});

it("styles returns styles if styles", () => {
  const wrapper = shallow(generateComponent({
    styles: {
      color: "red",
    },
  }));
  expect(wrapper.instance().styles()).toMatchSnapshot();
});

it("styles accounts for coverHeader", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ coverHeader: true });
  expect(wrapper.instance().styles()).toMatchSnapshot();
});
