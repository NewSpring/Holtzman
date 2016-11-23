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
