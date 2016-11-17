import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { DevotionsWithoutData as Devotions } from "../";
import {
  nav as navActions,
  header as headerActions,
  live as liveActions,
} from "../../../store";

jest.mock("../../../mixins/mixins.Likeable", () => {});
jest.mock("../../../mixins/mixins.Header", () => {});
jest.mock("../../../store", () => ({
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

const mockHeaderAction = jest.fn();
const MockHeaderAction = (Component) => (
  class MockHeaderAction extends React.Component {
    constructor () {
      super(...arguments);
      this.headerAction = mockHeaderAction;
    }
    render() {
      return <Component { ...this.props } { ...this.state } />
    }
  }
);

const generateMockedComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  const MockedDevotions = MockHeaderAction(Devotions);
  return <MockedDevotions { ...newProps } />;
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <Devotions { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateMockedComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("renders loading if no content", () => {
  const wrapper = shallow(generateMockedComponent({
    data: {
      loading: false,
      refetch: jest.fn(),
      content: [],
    },
  }));
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("updates the nav and header on mount", () => {
  const mockDispatch = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  expect(mockDispatch).toHaveBeenCalledTimes(1);
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
});
