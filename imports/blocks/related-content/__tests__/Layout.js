/* eslint-disable */
import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";

import Layout, { LoadingContent } from "../Layout";

describe("RelatedContent", () => {
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

  it("does not render without content", () => {
    const tree = renderer.create(
      <Layout
        loading={false}
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
});
