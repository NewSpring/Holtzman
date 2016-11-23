import { Meteor } from "meteor/meteor";
import inAppLink, {
  openUrl,
  linkListener,
} from "../inAppLink";

describe("openUrl", () => {
  it("falls back to window open if error", () => {
    window.open = jest.fn();
    openUrl("http://test.com");
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      "http://test.com",
      "_blank",
      "location=yes"
    );
  });

  it("falls back to window open if SVC not available", () => {
    window.open = jest.fn();
    const mockIsAvailable = jest.fn();
    global.SafariViewController = {
      isAvailable: mockIsAvailable,
    };
    openUrl("http://test.com");
    expect(mockIsAvailable).toHaveBeenCalledTimes(1);
    // simulate callback
    mockIsAvailable.mock.calls[0][0](false);
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      "http://test.com",
      "_blank",
      "location=yes"
    );
  });

  it("calls SVC open if available", () => {
    const mockIsAvailable = jest.fn();
    const mockShow = jest.fn();
    global.SafariViewController = {
      isAvailable: mockIsAvailable,
      show: mockShow,
    };
    openUrl("http://test.com");
    expect(mockIsAvailable).toHaveBeenCalledTimes(1);
    // simulate callback
    mockIsAvailable.mock.calls[0][0](true);
    expect(mockShow).toHaveBeenCalledTimes(1);
    expect(mockShow.mock.calls[0][0]).toEqual({
      url: "http://test.com",
      hidden: false,
      animated: true,
      transition: "curl",
      enterReaderModeIfAvailable: false,
      tintColor: "#6BAC43",
    });
  });

  it("calls opened callback if successful", () => {
    const mockIsAvailable = jest.fn();
    const mockShow = jest.fn();
    global.SafariViewController = {
      isAvailable: mockIsAvailable,
      show: mockShow,
    };
    const mockOpen = jest.fn();
    openUrl("http://test.com", mockOpen);
    mockIsAvailable.mock.calls[0][0](true);
    // simulate opened callback
    mockShow.mock.calls[0][1]({
      event: "opened",
    });
    expect(mockOpen).toHaveBeenCalledTimes(1);
  });

  it("calls loaded callback if successful", () => {
    const mockIsAvailable = jest.fn();
    const mockShow = jest.fn();
    global.SafariViewController = {
      isAvailable: mockIsAvailable,
      show: mockShow,
    };
    const mockLoaded = jest.fn();
    openUrl("http://test.com", null, mockLoaded);
    mockIsAvailable.mock.calls[0][0](true);
    // simulate opened callback
    mockShow.mock.calls[0][1]({
      event: "loaded",
    });
    expect(mockLoaded).toHaveBeenCalledTimes(1);
  });

  it("calls closed callback if successful", () => {
    const mockIsAvailable = jest.fn();
    const mockShow = jest.fn();
    global.SafariViewController = {
      isAvailable: mockIsAvailable,
      show: mockShow,
    };
    const mockClosed = jest.fn();
    openUrl("http://test.com", null, null, mockClosed);
    mockIsAvailable.mock.calls[0][0](true);
    // simulate opened callback
    mockShow.mock.calls[0][1]({
      event: "closed",
    });
    expect(mockClosed).toHaveBeenCalledTimes(1);
  });
});

describe("inAppLink", () => {
  it("calls open url if SVC", () => {
    Meteor.isCordova = true;
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    global.SafariViewController = {};
    inAppLink({
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      currentTarget: {
        href: "http://test.com",
      },
    });
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  });

  it("calls open url if cordova.open if no SVC", () => {
    Meteor.isCordova = true;
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    global.SafariViewController = null;
    global.cordova = {
      InAppBrowser: {
        open: jest.fn(),
      },
    };
    inAppLink({
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      currentTarget: {
        href: "http://test.com",
      },
    });
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  });

  it("does not call if no SVC or cordova", () => {
    Meteor.isCordova = true;
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    global.SafariViewController = null;
    global.cordova = {
      InAppBrowser: null,
    };
    inAppLink({
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      currentTarget: {
        href: "http://test.com",
      },
    });
    expect(mockPreventDefault).toHaveBeenCalledTimes(0);
    expect(mockStopPropagation).toHaveBeenCalledTimes(0);
  });

  it("does not call if not cordova", () => {
    Meteor.isCordova = false;
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    inAppLink({
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      currentTarget: {
        href: "http://test.com",
      },
    });
    expect(mockPreventDefault).toHaveBeenCalledTimes(0);
    expect(mockStopPropagation).toHaveBeenCalledTimes(0);
  });
});

describe("linkListener", () => {
  it("calls openUrl", () => {
    Object.defineProperty(window.location, "host", {
      writable: true,
      value: "nottest.com",
    });
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      target: {
        tagName: "A",
        href: "http://test.com",
        host: "test.com",
      },
    };
    linkListener(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  });

  it("calls openUrl with fastClickScrollParent if not A", () => {
    Object.defineProperty(window.location, "host", {
      writable: true,
      value: "nottest.com",
    });
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      target: {
        tagName: "B",
        fastClickScrollParent: {
          tagName: "A",
          href: "http://test.com",
          host: "test.com",
        },
      },
    };
    linkListener(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  });

  it("calls openUrl with parent if not A", () => {
    Object.defineProperty(window.location, "host", {
      writable: true,
      value: "nottest.com",
    });
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      target: {
        tagName: "B",
        parentElement: {
          tagName: "A",
          href: "http://test.com",
          host: "test.com",
        },
      },
    };
    linkListener(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    expect(mockStopPropagation).toHaveBeenCalledTimes(1);
  });

  it("doest not call if external link", () => {
    Object.defineProperty(window.location, "host", {
      writable: true,
      value: "test.com",
    });
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      target: {
        tagName: "A",
        href: "http://test.com",
        host: "test.com",
      },
    };
    linkListener(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalledTimes(0);
    expect(mockStopPropagation).toHaveBeenCalledTimes(0);
  });

  it("doest not call if no href", () => {
    Object.defineProperty(window.location, "host", {
      writable: true,
      value: "nottest.com",
    });
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      target: {
        tagName: "A",
        host: "test.com",
      },
    };
    linkListener(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalledTimes(0);
    expect(mockStopPropagation).toHaveBeenCalledTimes(0);
  });

  it("doest not call if no host", () => {
    Object.defineProperty(window.location, "host", {
      writable: true,
      value: "nottest.com",
    });
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      stopPropagation: mockStopPropagation,
      target: {
        tagName: "A",
        href: "http://test.com",
      },
    };
    linkListener(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalledTimes(0);
    expect(mockStopPropagation).toHaveBeenCalledTimes(0);
  });
});
