import { takeLatest, put, select, call } from "redux-saga/effects";
import shareSaga, { shareAction } from "../saga";

it("listens to SHARE.SHARE", () => {

  const mock = jest.fn();

  const saga = shareSaga();
  const expectedYield = call(takeLatest, "SHARE.SHARE", shareAction);

  const event = saga.next().value;
  expect(event.FORK).toBeTruthy();
  expect(event.FORK.args[0]).toEqual('SHARE.SHARE');
})

it("doesn't error if sharing is not on the window", () => {
  const content = { title: "Sample Share" };

  const saga = shareAction();
  saga.next(); // setup

  saga.next({ share: { content }}); // try to share
  // nothing should throw
});


it("should share what is in the store for content", () => {
  const content = { title: "Sample Share" };

  // mock window.socialmessage
  window.socialmessage = {
    send: jest.fn(),
  }

  const saga = shareAction();
  saga.next(); // setup

  let selectActions = saga.next({ share: { content }});
  expect(window.socialmessage.send.mock.calls[0][0]).toEqual(content);
});

it("should remove any image sent currently", () => {
  const content = { title: "Sample Share", image: "cat.gif" };

  // mock window.socialmessage
  window.socialmessage = {
    send: jest.fn(),
  }

  const saga = shareAction();
  saga.next(); // setup

  let selectActions = saga.next({ share: { content }});
  expect(window.socialmessage.send.mock.calls[0][0]).toEqual({ title: "Sample Share" });
});


