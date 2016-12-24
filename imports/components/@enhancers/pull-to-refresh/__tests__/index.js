import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import {
  ApollosPullToRefreshWithoutData as ApollosPullToRefresh,
} from "../";

const defaultProps = {
  handleRefresh: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return (
    <ApollosPullToRefresh { ...newProps }>
      <h1>test</h1>
    </ApollosPullToRefresh>
  );
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
