
import { Meteor } from "meteor/meteor";
import { api } from "../../../../util/rock";

import remove from "../";

const mockedData = {
  ReferenceNumber: "TEST",
  FinancialGatewayId: 3,
  Id: 1,
};

jest.mock("../../../../util/rock", () => ({
  api: {
    _: { give: { gateway: { id: 3 } } },
    get: { sync: jest.fn(() => mockedData) },
    delete: { sync: jest.fn(() => true) },
  }
}));

it("correctly adds the function to Meteor.methods under `PaymentAccounts.remove`", () => {
  expect(Meteor.methods).toHaveBeenCalledTimes(1);
  expect(Meteor.methods.mock.calls[0][0]).toEqual({ "PaymentAccounts.remove": remove });
});

it("correctly removes an account", () => {
  const id = 1;
  const mockedWrappedAsync = jest.fn(() => jest.fn(details => {
    expect(details).toEqual(mockedData.ReferenceNumber);
    return true;
  }));
  const originalAsync = Meteor.wrapAsync;
  Meteor.wrapAsync = mockedWrappedAsync;

  const success = remove(id);
  expect(api.get.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(api.delete.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(mockedWrappedAsync).toHaveBeenCalled();
  expect(success).toBe(true);

  Meteor.wrapAsync = originalAsync;
});

it("throws a helpful error if account can't be removed", () => {
  const id = 1;

  // Mocks
  const mockedDelete = jest.fn(() => { status: "ERROR" });
  const originalDelete = api.delete.sync;
  api.delete.sync = mockedDelete;

  const mockedWrappedAsync = jest.fn(() => jest.fn(details => {
    expect(details).toEqual(mockedData.ReferenceNumber);
    return true;
  }));
  const originalAsync = Meteor.wrapAsync;
  Meteor.wrapAsync = mockedWrappedAsync;

  let succes;
  try {
    remove(id);
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
  expect(api.get.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(api.delete.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(mockedWrappedAsync).not.toHaveBeenCalled();

  // repair mocks
  Meteor.wrapAsync = originalAsync;
  api.delete.sync = originalDelete;
});


it("throws a helpful error if account lookup fails", () => {
  const id = 1;

  // Mocks
  const mockedDelete = jest.fn(() => undefined);
  const originalDelete = api.delete.sync;
  api.delete.sync = mockedDelete;

  const mockedWrappedAsync = jest.fn(() => jest.fn(details => {
    expect(details).toEqual(mockedData.ReferenceNumber);
    return true;
  }));
  const originalAsync = Meteor.wrapAsync;
  Meteor.wrapAsync = mockedWrappedAsync;

  let succes;
  try {
    remove(id);
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
  expect(api.get.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(api.delete.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(mockedWrappedAsync).not.toHaveBeenCalled();

  // repair mocks
  Meteor.wrapAsync = originalAsync;
  api.delete.sync = originalDelete;
});

it("does not try to remove an account if not containing a ReferenceNumber", () => {
  const id = 1;

  // mocks
  const mockedWrappedAsync = jest.fn(() => jest.fn(details => {
    expect(details).toEqual(mockedData.ReferenceNumber);
    return true;
  }));
  const originalAsync = Meteor.wrapAsync;
  Meteor.wrapAsync = mockedWrappedAsync;

  const originalGet = api.get.sync;
  const mockedGet = jest.fn(() => ({ status: "Error" }));
  api.get.sync = mockedGet;

  const success = remove(id);
  expect(api.get.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(api.delete.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(mockedWrappedAsync).not.toHaveBeenCalled();
  expect(success).toBe(true);

  Meteor.wrapAsync = originalAsync;
  api.get.sync = originalGet;
});

it("does not try to remove an account if id on the account does not match the gateway", () => {
  const id = 1;

  // mocks
  const mockedWrappedAsync = jest.fn(() => jest.fn(details => {
    expect(details).toEqual(mockedData.ReferenceNumber);
    return true;
  }));
  const originalAsync = Meteor.wrapAsync;
  Meteor.wrapAsync = mockedWrappedAsync;

  const originalGet = api.get.sync;
  const mockedResponse = {
    ...mockedData,
    ...{ FinancialGatewayId: 2 },
  };

  const mockedGet = jest.fn(() => mockedResponse);
  api.get.sync = mockedGet;

  const success = remove(id);
  expect(api.get.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(api.delete.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(mockedWrappedAsync).not.toHaveBeenCalled();
  expect(success).toBe(true);

  Meteor.wrapAsync = originalAsync;
  api.get.sync = originalGet;
});

it("does not try to remove an account if the gateway id does not match the id on the account", () => {
  const id = 1;

  // mocks
  const mockedWrappedAsync = jest.fn(() => jest.fn(details => {
    expect(details).toEqual(mockedData.ReferenceNumber);
    return true;
  }));
  const originalAsync = Meteor.wrapAsync;
  Meteor.wrapAsync = mockedWrappedAsync;

  const originalGatewayId = api._.give.gateway.id;
  api._.give.gateway.id = 4;

  const success = remove(id);
  expect(api.get.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(api.delete.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(mockedWrappedAsync).not.toHaveBeenCalled();
  expect(success).toBe(true);

  Meteor.wrapAsync = originalAsync;
  api._.give.gateway.id = originalGatewayId;
});

it("correctly throws if call to NMI fails and includes messages", () => {
  const id = 1;
  const mockedWrappedAsync = jest.fn(() => jest.fn(details => {
    expect(details).toEqual(mockedData.ReferenceNumber);
    throw new Error("NMI Transactaion Failure");
    return true;
  }));
  const originalAsync = Meteor.wrapAsync;
  Meteor.wrapAsync = mockedWrappedAsync;

  let success;
  try {
    success = remove(id);
  } catch (e) {
    expect(e).toMatchSnapshot();
    expect(e.message).toContain("NMI Transactaion Failure");
  }
  expect(api.get.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(api.delete.sync.mock.calls[0][0]).toBe(`FinancialPersonSavedAccounts/${id}`);
  expect(mockedWrappedAsync).toHaveBeenCalled();
  expect(success).toBeFalsy();

  Meteor.wrapAsync = originalAsync;
});
