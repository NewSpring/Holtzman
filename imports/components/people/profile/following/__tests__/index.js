import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { FollowingContainer } from "../";
import {
  topics as topicActions,
} from "../../../../../data/store";

jest.mock("../../../../../data/store", () => ({
  topics: {
    toggle: jest.fn(),
  }
}));

describe("Following", () => {
  const topics = [
    "Articles",
    "Devotionals",
    "Events",
    "Music",
    "News",
    "Series",
    "Sermons",
    "Stories",
    "Studies",
  ];

  const generateComponent = () => (
    <FollowingContainer />
  );

  it("renders the 'following' items", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})
