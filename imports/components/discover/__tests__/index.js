import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { print } from "graphql-tag/printer";
import { Meteor } from "meteor/meteor";
import modal from "../../../data/store/modal";
import {
  search as searchActions,
  nav as navActions,
} from "../../../data/store";
import {
  SearchContainerWithoutData as SearchContainer,
  SEARCH_QUERY,
} from "../";

jest.mock("../../../deprecated/mixins/mixins.Header.js", () => {});

const defaultProps = {
  dispatch: jest.fn(),
  search: {
    page: 1,
    pageSize: 10,
    term: "hey",
  },
  client: {
    query: jest.fn(),
  },
};

const generateComponent = (additionalProps = {}) => {
  const newProps = {
    ...defaultProps,
    ...additionalProps,
  };
  return <SearchContainer { ...newProps } />;
};

it("renders with props", () => {
  const wrapper = shallow(generateComponent());
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it("parses query", () => {
  expect(print(SEARCH_QUERY)).toMatchSnapshot();
});

it("adjust nav and header on mount", () => {
  navActions.setLevel = jest.fn();
  modal.update = jest.fn();
  Meteor.isCordova = false;
  const wrapper = shallow(generateComponent());
  expect(navActions.setLevel).toHaveBeenCalledTimes(1);
  expect(navActions.setLevel).toHaveBeenCalledWith("TOP");
  expect(modal.update).toHaveBeenCalledTimes(1);
  expect(modal.update).toHaveBeenCalledWith({ keepNav: true });
  // mock header mixin
  const mockLockHeader = jest.fn();
  wrapper.instance().lockHeader = mockLockHeader;
  const mockHeaderAction = jest.fn();
  wrapper.instance().headerAction = mockHeaderAction;
  wrapper.instance().componentWillMount();
  expect(mockLockHeader).toHaveBeenCalledTimes(1);
  expect(mockLockHeader).toHaveBeenCalledWith("DiscoverModal");
  expect(mockHeaderAction).toHaveBeenCalledTimes(1);
  expect(mockHeaderAction).toHaveBeenCalledWith({
    isSearch: true,
    searchSubmit: wrapper.instance().searchSubmit,
  }, "DiscoverModal");
});

it("adjust modal, header, and seach on unmount", () => {
  const wrapper = shallow(generateComponent());
  const mockUnlockHeader = jest.fn();
  wrapper.instance().unlockHeader = mockUnlockHeader;
  modal.update = jest.fn();
  searchActions.searching = jest.fn();
  wrapper.instance().componentWillUnmount();
  expect(modal.update).toHaveBeenCalledTimes(1);
  expect(modal.update).toHaveBeenCalledWith({
    keepNav: false,
    layoutOverride: [],
  });
  expect(searchActions.searching).toHaveBeenCalledTimes(1);
  expect(searchActions.searching).toHaveBeenCalledWith(false);
  expect(mockUnlockHeader).toHaveBeenCalledTimes(1);
});

it("getSearch calls apollo client with search query", () => {
  const mockPromiseData = {
    data: {
      search: {
        items: [{}, {}],
        total: 10,
      },
    },
  };
  const mockPromise = new Promise(p => p(mockPromiseData));
  const mockQuery = jest.fn(() => mockPromise);
  const wrapper = shallow(generateComponent({
    client: {
      query: mockQuery,
    },
  }));
  searchActions.toggleLoading = jest.fn();
  searchActions.incrementPage = jest.fn();
  searchActions.add = jest.fn();
  wrapper.instance().getSearch();
  expect(mockQuery).toHaveBeenCalledTimes(1);
  expect(mockQuery).toHaveBeenCalledWith({
    query: SEARCH_QUERY,
    variables: {
      term: defaultProps.search.term,
      first: defaultProps.search.pageSize,
      after: defaultProps.search.page * defaultProps.search.pageSize,
      site: "https://newspring.cc",
    },
    fetchPolicy: "network-only",
  });
  return mockPromise.then(() => {
    expect(searchActions.toggleLoading).toHaveBeenCalledTimes(1);
    expect(searchActions.incrementPage).toHaveBeenCalledTimes(1);
    expect(searchActions.add).toHaveBeenCalledTimes(1);
    expect(searchActions.add).toHaveBeenCalledWith(
      mockPromiseData.data.search.items
    );
  })
});

it("getSearch calls none and done if no items", () => {
  const mockPromiseData = {
    data: {
      search: {
        items: [],
        total: 0,
      },
    },
  };
  const mockPromise = new Promise(p => p(mockPromiseData));
  const mockQuery = jest.fn(() => mockPromise);
  const wrapper = shallow(generateComponent({
    client: {
      query: mockQuery,
    },
  }));
  searchActions.none = jest.fn();
  searchActions.done = jest.fn();
  wrapper.instance().getSearch();
  return mockPromise.then(() => {
    expect(searchActions.none).toHaveBeenCalledTimes(1);
    expect(searchActions.none).toHaveBeenCalledWith(true);
    expect(searchActions.done).toHaveBeenCalledTimes(1);
    expect(searchActions.done).toHaveBeenCalledWith(true);
  })
});

it("hide hides the modal", () => {
  modal.hide = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().hide();
  expect(modal.hide).toHaveBeenCalledTimes(1);
});

it("searchSubmit calls prevent default and all the search actions", () => {
  const mockPreventDefault = jest.fn();
  const mockBlur = jest.fn();
  document.getElementById = jest.fn(() => ({
    blur: mockBlur,
    value: "hey",
  }));
  const mockGetSearch = jest.fn();
  searchActions.searching = jest.fn();
  searchActions.clear = jest.fn();
  searchActions.term = jest.fn();
  searchActions.toggleLoading = jest.fn();

  const wrapper = shallow(generateComponent());
  wrapper.instance().getSearch = mockGetSearch;

  wrapper.instance().searchSubmit({
    preventDefault: mockPreventDefault,
  });

  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(document.getElementById).toHaveBeenCalledTimes(2);
  expect(document.getElementById).toHaveBeenCalledWith("search");
  expect(mockBlur).toHaveBeenCalledTimes(1);

  expect(searchActions.searching).toHaveBeenCalledTimes(1);
  expect(searchActions.clear).toHaveBeenCalledTimes(1);
  expect(searchActions.term).toHaveBeenCalledTimes(1);
  expect(searchActions.toggleLoading).toHaveBeenCalledTimes(1);
});

it("loadMore calls toggleLoading and getSearch", () => {
  const mockPreventDefault = jest.fn();
  searchActions.toggleLoading = jest.fn();
  const mockGetSearch = jest.fn();
  const wrapper = shallow(generateComponent());
  wrapper.instance().getSearch = mockGetSearch;
  wrapper.instance().loadMore({
    preventDefault: mockPreventDefault,
  });
  expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  expect(searchActions.toggleLoading).toHaveBeenCalledTimes(1);
  expect(mockGetSearch).toHaveBeenCalledTimes(1);
});
