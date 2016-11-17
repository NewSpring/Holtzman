import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../store";
import {
  TemplateWithoutData as Template,
  STORIES_QUERY,
} from "../";

jest.mock("../../../mixins/mixins.Header", () => {});
jest.mock("../../../mixins/mixins.Pageable", () => {});
jest.mock("../../../mixins/mixins.Likeable", () => {});
jest.mock("../../../store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    refetch: jest.fn(),
    content: [{}, {}, {}],
  },
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

it("renders loading if no content", () => {
  const wrapper = shallow(generateComponent({
    data: {
      content: null,
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses stories query correctly", () => {
  expect(STORIES_QUERY).toMatchSnapshot();
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
  const mockRefetch = jest.fn().mockReturnValue(new Promise(p => p()));
  const wrapper = shallow(generateComponent({
    data: {
      refetch: mockRefetch,
    },
  }));
  wrapper.instance().handleRefresh();
  expect(mockRefetch).toHaveBeenCalledTimes(1);
});
