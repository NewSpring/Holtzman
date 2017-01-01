import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { ArticlesSingleWithoutData as ArticlesSingle } from "../articles.Single";
import {
  nav as navActions,
} from "../../../data/store";

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
        ooyalaId: "",
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

it("renders video if ooyalaId", () => {
  const wrapper = shallow(generateComponent({
    article: {
      content: {
        id: "1",
        content: {
          body: "<h1>article</h1>",
          images: [],
          ooyalaId: "id",
        },
      },
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("dispatches nav actions on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  navActions.setAction = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("CONTENT");
  expect(navActions.setAction).toHaveBeenCalledTimes(1);
  expect(navActions.setAction.mock.calls[0][0]).toBe("CONTENT");
});
