import { shallow } from "enzyme";
import React, { Component } from "react";
import ReactMixin from "react-mixin";
import { share as shareActions } from "../../../data/store";
import Shareable from "../mixins.Shareable";

class CWithoutShareable extends Component {
  render() {
    return <div />;
  }
}

const CWithShareable = ReactMixin.decorate(Shareable)(CWithoutShareable);

const defaultProps = {
  dispatch: jest.fn(),
  devotion: {},
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <CWithShareable { ...newProps } />;
};

it("binds actions, updates state, and calls setShareProps on mount", () => {
  const wrapper = shallow(generateComponent());
  const mockSetShareProps = jest.fn();
  wrapper.instance().setShareProps = mockSetShareProps;
  wrapper.instance().componentWillMount();
  expect(wrapper.instance().shareableAction).toBeTruthy();
  expect(wrapper.state().__shareActionSet).toBe(false);
  expect(mockSetShareProps).toHaveBeenCalledTimes(1);
  expect(mockSetShareProps).toHaveBeenCalledWith(defaultProps);
});

it("getShareableEntry returns null if no entry", () => {
  const wrapper = shallow(generateComponent());
  const result = wrapper.instance().getShareableEntry({});
  expect(result).toBe(null);
});

it("getShareableEntry returns for all entry types", () => {
  const wrapper = shallow(generateComponent());
  const entryTypes = [
    "devotion",
    "article",
    "story",
    "series",
    "currentSermon",
    "album",
    "news",
  ];
  entryTypes.map((entry) => {
    const result = wrapper.instance().getShareableEntry({
      [entry]: {
        id: "1",
      },
    });
    expect(result).toEqual({
      id: "1",
    });
  });

  const result = wrapper.instance().getShareableEntry({
    data: { group: { id: "1" } },
  });

  expect(result).toEqual({ id: "1" });
});

it("getShareableEntry works if no id but content", () => {
  const wrapper = shallow(generateComponent());
  const entryTypes = [
    "devotion",
    "article",
    "story",
    "series",
    "currentSermon",
    "album",
    "news",
  ];
  entryTypes.map((entry) => {
    const result = wrapper.instance().getShareableEntry({
      [entry]: {
        content: {},
      },
    });
    expect(result).toEqual({});
  });
});

it("setShareProps calls setShareAction with entry if not sermon", () => {
  const wrapper = shallow(generateComponent());
  const mockEntry = { test: "thing" };
  const mockGetShareableEntry = jest.fn(() => mockEntry);
  const mockSetShareAction = jest.fn();
  wrapper.instance().getShareableEntry = mockGetShareableEntry;
  wrapper.instance().setShareAction = mockSetShareAction;
  wrapper.instance().setShareProps({});
  expect(mockGetShareableEntry).toHaveBeenCalledTimes(1);
  expect(mockGetShareableEntry).toHaveBeenCalledWith({});
  expect(mockSetShareAction).toHaveBeenCalledTimes(1);
  expect(mockSetShareAction).toHaveBeenCalledWith(mockEntry);
});

it("setShareProps calls setShareAction with entry and parent if sermon", () => {
  const wrapper = shallow(generateComponent());
  const mockEntry = { test: "thing" };
  const mockGetShareableEntry = jest.fn(() => mockEntry);
  const mockSetShareAction = jest.fn();
  wrapper.instance().getShareableEntry = mockGetShareableEntry;
  wrapper.instance().setShareAction = mockSetShareAction;
  const props = {
    currentSermon: {},
    series: {
      content: {},
    },
  };
  wrapper.instance().setShareProps(props);
  expect(mockGetShareableEntry).toHaveBeenCalledTimes(1);
  expect(mockGetShareableEntry).toHaveBeenCalledWith(props);
  expect(mockSetShareAction).toHaveBeenCalledTimes(1);
  expect(mockSetShareAction.mock.calls[0][0]).toEqual(mockEntry);
  expect(mockSetShareAction.mock.calls[0][1]).toEqual({
    parentItem: props.series.content,
  });
});

