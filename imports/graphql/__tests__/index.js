import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
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
