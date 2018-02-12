import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { ArticlesSingleWithoutData as ArticlesSingle } from "../Single";

jest.mock("../../../deprecated/mixins/mixins.Likeable", () => {});
jest.mock("../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../deprecated/mixins/mixins.Shareable", () => {});
jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  article: {
    content: {
      id: "1",
      content: {
        body: "<h1>article</h1>",
        images: [],
        wistiaId: "",
      },
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <ArticlesSingle { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no content", () => {
  const wrapper = shallow(generateComponent({
    article: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders video if wistiaId", () => {
  const wrapper = shallow(generateComponent({
    article: {
      content: {
        id: "1",
        content: {
          body: "<h1>article</h1>",
          images: [],
          wistiaId: "id",
        },
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
