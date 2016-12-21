/* eslint-disable */
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import { StudiesSingleWithoutData } from "../Single";
import {
  nav as navActions,
} from "../../../store";
import headerActions from "../../../store/header";

jest.mock("../../../database/collections/likes", () => {});
jest.mock("../../../blocks/related-content");

jest.mock("../../../mixins/mixins.Shareable");
jest.mock("../../../mixins/mixins.Header");

jest.mock("../EntryList");
jest.mock("../Hero");

jest.mock("../../../store/header", () => ({
  set: jest.fn(),
}));

jest.mock("../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
    setAction: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  params: {
    id: "1",
  },
  study: {
    content: {
      id: "1",
      content: {
        description: "<h1>study</h1>",
        images: [],
      },
    },
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };

  return <StudiesSingleWithoutData { ...newProps } />;
};

it("renders with no image", () => {
  const tree = renderer.create(generateComponent());
  expect(tree).toMatchSnapshot();
});

it("renders loading with no study", () => {
  const tree = renderer.create(generateComponent({
    study: {}
  }));
  expect(tree).toMatchSnapshot();
});

it("renders studies content", () => {
  const tree = renderer.create(generateComponent({
    study: {
      content: {
        id: "1",
        content: {
          description: "<h1>study</h1>",
          images: [
            { fileLabel: "1:1", url: "http://test.com/1x1.jpg" },
          ],
        },
      },
    }
  }));

  expect(tree).toMatchSnapshot();
});

it("dispatches store on mount", () => {
  const mockDispatch = jest.fn();

  navActions.setLevel = jest.fn();
  navActions.setAction = jest.fn();
  headerActions.set = jest.fn();

  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));

  expect(mockDispatch).toHaveBeenCalledTimes(3);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("CONTENT");
  expect(navActions.setAction).toHaveBeenCalledTimes(1);
  expect(navActions.setAction.mock.calls[0][0]).toBe("CONTENT");
  expect(headerActions.set).toHaveBeenCalledTimes(1);
});
