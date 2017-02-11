
import { print } from "graphql-tag/printer";
import withRecentLikes, { RECENT_LIKES_QUERY } from "../recents";

it("should contain recent likes query", () => {
  expect(print(RECENT_LIKES_QUERY)).toMatchSnapshot();
});

// TODO: integration test
