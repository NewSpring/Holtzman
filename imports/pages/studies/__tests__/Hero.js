/* eslint-disable */
import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";

import StudyHero from "../Hero";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

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



