/* eslint-disable */
import renderer from "react-test-renderer";
import { shallowToJson, mountToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";

import Content from "../Content";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});



jest.mock("../../../../components/content/related-content");
jest.mock("../../../../components/@primitives/players/video");

const defaultProps = {
  studyEntry: {
    content: {
      wistiaId: null,
      images: [],
      body: "<h2>study body</h2>",
    },
  },
  classes: [],
  onClickLink: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };

  return <Content { ...newProps } />;
};

it("renders with props", () => {
  const tree = renderer.create(generateComponent());
  expect(tree).toMatchSnapshot();
});

it("renders with an image and no video", () => {
  const tree = renderer.create(generateComponent({
    studyEntry:{
      content: {
        images: [
          {
            "fileName": "Galatiansstudy2x1.png",
            "fileType": null,
            "fileLabel": "2:1",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/collection/studies/Galatiansstudy2x1.large.png",
            "size": "large"
          },
        ],
      },
    },
  }));
  expect(tree).toMatchSnapshot();
});

it("renders with an ooyala video", () => {
  const tree = renderer.create(generateComponent({
    studyEntry: {
      content: {
        wistiaId: "fake-ooyala-Id",
      }
    },
  }));
  expect(tree).toMatchSnapshot();
});

it("renders with scripture", () => {
  const tree = renderer.create(generateComponent({
    studyEntry: {
      content: {
        images: [
          {
            "fileName": "Galatiansstudy2x1.png",
            "fileType": null,
            "fileLabel": "2:1",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/collection/studies/Galatiansstudy2x1.large.png",
            "size": "large"
          },
        ],
        scripture: [
          {
            "book": "Galatians",
            "passage": "2:11-21",
          },
        ],
      },
    },
  }));
  expect(tree).toMatchSnapshot();
});

it("renders with related content", () => {
  const tree = renderer.create(generateComponent({
    studyEntry: {
      content: {
        images: [
          {
            "fileName": "Galatiansstudy2x1.png",
            "fileType": null,
            "fileLabel": "2:1",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/collection/studies/Galatiansstudy2x1.large.png",
            "size": "large"
          },
        ],
        tags: [
          "grace",
          "love",
          "salvation"
        ],
      }
    }
  }));
  expect(tree).toMatchSnapshot();
});
