import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Right, { DefaultWrapper } from "../Right";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("DefaultWrapper", () => {
  const defaultProps = {
    imageclasses: ["one", "two"],
  };

  const generateComponent = () => (
    <DefaultWrapper { ...defaultProps }>
      <h1>test</h1>
    </DefaultWrapper>
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("Right", () => {
  const defaultProps = {
    classes: [],
    theme: null,
    scroll: false,
    width: false,
    background: null,
    styles: null,
    link: null,
    outsideRatio: null,
    aspect: null,
    ratioClasses: null,
    blur: false,
    mobile: false,
    backgroundFill: false,
    ratioTheme: null,
    web: false,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return (
      <Right { ...newProps }>
        <h1>test</h1>
      </Right>
    );
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("overrides with theme", () => {
    const wrapper = shallow(generateComponent({
      theme: "override me",
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("overrides styles", () => {
    const wrapper = shallow(generateComponent({
      styles: {
        color: "red",
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders linked version", () => {
    const wrapper = shallow(generateComponent({
      link: "http://test.com",
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders linked version with theme override", () => {
    const wrapper = shallow(generateComponent({
      link: "http://test.com",
      theme: "override link",
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders linked version with style override", () => {
    const wrapper = shallow(generateComponent({
      link: "http://test.com",
      styles: {
        color: "blue",
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders background image version", () => {
    const wrapper = shallow(generateComponent({
      background: "//test.com/background.jpg",
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("shouldComponentUpdate returns false when keep", () => {
    const wrapper = shallow(generateComponent());
    const result = wrapper.instance().shouldComponentUpdate({
      keep: true,
    });
    expect(result).toBe(false);
  });

  it("shouldComponentUpdate returns true when not keep", () => {
    const wrapper = shallow(generateComponent());
    const result = wrapper.instance().shouldComponentUpdate({
      keep: false,
    });
    expect(result).toBe(true);
  });

  it("layoutClasses returns default", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("layoutClasses adds hover classes for web links", () => {
    const wrapper = shallow(generateComponent({
      link: "http://test.com",
      web: true,
    }));
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("layoutClasses adds ratio class for mobile and not aspect", () => {
    const wrapper = shallow(generateComponent({
      mobile: true,
      aspect: null,
    }));
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("layoutClasses adds ratio classes for mobil and aspect", () => {
    const wrapper = shallow(generateComponent({
      mobile: true,
      aspect: "my-aspect",
    }));
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("layoutClasses adds scrollable class", () => {
    const wrapper = shallow(generateComponent({
      scroll: true,
    }));
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("layoutClasses adds width class", () => {
    const wrapper = shallow(generateComponent({
      width: "my-width",
    }));
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("layoutClasses background fill class", () => {
    const wrapper = shallow(generateComponent({
      background: "//test.com/test.jpg",
      backgroundFill: true,
    }));
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("layoutClasses appends additional classes", () => {
    const wrapper = shallow(generateComponent({
      classes: ["three", "four"],
    }));
    expect(wrapper.instance().layoutClasses()).toMatchSnapshot();
  });

  it("styles returns blank object if no background", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper.instance().styles()).toEqual({});
  });

  it("styles returns background styles if background", () => {
    const wrapper = shallow(generateComponent({
      background: "//test.com/test.jpg",
    }));
    expect(wrapper.instance().styles()).toEqual({
      backgroundImage: "url('//test.com/test.jpg')",
    });
  });

  it("ratioClasses returns default", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper.instance().ratioClasses()).toEqual("ratio__item");
  });

  it("ratioClasses appends additional classes", () => {
    const wrapper = shallow(generateComponent({
      ratioClasses: "rat io",
    }));
    expect(wrapper.instance().ratioClasses()).toEqual("ratio__item rat io");
  });

  it("renderInsideRatio renders", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper.instance().renderInsideRatio()).toMatchSnapshot();
  });
  
  it("renderInsideRatio can be overrided with theme", () => {
    const wrapper = shallow(generateComponent({
      ratioTheme: "override ratio",
    }));
    expect(wrapper.instance().renderInsideRatio()).toMatchSnapshot();
  });

  it("renderOutSideRatio returns blank div if no outsideRatio and no blur", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper.instance().renderOutSideRatio()).toMatchSnapshot();
  });

  it("renderOutSideRatio renders outsideRatio prop", () => {
    const wrapper = shallow(generateComponent({
      outsideRatio: jest.fn(() => <h1>outside</h1>),
    }));
    expect(wrapper.instance().renderOutSideRatio()).toMatchSnapshot();
  });

  it("renderOutSideRatio renders blur styles if blur", () => {
    const wrapper = shallow(generateComponent({
      blur: true,
    }));
    expect(wrapper.instance().renderOutSideRatio()).toMatchSnapshot();
  });
});
