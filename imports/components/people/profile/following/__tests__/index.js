import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { FollowingContainer } from "../";
import {
  topics as topicActions,
} from "../../../../../data/store";
import { canSee } from "../../../../../components/@enhancers/security-roles";

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

  const defaultProps = {
    person: {
      authorized: true,
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return (
    <FollowingContainer { ...newProps } />
    );
  };

  it("renders the 'following' items with authorization", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })

  it("renders the 'following' items without authorization", () => {
    const someProps = {
      person: {
        authorized: false,
      },
    };

    const wrapper = shallow(generateComponent(someProps));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  })
})
