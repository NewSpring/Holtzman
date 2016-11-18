import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  getRatio,
  dynamicWidthContainer,
  dynamicWidth,
  dynamicSize,
  ListItem,
  ListWithoutData as List,
} from "../list";

describe("getRatio", () => {
  it("returns `0.8` when under `480", () => {
    const result = getRatio(100);
    expect(result).toBe(0.8);
  });

  it("returns `0.6` when under `768`", () => {
    const result = getRatio(700);
    expect(result).toBe(0.6);
  });

  it("returns `0.4` when under `1025`", () => {
    const result = getRatio(1000);
    expect(result).toBe(0.4);
  });

  it("returns `0.2` when larger than `1025`", () => {
    const result = getRatio(2000);
    expect(result).toBe(0.2);
  });
});

it("dynamicWidthContainer uses window to calculate width", () => {
  const result = dynamicWidthContainer(2);
  expect(result).toMatchSnapshot();
});

it("dynamicWidth uses window to calculate width", () => {
  const result = dynamicWidth(2);
  expect(result).toMatchSnapshot();
});

describe("No window", () => {
  beforeEach(() => {
    delete global.window;
  });

  it("dynamicWidthContainer returns blank object if no window", () => {
    const result = dynamicWidthContainer(2);
    expect(result).toEqual({});
  });

  it("dynamicWidth returns blank object if no window", () => {
    const result = dynamicWidth(2);
    expect(result).toEqual({});
  });
});

describe("dynamicSize", () => {
  it("returns `0.2` for less than `4`", () => {
    expect(dynamicSize("aa")).toBe(0.2);
  });
  it("returns `0.35` for less than `6`", () => {
    expect(dynamicSize("aaaaa")).toBe(0.35);
  });
  it("returns `0.4` for less than `8`", () => {
    expect(dynamicSize("aaaaaaa")).toBe(0.4);
  });
  it("returns `0.5` for less than `10`", () => {
    expect(dynamicSize("aaaaaaaaa")).toBe(0.5);
  });
  it("returns `0.6` for less than `12`", () => {
    expect(dynamicSize("aaaaaaaaaaa")).toBe(0.6);
  });
  it("returns `0.7` for `12` or more", () => {
    expect(dynamicSize("aaaaaaaaaaaa")).toBe(0.7);
  });
});

describe("ListItem", () => {
  const defaultProps = {
    item: {
      count: 2,
      label: "test",
    },
    padding: false,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <ListItem { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("adds push-right if padding", () => {
    const wrapper = shallow(generateComponent({
      padding: true,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("List", () => {
  const defaultProps = {
    items: [
      {
        count: 2,
        label: "test",
      },
      {
        count: 2,
        label: "test",
      },
    ],
    width: 700,
  };

  const generateComponent = () => (
    <List { ...defaultProps } />
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
