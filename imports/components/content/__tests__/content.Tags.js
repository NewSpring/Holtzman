import { shallow } from "enzyme";
import Tags from "../content.Tags";

const defaultProps = {
  item: {
    content: {
      contentTags: ["one", "two"],
    },
  },
};

const generateComponent = () => (
  <Tags { ...defaultProps } />
);

it("render with props", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper).toMatchSnapshot();
});
