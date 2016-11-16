/* eslint-disable */
import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";

import Layout, { LoadingContent } from "../Layout";

describe("Related content <Layout>", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  it("shows a loading state prior to content", () => {
    const tree = renderer.create(
      <LoadingContent
        loading={true}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("has a title", () =>{
    const tree = renderer.create(
      <Layout
        loading={false}
        title="This is a Title"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders minicards correctly", () => {
    const content = [{
        "entryId": "6d6a9923f552375e328dcebe66316637",
        "id": "6d6a9923f552375e328dcebe66316637",
        "title": "The worst thing about America isn't what you think",
        "channel": "articles",
        "channelName": "articles",
        "parent": null,
        "content": {
          "images": [
            {
              "url": "//drhztd8q3iayu.cloudfront.net/newspring/editorial/newspring.blog.hero.gingergirl.medium.jpg",
              "label": "2:1",
              "fileLabel": "2:1",
              "id": "412b1fea7302d9d4ccd7abef9fdb4452"
            }
          ]
        }
    }];

    const tree = renderer.create(
      <Layout
        loading={false}
        title="This is a Minicard"
        content={content}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
