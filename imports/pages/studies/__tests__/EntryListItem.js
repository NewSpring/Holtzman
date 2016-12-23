/* eslint-disable */
import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";

import StudiesEntryListItem from "../EntryListItem";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("StudiesEntryListItem", () => {
  it("takes a single study as a prop", () => {
    const study = {
      "id": "e2a6f1a585c90a33b88f8e41b26c9ffe",
      "entryId": "e2a6f1a585c90a33b88f8e41b26c9ffe",
      "title": "Who are you trying to please?",
      "status": "open",
      "channelName": "study_entries",
      "parent": {
        "entryId": "9bff3ab47f41d1818fa3dc2803fa141b"
      },
      "meta": {
        "urlTitle": "who-are-you-trying-to-please",
          "siteId": "393ebdf414cdf68c96bb7fd149f7a434",
          "date": "Wed Dec 07 2016 00:00:00 GMT+0000 (UTC)",
          "channelId": "d89926c004a563d46e0d10ca1a5fea53"
      },
      "content": {
        "speaker": ""
      }
    };

    const tree = renderer.create(
      <StudiesEntryListItem
        studyEntry={study}
        order={1}
        light={true}
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
