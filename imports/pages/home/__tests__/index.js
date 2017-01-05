import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../data/store";
import { HomeWithoutData as Home } from "../";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    refetch: jest.fn(),
    feed: [
      {
        entryId: "1",
        channelName: "articles",
        content: {
          images: [
            {
              fileLabel: "1:1",
              url: "http://test.com/1x1.jpg",
            },
          ],
        },
      },
      {
        entryId: "2",
        channelName: "articles",
        content: {
          images: [
            {
              fileLabel: "1:1",
              url: "http://test.com/1x1.jpg",
            },
          ],
        },
      },
    ],
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Home { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders feed skeleton if loading", () => {
  const wrapper = shallow(generateComponent({
    data: {
      feed: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates nav level on mount", () => {
  const mockDispatch = jest.fn();
  navActions.setLevel = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
});

it("handleRefresh calls refetch", () => {
  const mockRefetch = jest.fn().mockReturnValue(new Promise(r => r()));
  const wrapper = shallow(generateComponent({
    data: {
      refetch: mockRefetch,
    },
  }));
  wrapper.instance().handleRefresh();
  expect(mockRefetch).toHaveBeenCalledTimes(1);
  expect(mockRefetch).toHaveBeenCalledWith({ cache: false });
});
