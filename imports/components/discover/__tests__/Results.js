import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Results, {
  LoadingText,
  LoadMore,
} from "../Results";

describe("LoadingText", () => {
  const generateComponent = (props) => (
    <LoadingText { ...props } />
  );

  it("renders non loading", () => {
    const wrapper = shallow(generateComponent({
      search: {
        loading: false,
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders loading", () => {
    const wrapper = shallow(generateComponent({
      search: {
        loading: true,
      },
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("LoadMore", () => {
  const generateComponent = (props) => (
    <LoadMore { ...props } />
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent({
      search: {
        done: false,
      },
      loadMore: jest.fn(),
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("doesn't render if done", () => {
    const wrapper = shallow(generateComponent({
      search: {
        done: true,
      },
      loadMore: jest.fn(),
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("Results", () => {
  const generateComponent = (props) => (
    <Results { ...props } />
  );

  it("renders with props", () => {
    const wrapper = shallow(generateComponent({
      search: {
        items: [{}, {}],
        none: false,
      },
      loadMore: jest.fn(),
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders no results", () => {
    const wrapper = shallow(generateComponent({
      search: {
        items: [],
        none: true,
      },
      loadMore: jest.fn(),
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders loading", () => {
    const wrapper = shallow(generateComponent({
      search: {
        items: [],
        none: false,
      },
      loadMore: jest.fn(),
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
