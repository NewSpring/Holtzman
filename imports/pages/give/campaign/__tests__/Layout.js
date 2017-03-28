import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Layout from "../Layout";

const account1 = {
  description: "Web Team Tesla Fund",
  name: "Tesla Fund",
  id: "e450b1f1dbb79ffea48d9aba1a00ea0f2885d4bfe435683d1b1129fae408729d",
  summary: "Tesla, because they're awesome!",
  image: "https://cl.ly/i26e/Image%202016-11-07%20at%202.38.14%20PM.png",
  order: 0,
  images: [{
    fileName: "Image%202016-11-07%20at%202.38.14%20PM.png",
    fileType: null,
    fileLabel: "2:1",
    s3: "https://cl.ly/i26e/Image%202016-11-07%20at%202.38.14%20PM.png",
    cloudfront: "https://cl.ly/i26e/Image%202016-11-07%20at%202.38.14%20PM.png",
  }],
};

const account2 = {
  description: "Web Team Tesla Fund",
  name: "Tesla Fund",
  id: "e450b1f1dbb79ffea48d9aba1a00ea0f2885d4bfe435683d1b1129fae408729d",
  summary: "Tesla, because they're awesome!",
  image: "https://cl.ly/i26e/Image%202016-11-07%20at%202.38.14%20PM.png",
  order: 0,
};

// XXX probably will need to switch back to create-react-renderer
describe("Template", () => {
  it("looks empty with no props", () => {
    const tree = shallow(
      <Layout
        account={""}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("accepts account object with complete data", () => {
    const tree = shallow(
      <Layout
        account={account1}
      />
    );
    expect(tree.find("Meta").props().image.includes("cl.ly")).toEqual(true);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("accepts account object without image data", () => {
    const tree = shallow(
      <Layout
        account={account2}
      />
    );
    expect(tree.find("Meta").props().image.includes("cl.ly")).toEqual(true);
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
