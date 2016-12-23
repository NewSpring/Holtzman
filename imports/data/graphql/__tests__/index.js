import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { DDP } from "meteor/ddp";

import {
  networkInterface,
  authMiddleware,
} from "../";


describe("networkInterface", () => {
  it("creates network interface with heighliner url", () => {
    expect(networkInterface._uri).toBe("https://api.newspring.cc/graphql");
  });

  it("has auth middleware", () => {
    expect(networkInterface._middlewares[0]).toEqual(authMiddleware);
  });
});

describe("authMiddleware", () => {
  it("does not add any headers if not logged in", () => {
    Accounts._storedLoginToken = jest.fn(() => false);
    const mockRequest = {
      options: {
        headers: {},
        map: {},
      },
    };
    const mockNext = jest.fn();
    // simulate request
    authMiddleware.applyMiddleware(mockRequest, mockNext);
    expect(mockRequest.options.headers).toEqual({});
    expect(Accounts._storedLoginToken).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("does adds auth header if logged in", () => {
    Accounts._storedLoginToken = jest.fn(() => "test");
    const mockRequest = {
      options: {
        headers: {},
        map: {},
      },
    };
    const mockNext = jest.fn();
    // simulate request
    authMiddleware.applyMiddleware(mockRequest, mockNext);
    expect(mockRequest.options.headers).toEqual({
      Authorization: "test",
    });
    expect(Accounts._storedLoginToken).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("does adds auth header if logged in on server", () => {
    DDP._CurrentInvocation.get.mockClear();
    DDP._CurrentInvocation.get.mockReturnValueOnce({
      connection: { id: "4" }
    });
    Accounts._getLoginToken = jest.fn(() => "new token");
    fetch.Headers = Headers;
    delete Accounts._storedLoginToken;
    const mockRequest = {
      options: {
        headers: {},
        map: {},
      },
    };
    const mockNext = jest.fn();
    // simulate request
    authMiddleware.applyMiddleware(mockRequest, mockNext);
    expect(mockRequest.options.headers).toEqual({
      Authorization: "new token",
    });
    expect(Accounts._getLoginToken).toBeCalledWith("4");
    expect(DDP._CurrentInvocation.get).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledTimes(1);
    delete fetch.Headers;
  });

  it("works if no headers attribute yet", () => {
    Accounts._storedLoginToken = jest.fn(() => "test");
    const mockRequest = {
      options: {},
    };
    const mockNext = jest.fn();
    // simulate request
    authMiddleware.applyMiddleware(mockRequest, mockNext);
    expect(mockRequest.options.headers).toEqual({
      Authorization: "test",
      map: {},
    });
    expect(Accounts._storedLoginToken).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
