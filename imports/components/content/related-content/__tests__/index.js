/* eslint-disable */
import { Component } from "react";
import renderer from "react-test-renderer";
import { print } from "graphql-tag/printer";
import { MockedProvider } from "react-apollo/test-utils";
import { addTypenameToDocument } from "apollo-client";
import { reset, startBuffering } from "aphrodite/lib/inject";

import RelatedContent, { RELATED_CONTENT_QUERY, withRelatedContent, Template } from "../";

const taggedContent = {
  "taggedContent": [
    {
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
            "id": "412b1fea7302d9d4ccd7abef9fdb4452",
            "__typename": "Image",
          }
        ],
        "__typename": "Content",
      },
    "__typename": "Content",
    }
  ]
};


const query = addTypenameToDocument(RELATED_CONTENT_QUERY);
// const query = RELATED_CONTENT_QUERY;
const variables = {
  "tags": ["community"],
  "includeChannels": ["articles"],
  "limit": 1,
  "excludedIds": []
};

describe("Related content loading graph data", () => {
  beforeEach(() => {
    reset();
    startBuffering();
  });

  afterEach(() => {
    reset();
  });

  xit("renders completely without crashing", () => {
    const output = renderer.create(
      <MockedProvider mocks={[
        { request: { query, variables }, result: { data: taggedContent }}
      ]}>
          <RelatedContent {...variables} />
      </MockedProvider>
    );

    expect(output.toJSON()).toMatchSnapshot();
  });



  it('renders data without crashing', (done) => {
    class Container extends Component {
      componentWillReceiveProps(props) {
        expect(props.content.loading).toBe(false);
        done();
      }
      render() {
        return null;
      }
    };
    const ContainerWithData = withRelatedContent(Container);
    const output = renderer.create(
      <MockedProvider mocks={[
        { request: { query, variables }, result: { data: taggedContent } }
      ]}>
          <ContainerWithData {...variables} />
      </MockedProvider>
    );
  });
});

describe("Related content query", () => {
  it("should match query shape", () => {
    expect(print(RELATED_CONTENT_QUERY)).toMatchSnapshot();
  });
});

describe("Related content component", () => {
  it("renders related content", () => {
    const content = {
      "loading": false,
      "taggedContent": taggedContent.taggedContent
    };

    const tree = renderer.create(
      <Template
        content={content}
        title="This is Related Content"
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
