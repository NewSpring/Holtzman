import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import SectionItem, {
  ExternalLinkWrapper,
  preloader,
  renderElement,
  ChildItem,
  SingleItem,
} from "../Item";

describe("ExternalLinkWrapper", () => {
  const defaultProps = {
    to: "//test.com",
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return (
      <ExternalLinkWrapper { ...newProps }>
        <h1>test</h1>
      </ExternalLinkWrapper>
    );
  };

  it("renders external link", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders internal link", () => {
    const wrapper = shallow(generateComponent({
      to: "/test",
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("preloader", () => {
  it("renders", () => {
    const mockThis = {
      id: "2",
      imageclasses: ["one", "two"],
      children: <h1>test</h1>,
    };
    const result = preloader.call(mockThis);
    expect(result).toMatchSnapshot();
  });
});

describe("renderElement", () => {
  it("renders", () => {
    const mockThis = {
      id: "2",
      imageclasses: ["one", "two"],
      children: <h1>test</h1>,
      style: {
        color: "red",
      },
    };
    const result = renderElement.call(mockThis);
    expect(result).toMatchSnapshot();
  });
});

describe("ChildItem", () => {
  const defaultProps = {
    section: {
      link: "http://test.com",
      id: "1",
      text: "test text",
      description: "test description",
      image: "http://test.com/test.jpg",
    },
    go: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <ChildItem { ...newProps } />;
  };

  it("render with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("does not render if no section", () => {
    const wrapper = shallow(generateComponent({
      section: null,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("SingleItem", () => {
  const defaultProps = {
    section: {
      link: "http://test.com",
      id: "1",
      text: "test text",
      description: "test description",
      image: "http://test.com/test.jpg",
    },
    go: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return (
      <SingleItem { ...newProps }>
        <h1>test</h1>
      </SingleItem>
    );
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("does not render if no section", () => {
    const wrapper = shallow(generateComponent({
      section: null,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("SectionItem", () => {
  const defaultProps = {
    sections: [
      {
        link: "http://test.com",
        id: "1",
        text: "test text",
        description: "test description",
        image: "http://test.com/test.jpg",
        children: [
          {
            link: "http://test.com",
            id: "3",
            text: "test text",
            description: "test description",
            image: "http://test.com/test.jpg",
          },
          {
            link: "http://test.com",
            id: "4",
            text: "test text",
            description: "test description",
            image: "http://test.com/test.jpg",
          },
        ],
      },
      {
        link: "http://test.com",
        id: "2",
        text: "test text",
        description: "test description",
        image: "http://test.com/test.jpg",
        children: [
          {
            link: "http://test.com",
            id: "3",
            text: "test text",
            description: "test description",
            image: "http://test.com/test.jpg",
          },
          {
            link: "http://test.com",
            id: "4",
            text: "test text",
            description: "test description",
            image: "http://test.com/test.jpg",
          },
        ],
      },
    ],
    hide: jest.fn(),
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <SectionItem { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("expandOrGo expands child sections", () => {
    const wrapper = shallow(generateComponent());
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        id: "1",
      },
    };
    wrapper.instance().expandOrGo(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.state().section).toEqual(defaultProps.sections[0]);
  });

  it("expandOrGo closes a section if already open", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ section: defaultProps.sections[0] });
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        id: "1",
      },
    };
    wrapper.instance().expandOrGo(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.state().section).toBe(null);
  });

  it("expandOrGo closes and opens a different section if differnet section clicked", () => {
    jest.useFakeTimers();
    const wrapper = shallow(generateComponent());
    wrapper.setState({ section: defaultProps.sections[0] });
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        id: "2",
      },
    };
    wrapper.instance().expandOrGo(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(wrapper.state().section).toBe(null);
    jest.runAllTimers();
    expect(wrapper.state().section).toBe(defaultProps.sections[1]);
  });

  it("renderChildren returns null if no section state", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper.instance().renderChildren()).toBe(null);
  });

  it("renderChildren renders children of a section", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ section: defaultProps.sections[0] });
    const result = wrapper.instance().renderChildren();
    expect(result).toMatchSnapshot();
  });

  it("renderArrow returns null if no section state", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper.instance().renderArrow()).toBe(null);
  });

  it("renderArrow returns null if state id is not id passed in", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ section: defaultProps.sections[0] });
    const result = wrapper.instance().renderArrow(defaultProps.sections[1]);
    expect(result).toBe(null);
  });

  it("renderArrow renders if state id matches section id", () => {
    const wrapper = shallow(generateComponent());
    wrapper.setState({ section: defaultProps.sections[0] });
    const result = wrapper.instance().renderArrow(defaultProps.sections[0]);
    expect(result).toMatchSnapshot();
  });
});
