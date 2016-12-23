import { shallow } from "enzyme";
import React, { Component } from "react";
import ReactMixin from "react-mixin";
import { Meteor } from "meteor/meteor";
import mockDate from "mockdate";
import { liked as likedActions, modal } from "../../store";
import Likes from "../../database/collections/likes";
import OnBoard from "../../blocks/accounts";
import Likeable from "../mixins.Likeable";

jest.mock("../../database/collections/likes", () => jest.fn());
jest.mock("../../store", () => ({
  liked: {
    toggle: jest.fn(),
  },
  modal: {
    render: jest.fn(),
  },
}));

// XXX god bless you
mockDate.set("1/1/2014");

class CWithoutHeader extends Component {
  render() {
    return <div />;
  }
}

const CWithHeader = ReactMixin.decorate(Likeable)(CWithoutHeader);

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

it("sets likeableAction on mount", () => {
  const wrapper = shallow(generateComponent());
  expect(wrapper.instance().likeableAction).toBeTruthy();
});

it("onClickAction renders modal if no user", () => {
  Meteor.userId = jest.fn(() => false);
  const mockDispatch = jest.fn();
  modal.render = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const mockGetLikeableEntry = jest.fn();
  wrapper.instance().getLikableEntry = mockGetLikeableEntry;
  const result = wrapper.instance().onClickAction();
  expect(result).toEqual({
    type: "FALSY",
    payload: {},
  });
  expect(mockGetLikeableEntry).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(modal.render).toHaveBeenCalledTimes(1);
  expect(modal.render.mock.calls[0][0]).toBe(OnBoard);
  expect(modal.render.mock.calls[0][1]).toEqual({
    coverHeader: true,
    modalBackground: "light",
  });
});

it("onClickAction calls updates redux and the database if user", () => {
  Meteor.userId = jest.fn(() => true);
  modal.render = jest.fn();
  const wrapper = shallow(generateComponent());
  const mockEntry = {};
  const mockGetLikeableEntry = jest.fn(() => mockEntry);
  wrapper.instance().getLikableEntry = mockGetLikeableEntry;
  const mockUpdateRedux = jest.fn();
  wrapper.instance().updateRedux = mockUpdateRedux;
  const mockUpdateDatabase = jest.fn();
  wrapper.instance().updateDatabase = mockUpdateDatabase;
  const result = wrapper.instance().onClickAction();
  expect(result).toEqual({
    type: "FALSY",
    payload: {},
  });
  expect(mockGetLikeableEntry).toHaveBeenCalledTimes(1);
  expect(mockUpdateRedux).toHaveBeenCalledTimes(1);
  expect(mockUpdateRedux).toHaveBeenCalledWith(mockEntry);
  expect(mockUpdateDatabase).toHaveBeenCalledTimes(1);
  expect(mockUpdateDatabase).toHaveBeenCalledWith(mockEntry);
});

it("getLikableEntry returns null if not found", () => {
  const wrapper = shallow(generateComponent({
    props: {},
  }));
  expect(wrapper.instance().getLikableEntry()).toBe(null);
});

it("getLikableEntry returns for all entry types", () => {
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
    const wrapper = shallow(generateComponent({
      [entry]: {
        content: {},
      },
    }));
    const result = wrapper.instance().getLikableEntry();
    expect(result).toEqual({});
  });
});

it("updateRedux toggles like with id", () => {
  const mockDispatch = jest.fn();
  likedActions.toggle = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const result = wrapper.instance().updateRedux({
    id: "1",
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(likedActions.toggle).toHaveBeenCalledTimes(1);
  expect(likedActions.toggle).toHaveBeenCalledWith({
    entryId: "1",
  });
});

it("updateRedux toggles like with entryId", () => {
  const mockDispatch = jest.fn();
  likedActions.toggle = jest.fn();
  const wrapper = shallow(generateComponent({
    dispatch: mockDispatch,
  }));
  const result = wrapper.instance().updateRedux({
    entryId: "1",
  });
  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(likedActions.toggle).toHaveBeenCalledTimes(1);
  expect(likedActions.toggle).toHaveBeenCalledWith({
    entryId: "1",
  });
});

it("updateDatabase removes like if found", () => {
  Likes.findOne = jest.fn(() => ({ _id: "1" }));
  Likes.remove = jest.fn();
  Meteor.userId = jest.fn(() => "2");
  const wrapper = shallow(generateComponent());
  wrapper.instance().updateDatabase({
    id: "1",
  });
  expect(Likes.remove).toHaveBeenCalledTimes(1);
  expect(Likes.remove).toHaveBeenCalledWith("1");
});

it("updateDatabase inserts like if not found", () => {
  Likes.findOne = jest.fn(() => null);
  Likes.insert = jest.fn();
  Meteor.userId = jest.fn(() => "2");
  const wrapper = shallow(generateComponent());
  const mockEntry = {
    id: "1",
    title: "test title",
    channelName: "articles",
    meta: {
      date: "12-12-2012",
    },
    status: "open",
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.jpg",
        },
      ],
    },
  };
  wrapper.instance().updateDatabase(mockEntry);
  expect(Likes.insert).toHaveBeenCalledTimes(1);
  expect(Likes.insert).toHaveBeenCalledWith({
    userId: "2",
    entryId: mockEntry.id,
    title: mockEntry.title,
    image: mockEntry.content.images[0].url,
    link: "/articles/1",
    icon: "icon-category-text",
    category: "Articles",
    date: mockEntry.meta.date,
    status: mockEntry.status,
    dateLiked: new Date(),
  });
});

it("updateDatabase inserts like with parent if sermon", () => {
  Likes.findOne = jest.fn(() => null);
  Likes.insert = jest.fn();
  Meteor.userId = jest.fn(() => "2");
  const wrapper = shallow(generateComponent({
    series: {
      content: {
        id: "3",
        content: {
          images: [
            {
              fileLabel: "1:1",
              url: "http://test.com/parent.jpg",
            },
          ],
        },
      },
    },
  }));
  const mockEntry = {
    id: "1",
    title: "test title",
    channelName: "sermons",
    meta: {
      date: "12-12-2012",
    },
    status: "open",
    content: {
      images: [
        {
          fileLabel: "1:1",
          url: "http://test.com/1x1.jpg",
        },
      ],
    },
  };
  wrapper.instance().updateDatabase(mockEntry);
  expect(Likes.insert).toHaveBeenCalledTimes(1);
  expect(Likes.insert).toHaveBeenCalledWith({
    userId: "2",
    entryId: mockEntry.id,
    title: mockEntry.title,
    image: "http://test.com/parent.jpg",
    link: "/series/3/sermon/1",
    icon: "icon-category-video",
    category: "Sermons",
    date: mockEntry.meta.date,
    status: mockEntry.status,
    dateLiked: new Date(),
  });
});
