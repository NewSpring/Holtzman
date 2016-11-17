import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../store";
import {
  TemplateWithoutData as Template,
  SERIES_QUERY,
} from "../";

jest.mock("../../../mixins/mixins.Header", () => {});
jest.mock("../../../mixins/mixins.Likeable", () => {});
jest.mock("../../../store/header", () => {});
jest.mock("../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));
const defaultProps = {
  dispatch: jest.fn(),
  data: {
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
  return <Template { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading", () => {
  const wrapper = shallow(generateComponent({
    data: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses series query", () => {
  expect(SERIES_QUERY).toMatchSnapshot();
});

it("updates nav on mount", () => {
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
  const mockRefetch = jest.fn(() => new Promise(p => p()));
  const wrapper = shallow(generateComponent({
    data: {
      refetch: mockRefetch,
    },
  }));
  wrapper.instance().handleRefresh();
  expect(mockRefetch).toHaveBeenCalledTimes(1);
});
