import { shallow } from "enzyme";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { Stats, Leaves, Image, Body } from "../layout";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("Stats", () => {
  const defaultProps = {
    className: "test",
  };

  const generateComponent = () => (
    <Stats { ...defaultProps }>
      <h1>test</h1>
    </Stats>
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Leaves", () => {
  const generateComponent = () => (
    <Leaves>
      <h1>test</h1>
    </Leaves>
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Image", () => {
  const defaultProps = {
    url: "http://test.com/test.jpg",
  };

  const generateComponent = () => (
    <Image { ...defaultProps } />
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Body", () => {
  const defaultProps = {
    rev: false,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return (
      <Body { ...newProps }>
        <h1>test</h1>
      </Body>
    );
  };

  it("renders non rev version", () => {
    const wrapper = shallow(generateComponent());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders rev version",() => {
    const wrapper = shallow(generateComponent({
      rev: true,
    }));
    expect(wrapper).toMatchSnapshot();
  });
});