it("setShareProps doest nothing if share action set", () => {
  const wrapper = shallow(generateComponent());
  const mockGetShareableEntry = jest.fn();
  wrapper.setState({ __shareActionSet: true });
  wrapper.instance().setShareProps({});
  expect(mockGetShareableEntry).toHaveBeenCalledTimes(0);
});

it("setShareProps does nothing if no item", () => {
  const wrapper = shallow(generateComponent());
  const mockGetShareableEntry = jest.fn(() => null);
  wrapper.setState({ __shareActionSet: false });
  wrapper.instance().setShareProps({});
  expect(mockGetShareableEntry).toHaveBeenCalledTimes(0);
});

it("setShareAction dispatches share", () => {
  const mockDispatch = jest.fn();
  shareActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ __shareActionSet: false });
  const mockEntry = {
    id: "1",
    channelName: "articles",
    title: "test item",
    meta: {
      urlTitle: "test-item",
    },
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.jpg",
        },
      ],
    },
  };
  wrapper.instance().setShareAction(mockEntry);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledWith({
    subject: mockEntry.title,
    text: mockEntry.title,
    image: mockEntry.content.images[0].url,
    url: "https://newspring.cc/articles/test-item",
  });
});

it("setShareAction dispatches share properly with groups", () => {
  const mockDispatch = jest.fn();
  shareActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ __shareActionSet: false });
  const mockEntry = {
    __typename: "Group",
    id: "1",
    photo: "//harambe.gorilla/we-all-miss-him",
    name: "missing harambe group",
  };
  wrapper.instance().setShareAction(mockEntry);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledWith({
    subject: mockEntry.name,
    text: mockEntry.name,
    image: `https:${mockEntry.photo}`,
    url: "https://my.newspring.cc/groups/1",
  });
});

it("setShareAction uses parent item for image if present", () => {
  const mockDispatch = jest.fn();
  shareActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ __shareActionSet: false });
  const mockEntry = {
    id: "1",
    channelName: "articles",
    title: "test item",
    meta: {
      urlTitle: "test-item",
    },
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.jpg",
        },
      ],
    },
  };
  const mockParentItem = {
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/parent.jpg",
        },
      ],
    },
  };
  wrapper.instance().setShareAction(mockEntry, { parentItem: mockParentItem });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledWith({
    subject: mockEntry.title,
    text: mockEntry.title,
    image: mockParentItem.content.images[0].url,
    url: "https://newspring.cc/articles/test-item",
  });
});

it("setShareAction prepends https if necesary", () => {
  const mockDispatch = jest.fn();
  shareActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ __shareActionSet: false });
  const mockEntry = {
    id: "1",
    channelName: "articles",
    title: "test item",
    meta: {
      urlTitle: "test-item",
    },
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "//test.com/1x1.jpg",
        },
      ],
    },
  };
  wrapper.instance().setShareAction(mockEntry);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledTimes(1);
  expect(shareActions.set).toHaveBeenCalledWith({
    subject: mockEntry.title,
    text: mockEntry.title,
    image: `https:${mockEntry.content.images[0].url}`,
    url: "https://newspring.cc/articles/test-item",
  });
});

it("setShareAction does nothing if sermon and no parent item yet", () => {
  const mockDispatch = jest.fn();
  shareActions.set = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  wrapper.setState({ __shareActionSet: false });
  const mockEntry = {
    id: "1",
    channelName: "sermons",
    title: "test item",
    meta: {
      urlTitle: "test-item",
    },
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.jpg",
        },
      ],
    },
  };
  wrapper.instance().setShareAction(mockEntry, { parentItem: undefined });
  expect(mockDispatch).toHaveBeenCalledTimes(0);
  expect(shareActions.set).toHaveBeenCalledTimes(0);
});
