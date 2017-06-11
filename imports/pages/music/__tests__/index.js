import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { nav as navActions } from "../../../data/store";
import {
  TemplateWithoutData as Template,
  ALBUMS_QUERY,
} from "../";

jest.mock("../../../deprecated/mixins/mixins.Header", () => {});

jest.mock("../../../data/store", () => ({
  nav: {
    setLevel: jest.fn(),
  },
}));

const defaultProps = {
  dispatch: jest.fn(),
  data: {
    content: [
      {
        content: {
          tracks: [
            { file: "http://test.com/test.mp3" },
            { file: "http://test.com/test.mp3" },
            { file: "http://test.com/test.mp3" },
          ],
        },
      },
      {
        content: {
          tracks: [
            { file: "http://test.com/test.mp3" },
            { file: "http://test.com/test.mp3" },
            { file: "http://test.com/test.mp3" },
          ],
        },
      },
    ],
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

it("renders loading if no content", () => {
  const wrapper = shallow(generateComponent({
    data: {},
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses albums query correctly", () => {
  expect(ALBUMS_QUERY).toMatchSnapshot();
});

it("sets nav level on mount", () => {
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
});
