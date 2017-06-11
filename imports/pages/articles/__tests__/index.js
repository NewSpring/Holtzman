import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { ArticlesWithoutData as Articles } from "../";
import {
  nav as navActions,
} from "../../../data/store";


jest.mock("../../../deprecated/mixins/mixins.Header", () => {});
jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    loading: false,
    refetch: jest.fn(),
    content: [{}, {}],
  },
  Loading: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Articles { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no content", () => {
  const wrapper = shallow(generateComponent({
    data: {
      loading: false,
      refetch: jest.fn(),
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates the nav and header on mount", () => {
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
  const mockRefetch = jest.fn().mockReturnValue(new Promise((r) => r()));
  const wrapper = shallow(generateComponent({
    data: {
      loading: false,
      refetch: mockRefetch,
      content: [{}, {}],
    },
  }));
  wrapper.instance().handleRefresh(jest.fn(), jest.fn());
  expect(mockRefetch).toHaveBeenCalledTimes(1);
  expect(mockRefetch).toHaveBeenCalledWith({ cache: false });
});
