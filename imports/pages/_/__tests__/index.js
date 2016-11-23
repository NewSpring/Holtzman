import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { print } from "graphql-tag/printer";
import { GraphQL } from "../../../graphql";
import {
  Template,
  CASH_TAG_QUERY,
  matchAccountToCashTag,
} from "../";

const generateComponent = () => (
  <Template>
    <h1>test</h1>
  </Template>
);

it("renders with children", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query", () => {
  expect(print(CASH_TAG_QUERY)).toMatchSnapshot();
});

it("matchAccountToCashTag queries based of url", () => {
  const mockThen = jest.fn();
  GraphQL.query = jest.fn(() => ({
    then: mockThen,
  }));
  const mockLocation = {
    params: {
      splat: "$test/10",
    }
  };
  const mockReplaceState = jest.fn();
  const mockCallback = jest.fn();
  matchAccountToCashTag(mockLocation, mockReplaceState, mockCallback);
  expect(GraphQL.query).toHaveBeenCalledTimes(1);
  expect(GraphQL.query).toHaveBeenCalledWith({
    query: CASH_TAG_QUERY,
    variables: {
      tag: "$test",
    },
  });
  expect(mockThen).toHaveBeenCalledTimes(1);
  // simulate promise
  mockThen.mock.calls[0][0]({
    data: {
      account: {
        name: "test",
      },
    },
  });
  expect(mockReplaceState).toHaveBeenCalledTimes(1);
  expect(mockReplaceState).toHaveBeenCalledWith(
    null,
    "/give/campaign/test?test=10"
  );
  expect(mockCallback).toHaveBeenCalledTimes(1);
});
