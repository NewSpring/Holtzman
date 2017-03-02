import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import { Meteor } from "meteor/meteor";
import { print } from "graphql-tag/printer";
import { linkListener } from "../../../../../util/inAppLink";
import {
  accounts as accountsActions,
  liked as likedActions,
  topics as topicActions,
} from "../../../../../data/store";
import {
  GlobalWithoutData,
  Watermark,
  App,
  Blank,
  GlobalData,
  URL_TITLE_QUERY,
  SAVE_DEVICE_REGISTRATION_ID,
} from "../";

jest.mock("../../../../../deprecated/database/collections/likes", () => ({
  find: jest.fn(() => ({
    fetch: jest.fn(() => []),
  })),
}));
import Likes from "../../../../../deprecated/database/collections/likes";

jest.mock("../../../nav", () => jest.fn());

global.Raven = {
  setUserContext: jest.fn(),
};

global.fabric = {
  Crashlytics: {
    setUserEmail: jest.fn(),
    setUserIdentifier: jest.fn(),
  },
  Answers: {
    sendLogIn: jest.fn(),
  },
};

global.FCMPlugin = {
  ready: jest.fn(),
  subscribeToTopic: jest.fn(),
  getToken: jest.fn(),
  onTokenRefresh: jest.fn(),
};

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("Watermark", () => {
  const generateComponent = () => (
    <Watermark />
  );

  it("renders", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("App", () => {
  const defaultProps = {
    className: "one two",
    native: false,
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };

    return (
      <App { ...newProps }>
        <h1>test</h1>
      </App>
    );
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("renders header when native", () => {
    const wrapper = shallow(generateComponent({
      native: true,
    }));
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("Blank", () => {
  const generateComponent = () => (
    <Blank />
  );

  it("is blank", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});

describe("GlobalData", () => {
  const defaultProps = {
    dispatch: jest.fn(),
    client: {
      resetStore: jest.fn(),
    },
  };

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <GlobalData { ...newProps } />;
  };

  it("sets Raven user context if no user", () => {
    global.Raven = {
      setUserContext: jest.fn(),
    };
    const wrapper = shallow(generateComponent());
    expect(global.Raven.setUserContext).toHaveBeenCalledTimes(1);
  });

  it("sets Raven user context with email and userId if user", () => {
    global.Raven = {
      setUserContext: jest.fn(),
    };
    Meteor.userId = jest.fn(() => 1);
    Meteor.user = jest.fn(() => ({
      emails: [
        { address: "test@gmail.com" },
      ],
    }));
    const wrapper = shallow(generateComponent());
    expect(global.Raven.setUserContext).toHaveBeenCalledTimes(1);
    expect(global.Raven.setUserContext).toHaveBeenCalledWith({
      id: 1,
      email: "test@gmail.com",
    });
  });

  it("calls Fabric when no user", () => {
    Meteor.userId = jest.fn(() => false);
    Meteor.user = jest.fn(() => false);
    const mockSetUserEmail = jest.fn();
    const mockSetUserIdentifier = jest.fn();
    global.fabric = {
      Crashlytics: {
        setUserEmail: mockSetUserEmail,
        setUserIdentifier: mockSetUserIdentifier,
      },
    };
    const wrapper = shallow(generateComponent());
    expect(mockSetUserEmail).toHaveBeenCalledTimes(1);
    expect(mockSetUserIdentifier).toHaveBeenCalledTimes(1);
  });

  it("calls Fabric when user with email and userId", () => {
    Meteor.userId = jest.fn(() => 2);
    Meteor.user = jest.fn(() => ({
      emails: [
        { address: "test@gmail.com" },
      ],
    }));
    const mockSetUserEmail = jest.fn();
    const mockSetUserIdentifier = jest.fn();
    const mockSendLogIn = jest.fn();
    global.fabric = {
      Crashlytics: {
        setUserEmail: mockSetUserEmail,
        setUserIdentifier: mockSetUserIdentifier,
      },
      Answers: {
        sendLogIn: mockSendLogIn,
      },
    };
    const wrapper = shallow(generateComponent());
    expect(mockSetUserEmail).toHaveBeenCalledTimes(1);
    expect(mockSetUserEmail).toHaveBeenCalledWith("test@gmail.com");
    expect(mockSetUserIdentifier).toHaveBeenCalledTimes(1);
    expect(mockSetUserIdentifier).toHaveBeenCalledWith(2);
    expect(mockSendLogIn).toHaveBeenCalledTimes(1);
    expect(mockSendLogIn).toHaveBeenCalledWith("meteor", true);
  });

  it("clears the store when signing out", () => {
    accountsActions.authorize = jest.fn();
    accountsActions.signout = jest.fn();
    const mockResetStore = jest.fn();
    Meteor.userId = jest.fn(() => 2);
    Meteor.user = jest.fn(() => ({
      emails: [
        { address: "test@gmail.com" },
      ],
    }));
    const wrapper = shallow(generateComponent());
    Meteor.userId = jest.fn(() => false);
    Meteor.user = jest.fn(() => false);
    const wrapper2 = shallow(generateComponent({
      client: {
        resetStore: mockResetStore,
      },
    }));
    expect(accountsActions.authorize).toHaveBeenCalledTimes(2);
    expect(accountsActions.authorize).toHaveBeenCalledWith(false);
    expect(accountsActions.signout).toHaveBeenCalledTimes(1);
    expect(mockResetStore).toHaveBeenCalledTimes(1);
  });

  it("subscribes to user and like data if user", () => {
    Meteor.userId = jest.fn(() => 2);
    Meteor.subscribe = jest.fn();
    Meteor.user = jest.fn(() => ({
      topics: [{}, {}],
    }));
    const mockFetch = jest.fn(() => [{ entryId: 1 }, { entryId: 2 }]);
    Likes.find = jest.fn(() => ({
      fetch: mockFetch,
    }));
    likedActions.set = jest.fn();
    topicActions.set = jest.fn();
    const wrapper = shallow(generateComponent());

    expect(Meteor.subscribe).toHaveBeenCalledTimes(3);
    expect(Meteor.subscribe.mock.calls[0][0]).toBe("userData");
    expect(topicActions.set).toHaveBeenCalledTimes(1);
    expect(topicActions.set).toHaveBeenCalledWith([{}, {}]);

    expect(Meteor.subscribe.mock.calls[1][0]).toBe("likes");
    expect(Meteor.subscribe.mock.calls[2][0]).toBe("recently-liked");

    expect(Likes.find).toHaveBeenCalledTimes(1);
    expect(Likes.find).toHaveBeenCalledWith({ userId: 2 });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(likedActions.set).toHaveBeenCalledTimes(1);
    expect(likedActions.set).toHaveBeenCalledWith([1, 2]);
  });
});

describe("GlobalWithoutData", () => {
  const defaultProps = {
    dispatch: jest.fn(),
    client: {
      query: jest.fn().mockReturnValue(
        new Promise(p => p({ data: {} }))
      ),
    },
  };

  afterEach(() => {
      defaultProps.client.query.mockClear();
  })

  const generateComponent = (additionalProps = {}) => {
    const newProps = {
      ...defaultProps,
      ...additionalProps,
    };
    return <GlobalWithoutData { ...newProps } />;
  };

  it("renders with props", () => {
    const wrapper = shallow(generateComponent());
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it("adds link listener if cordova", () => {
    global.universalLinks = {
      subscribe: jest.fn(),
    };
    Meteor.isCordova = true;
    document.addEventListener = jest.fn();
    const wrapper = shallow(generateComponent());
    expect(document.addEventListener).toHaveBeenCalledTimes(2);
    expect(document.addEventListener).toHaveBeenCalledWith("click", linkListener);
    expect(document.addEventListener.mock.calls.length).toBe(2);
    expect(document.addEventListener.mock.calls[0]).toMatchSnapshot();
    expect(document.addEventListener.mock.calls[0][0]).toBe("click");
    expect(document.addEventListener.mock.calls[0][1]).toBe(linkListener);
    expect(document.addEventListener.mock.calls[1]).toMatchSnapshot();
    expect(document.addEventListener.mock.calls[1][0]).toBe("deviceready");
    // The noop here isn't recognized as the anonymous function that is
    // coming from the function call, even though they are both technically
    // anonymous functions. Per James it's probably because when we write
    // the noop, it thinks it's a new thing. Need to come up with a way
    // to have it recognize the anonymous function as not something that
    // is new. The snapshots here will help with making sure this is
    // covered until we figure this out.
    // expect(document.addEventListener.mock.calls[1][1]).toEqual(() => {});
    expect(document.addEventListener.mock.calls[1][2]).toBe(false);
  });

  it("tests universalLinkRouting", () => {
    global.universalLinks = {
      subscribe: jest.fn(),
    };
    Meteor.isCordova = true;
    let eventData = {
      path: "/groups/finder",
    }
    const isQueryRoute = jest.fn();
    const wrapper = shallow(generateComponent());
    expect(wrapper.state().universalLinkLoading).toBe(false);
    wrapper.instance().universalLinkRouting(eventData);
    // this should run through the link and actually turn the state
    // to true and then back to false again. that's why this should
    // be false.
    expect(wrapper.state().universalLinkLoading).toBe(false);
  });

  it("tests isQueryRoute", () => {
    global.universalLinks = {
      subscribe: jest.fn(),
    };
    let path = "/groups/finder";
    const wrapper = shallow(generateComponent());
    let result = wrapper.instance().isQueryRoute(path);
    expect(result).toBe(false);
    path = "/sermons";
    result = wrapper.instance().isQueryRoute(path);
    expect(result).toBe(false);
    path = "/sermons/";
    result = wrapper.instance().isQueryRoute(path);
    expect(result).toBe("/sermons/");
  });

  it("tests the /sermons/ route", () => {
    global.universalLinks = {
      subscribe: jest.fn(),
    };
    let path = "/sermons/";
    const wrapper = shallow(generateComponent());
    wrapper.instance().withQuery(path);
    expect(defaultProps.client.query).toHaveBeenCalledTimes(1);
    expect(defaultProps.client.query).toHaveBeenCalledWith({
      query: URL_TITLE_QUERY,
      variables: {
        parentChannel: "series_newspring",
        parentUrl: undefined,
        childChannel: "",
        childUrl: "",
        hasChild: "",
      }
    });

  });

  it("tests the /sermons/forsc route", () => {
    global.universalLinks = {
      subscribe: jest.fn(),
    };
    let path = "/sermons/forsc";
    const wrapper = shallow(generateComponent());
    wrapper.instance().withQuery(path);
    expect(defaultProps.client.query).toHaveBeenCalledTimes(1);
    expect(defaultProps.client.query).toHaveBeenCalledWith({
      query: URL_TITLE_QUERY,
      variables: {
        parentChannel: "series_newspring",
        parentUrl: "forsc",
        childChannel: "",
        childUrl: "",
        hasChild: "",
      }
    });
  });

  it("tests the /sermons/forsc/growing-people-change1 route", () => {
    global.universalLinks = {
      subscribe: jest.fn(),
    };
    let path = "/sermons/forsc/growing-people-change1";
    const wrapper = shallow(generateComponent());
    wrapper.instance().withQuery(path);
    expect(defaultProps.client.query).toHaveBeenCalledTimes(1);
    expect(defaultProps.client.query).toHaveBeenCalledWith({
      query: URL_TITLE_QUERY,
      variables: {
        parentChannel: "series_newspring",
        parentUrl: "forsc",
        childChannel: "sermons",
        childUrl: "growing-people-change1",
        hasChild: "forsc",
      }
    });
  });

  // test URL_TITLE_QUERY
  it("parses URL_TITLE_QUERY correctly", () => {
    expect(print(URL_TITLE_QUERY)).toMatchSnapshot();
  });

  // test SAVE_DEVICE_REGISTRATION_ID
  it("parses SAVE_DEVICE_REGISTRATION_ID correctly", () => {
    expect(print(SAVE_DEVICE_REGISTRATION_ID)).toMatchSnapshot();
  });

  it("tests deviceready and it's associated functions", () => {
    global.FCMPlugin = {
      ready: jest.fn(),
      subscribeToTopic: jest.fn(),
      getToken: jest.fn(),
      onTokenRefresh: jest.fn(),
    };
    global.universalLinks = {
      subscribe: jest.fn(),
    };
    jest.resetAllMocks();
    const saveDeviceRegistrationId = jest.fn();
    Meteor.isCordova = true;
    const wrapper = shallow(generateComponent());
    wrapper.instance().deviceReadyFunction(saveDeviceRegistrationId);
    expect(global.universalLinks.subscribe).toHaveBeenCalledTimes(1);
    expect(global.FCMPlugin.subscribeToTopic).toHaveBeenCalledTimes(1);
    expect(global.FCMPlugin.subscribeToTopic).toHaveBeenCalledWith("newspring");
    expect(global.FCMPlugin.getToken).toHaveBeenCalledTimes(1);
    expect(global.FCMPlugin.onTokenRefresh).toHaveBeenCalledTimes(1);
  });
});
