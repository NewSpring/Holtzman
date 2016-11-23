import { shallow } from "enzyme";
import React, { Component } from "react";
import ReactMixin from "react-mixin";
import headerActions from "../../store/header/";
import Header from "../mixins.Header";

jest.mock("../../store/header/", () => ({
  lock: jest.fn(),
  unlock: jest.fn(),
  set: jest.fn(),
}));

class CWithoutHeader extends Component {
  render() {
    return <div />;
  }
}

const CWithHeader = ReactMixin.decorate(Header)(CWithoutHeader);

const defaultProps = {
  dispatch: jest.fn(),
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <CWithHeader { ...newProps } />;
};

it("has default vars", () => {
  expect(Header.savedDataOptions).toBe(null);
  expect(Header.savedDataRequestee).toBe(null);
});

it("sets up things on mount", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().headerAction).toBeTruthy();
});

it("calls getContent when recieving props", () => {
  const wrapper = shallow(generateComponent());
  const mockGetContent = jest.fn();
  wrapper.instance().getContent = mockGetContent;
  wrapper.setProps({ test: "thing" });
  expect(mockGetContent).toHaveBeenCalledTimes(1);
});

it("unlocks header and sets header details if modal closing", () => {
  const wrapper = shallow(generateComponent({
    modal: {
      visible: true,
    },
  }));
  const mockUnlockHeader = jest.fn();
  const mockSetHeaderDetails = jest.fn();
  wrapper.instance().unlockHeader = mockUnlockHeader;
  wrapper.instance().setHeaderDetails = mockSetHeaderDetails;
  wrapper.setProps({
    modal: {
      visible: false,
    },
  });
  expect(mockUnlockHeader).toHaveBeenCalledTimes(1);
  expect(mockSetHeaderDetails).toHaveBeenCalledTimes(1);
  expect(mockSetHeaderDetails).toHaveBeenCalledWith(
    wrapper.instance().savedDataOptions,
    wrapper.instance().savedDataRequestee
  );
});

it("getContent does nothing if header is set", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ __headerSet: true });
  const mockGetEntry = jest.fn();
  const mockGetHeaderTitle = jest.fn();
  const mockSetHeaderDetails = jest.fn();
  wrapper.instance().getEntry = mockGetEntry;
  wrapper.instance().getHeaderTitle = mockGetHeaderTitle;
  wrapper.instance().setHeaderDetails = mockSetHeaderDetails;

  wrapper.instance().getContent();
  expect(mockGetEntry).not.toHaveBeenCalled();
  expect(mockGetHeaderTitle).not.toHaveBeenCalled();
  expect(mockSetHeaderDetails).not.toHaveBeenCalled();
});

it("getContent does nothing if no item", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ __headerSet: false });
  const mockGetEntry = jest.fn(() => null);
  const mockGetHeaderTitle = jest.fn();
  const mockSetHeaderDetails = jest.fn();
  wrapper.instance().getEntry = mockGetEntry;
  wrapper.instance().getHeaderTitle = mockGetHeaderTitle;
  wrapper.instance().setHeaderDetails = mockSetHeaderDetails;

  const props = {};
  wrapper.instance().getContent(props);
  expect(mockGetEntry).toHaveBeenCalledTimes(1);
  expect(mockGetEntry).toHaveBeenCalledWith(props);
  expect(mockGetHeaderTitle).not.toHaveBeenCalled();
  expect(mockSetHeaderDetails).not.toHaveBeenCalled();
});

it("getContent gets title and sets non sermon header details", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ __headerSet: false });
  const mockGetEntry = jest.fn(() => ({ test: "thing" }));
  const mockGetHeaderTitle = jest.fn(() => "test title");
  const mockSetHeaderDetails = jest.fn();
  wrapper.instance().getEntry = mockGetEntry;
  wrapper.instance().getHeaderTitle = mockGetHeaderTitle;
  wrapper.instance().setHeaderDetails = mockSetHeaderDetails;

  wrapper.instance().getContent({});
  expect(mockGetHeaderTitle).toHaveBeenCalledTimes(1);
  expect(mockSetHeaderDetails).toHaveBeenCalledTimes(1);
  expect(mockSetHeaderDetails).toHaveBeenCalledWith({
    test: "thing",
    title: "test title",
  });
});

