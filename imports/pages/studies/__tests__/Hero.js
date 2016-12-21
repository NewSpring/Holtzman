/* eslint-disable */
import renderer from "react-test-renderer";
import StudyHero from "../Hero";

describe("StudyHero", () => {
  it("changes class name based on props", () => {
    const study = {
      "content": {
        "isLight": true,
        "images":[
          { "url": "http://exampleimage.org" }
        ]
      }
    };

    const tree = renderer.create(
      <StudyHero study={study} />
    );

    expect(tree).toMatchSnapshot();
  });
})



