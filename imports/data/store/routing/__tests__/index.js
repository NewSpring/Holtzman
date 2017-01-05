import { syncHistory } from "../";

describe("listen", () => {
  it("calls listen", () => {
    const mockListenReturn = jest.fn();
    const history = {
      listen: jest.fn(() => mockListenReturn),
    };
    syncHistory(history);
    expect(history.listen).toHaveBeenCalledTimes(1);
    expect(mockListenReturn).toHaveBeenCalledTimes(1);
  });
});

describe("middleware", () => {
  // XXX yep
  it("middleware dispatches to the store", () => {
    const mockListenReturn = jest.fn();
    const history = {
      listen: jest.fn(() => mockListenReturn),
      test: jest.fn(),
    };
    const middleware = syncHistory(history);
    history.listen.mockClear();
    const mockStore = {
      getState: jest.fn(() => ({
        routing: {
          location: {},
        },
      })),
      dispatch: jest.fn(),
    };
    const returnedNext = middleware(mockStore);
    expect(history.listen).toHaveBeenCalledTimes(1);
    const mockLocation = {};
    // simulate history.listen callback
    history.listen.mock.calls[0][0](mockLocation);
    expect(mockStore.getState).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    // simulate next call
    const mockNext = jest.fn();
    const returnedAction = returnedNext(mockNext);
    // simulate non transition action call
    returnedAction({
      type: "test",
    });
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith({
      type: "test",
    });
    mockNext.mockClear();
    // simulate transition action call
    returnedAction({
      type: "@@router/TRANSITION",
      payload: {
        method: "test",
        args: ["one", "two"],
      },
    });
    expect(mockNext).not.toHaveBeenCalled();
    expect(history.test).toHaveBeenCalledTimes(1);
    expect(history.test).toHaveBeenCalledWith("one", "two");
  });

  it("handles case where last location does not equal path name", () => {
    const mockListenReturn = jest.fn();
    const history = {
      listen: jest.fn(() => mockListenReturn),
      test: jest.fn(),
    };
    const middleware = syncHistory(history);
    history.listen.mockClear();
    const mockStore = {
      getState: jest.fn(() => ({
        routing: {
          location: {
            previous: [
              "thing",
            ],
          },
        },
      })),
      dispatch: jest.fn(),
    };
    const returnedNext = middleware(mockStore);
    expect(history.listen).toHaveBeenCalledTimes(1);
    const mockLocation = {
      pathname: "notthing",
    };
    // simulate history.listen callback
    history.listen.mock.calls[0][0](mockLocation);
  });
});

describe("listenForReplays", () => {
  it("calls replace if same key", () => {
    const mockListenReturn = jest.fn();
    const history = {
      listen: jest.fn(() => mockListenReturn),
      test: jest.fn(),
      replace: jest.fn(),
      transitionTo: jest.fn(),
    };
    const middleware = syncHistory(history);
    const mockStore = {
      getState: jest.fn(() => ({
        routing: {
          location: {
            key: "1",
          },
        },
      })),
      subscribe: jest.fn(),
    };
    middleware.listenForReplays(mockStore);
    expect(mockStore.getState).toHaveBeenCalledTimes(1);
    expect(mockStore.subscribe).toHaveBeenCalledTimes(1);
    // simulate store subscribe callback
    mockStore.subscribe.mock.calls[0][0]();
    expect(history.replace).toHaveBeenCalledTimes(1);
    expect(history.replace).toHaveBeenCalledWith({
      key: "1"
    });
  });

  it("calls transitionTo if different key", () => {
    const mockListenReturn = jest.fn();
    const history = {
      listen: jest.fn(() => mockListenReturn),
      test: jest.fn(),
      replace: jest.fn(),
      transitionTo: jest.fn(),
    };
    const middleware = syncHistory(history);
    const mockStore = {
      getState: jest.fn(() => ({
        routing: {
          location: {
            key: "1",
          },
        },
      })),
      subscribe: jest.fn(),
    };
    middleware.listenForReplays(mockStore);
    // change keys
    mockStore.getState = jest.fn(() => ({
      routing: {
        location: {
          key: "2",
        },
      },
    }));
    // simulate store subscribe callback
    mockStore.subscribe.mock.calls[0][0]();
    expect(history.transitionTo).toHaveBeenCalledTimes(1);
    expect(history.transitionTo).toHaveBeenCalledWith({
      key: "2"
    });
  });
});

describe("unsubscribe", () => {
  it("calls unsubscribe history", () => {
    const mockListenReturn = jest.fn();
    const history = {
      listen: jest.fn(() => mockListenReturn),
      test: jest.fn(),
      replace: jest.fn(),
      transitionTo: jest.fn(),
    };
    const middleware = syncHistory(history);
    const mockSubscribeReturn = jest.fn();
    const mockStore = {
      getState: jest.fn(() => ({
        routing: {
          location: {
            previous: [
              "thing",
            ],
          },
        },
      })),
      subscribe: jest.fn(() => mockSubscribeReturn),
    };
    const returnedNext = middleware(mockStore);
    mockListenReturn.mockClear();
    const mockLocation = {};
    // simulate history.listen callback
    history.listen.mock.calls[0][0](mockLocation);

    middleware.listenForReplays(mockStore);

    middleware.unsubscribe();
    expect(mockListenReturn).toHaveBeenCalledTimes(1);
    expect(mockSubscribeReturn).toHaveBeenCalledTimes(1);
  });
});
