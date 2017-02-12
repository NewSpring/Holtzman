
import { print } from "graphql-tag/printer";
import { withLikes, LIKES_QUERY } from "../userLikes";

it("should contain user likes query", () => {
  expect(print(LIKES_QUERY)).toMatchSnapshot();
});

// TODO: integration test
