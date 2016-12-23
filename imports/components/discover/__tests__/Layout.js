import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import SearchLayout, {
  Content,
  getStyle,
} from "../Layout";

describe("Content", () => {
  const defaultProps = {
    loadMore: jest.fn(),
    search: {
      searching: false,
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <Content { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders search", () => {
    const wrapper = shallow(generateComponent({
      search: {
        searching: true,
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("getStyle", () => {
  it("returns blank object if not native", () => {
    expect(getStyle()).toEqual({});
  });
  // XXX how to mock env vars?
  xit("returns styles if native", () => {
    expect(getStyle()).toEqual({
      marginTop: "50px",
    });
  });
});

describe("SearchLayout", () => {
  const defaultProps = {
    loadMore: jest.fn(),
    search: {},
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <SearchLayout { ...newProps } />;
  };

  it("renders", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