it("getContent gets title and sets sermon header details", () => {
  const wrapper = shallow(generateComponent());
  wrapper.setState({ __headerSet: false });
  const mockEntry = {
    currentSermon: {
      content: {},
    },
    series: {
      content: {},
    },
  };
  const mockGetEntry = jest.fn(() => mockEntry);
  const mockGetHeaderTitle = jest.fn(() => "test title");
  const mockSetHeaderDetails = jest.fn();
  wrapper.instance().getEntry = mockGetEntry;
  wrapper.instance().getHeaderTitle = mockGetHeaderTitle;
  wrapper.instance().setHeaderDetails = mockSetHeaderDetails;

  const props = mockEntry;
  wrapper.instance().getContent(props);
  expect(mockGetHeaderTitle).toHaveBeenCalledTimes(1);
  expect(mockSetHeaderDetails).toHaveBeenCalledTimes(1);
  expect(mockSetHeaderDetails.mock.calls[0][0]).toEqual({
    currentSermon: mockEntry.currentSermon,
    series: mockEntry.series,
    title: "test title",
  });
  expect(mockSetHeaderDetails.mock.calls[0][1]).toEqual({
    parentItem: props.series.content,
  });
});

it("getEntry returns null if no item", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getEntry({});
  expect(result).toBe(null);
});

it("getEntry returns for all entry types", () => {
  const wrapper = shallow(generateComponent());
  const entryTypes = [
    "devotion",
    "article",
    "story",
    "currentSermon",
    "series",
    "album",
    "news",
  ];
  entryTypes.map((entry) => {
    const result = wrapper.instance().getEntry({
      [entry]: {
        content: {},
      },
    });
    expect(result).toEqual({});
  });
});

it("getHeaderTitle returns blank string if no entry found", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getHeaderTitle({});
  expect(result).toBe("");
});

it("getHeaderTitle returns string for possible entry types", () => {
  const wrapper = shallow(generateComponent());
  const entryTypes = [
    ["devotion", "Devotion"],
    ["article", "Article"],
    ["story", "Story"],
    ["currentSermon", "Series"],
    ["series", "Series"],
    ["album", "Music"],
    ["news", "News"],
  ];
  entryTypes.map((entry) => {
    const result = wrapper.instance().getHeaderTitle({
      [entry[0]]: {},
    });
    expect(result).toBe(entry[1]);
  });
});

it("lockHeader locks the header with the requestee", () => {
  const mockDispatch = jest.fn();
  headerActions.lock = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().lockHeader("test");
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(headerActions.lock).toHaveBeenCalledTimes(1);
  expect(headerActions.lock).toHaveBeenCalledWith("test");
});

it("unlockHeader unlocks the header", () => {
  const mockDispatch = jest.fn();
  headerActions.unlock = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.instance().unlockHeader();
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(headerActions.unlock).toHaveBeenCalledTimes(1);
});

it("setHeaderDetails updates variables, the header, and state", () => {
  const mockDispatch = jest.fn();
  headerActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ __headerSet: false });
  wrapper.instance().setHeaderDetails("myOptions", "me");
  expect(wrapper.instance().savedDataOptions).toBe("myOptions");
  expect(wrapper.instance().savedDataRequestee).toBe("me");
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(headerActions.set).toHaveBeenCalledTimes(1);
  expect(headerActions.set).toHaveBeenCalledWith("myOptions", "me");
  expect(wrapper.state().__headerSet).toBe(true);
});

it("setHeaderDetails updates variables, but returns early if no options", () => {
  const mockDispatch = jest.fn();
  headerActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ __headerSet: false });
  wrapper.instance().setHeaderDetails(null, "me");
  expect(wrapper.instance().savedDataOptions).toBe(null);
  expect(wrapper.instance().savedDataRequestee).toBe("me");
  expect(mockDispatch).toHaveBeenCalledTimes(0);
  expect(headerActions.set).toHaveBeenCalledTimes(0);
});
