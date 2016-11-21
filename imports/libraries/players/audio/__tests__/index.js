import { Meteor } from "meteor/meteor";
import Audio, { addMediaListeners } from "../";

Meteor.isCordova = true;

it("sets up event listeners if cordova", () => {
  global.Media = {
    prototype: {},
  };
  document.addEventListener = jest.fn();
  addMediaListeners();
  expect(document.addEventListener).toHaveBeenCalledTimes(1);
  expect(document.addEventListener.mock.calls[0][0]).toBe("deviceready");
  // simulatate listener callback
  document.addEventListener.mock.calls[0][1]({});
  expect(global.Media.prototype.timeupdate).toBeTruthy();
  expect(global.Media.prototype.ended).toBeTruthy();
  expect(global.Media.prototype.playPause).toBeTruthy();
});

it("timeupdate does nothing if positions < 0", () => {
  global.Media = {
    prototype: {},
  };
  global.setInterval = jest.fn();
  document.addEventListener = jest.fn();
  addMediaListeners();
  // simulatate listener callback
  document.addEventListener.mock.calls[0][1]({});
  const mockCallback = jest.fn();
  const mockThis = {
    getCurrentPosition: jest.fn(),
  };
  global.Media.prototype.timeupdate.call(mockThis, mockCallback);
  expect(global.setInterval).toHaveBeenCalledTimes(1);
  // simulate interval
  global.setInterval.mock.calls[0][0]();
  expect(mockThis.getCurrentPosition).toHaveBeenCalledTimes(1);
  // simulate getCurrentPosition callback with position
  mockThis.getCurrentPosition.mock.calls[0][0](-1);
  expect(mockCallback).not.toHaveBeenCalled();
});

it("timeupdate calls back with positions > -1", () => {
  global.Media = {
    prototype: {},
  };
  global.setInterval = jest.fn();
  document.addEventListener = jest.fn();
  addMediaListeners();
  // simulatate listener callback
  document.addEventListener.mock.calls[0][1]({});
  const mockCallback = jest.fn();
  const mockThis = {
    getCurrentPosition: jest.fn(),
  };
  global.Media.prototype.timeupdate.call(mockThis, mockCallback);
  expect(global.setInterval).toHaveBeenCalledTimes(1);
  // simulate interval
  global.setInterval.mock.calls[0][0]();
  expect(mockThis.getCurrentPosition).toHaveBeenCalledTimes(1);
  // simulate getCurrentPosition callback with position
  mockThis.getCurrentPosition.mock.calls[0][0](20);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

it("ended pushes callback to endedCallbacks", () => {
  global.Media = {
    prototype: {},
  };
  document.addEventListener = jest.fn();
  addMediaListeners();
  // simulatate listener callback
  document.addEventListener.mock.calls[0][1]({});
  const mockCallback = jest.fn();
  const mockThis = {
    endedCallbacks: [],
  };
  global.Media.prototype.ended.call(mockThis, mockCallback);
  expect(mockThis.endedCallbacks[0]).toEqual(mockCallback);
});

it("ended pushes callback to endedCallbacks even if doensn't exist already", () => {
  global.Media = {
    prototype: {},
  };
  document.addEventListener = jest.fn();
  addMediaListeners();
  // simulatate listener callback
  document.addEventListener.mock.calls[0][1]({});
  const mockCallback = jest.fn();
  const mockThis = {};
  global.Media.prototype.ended.call(mockThis, mockCallback);
  expect(mockThis.endedCallbacks[0]).toEqual(mockCallback);
});

it("playPause calls pause and sets isPlaying to false if playing", () => {
  global.Media = {
    prototype: {},
  };
  document.addEventListener = jest.fn();
  addMediaListeners();
  // simulatate listener callback
  document.addEventListener.mock.calls[0][1]({});
  const mockCallback = jest.fn();
  const mockThis = {
    pause: jest.fn(),
    isPlaying: true,
  };
  global.Media.prototype.playPause.call(mockThis, mockCallback);
  expect(mockThis.pause).toHaveBeenCalledTimes(1);
  expect(mockThis.isPlaying).toBe(false);
});

it("playPause calls play and sets isPlaying to true if not playing", () => {
  global.Media = {
    prototype: {},
  };
  document.addEventListener = jest.fn();
  addMediaListeners();
  // simulatate listener callback
  document.addEventListener.mock.calls[0][1]({});
  const mockCallback = jest.fn();
  const mockThis = {
    play: jest.fn(),
    isPlaying: false,
  };
  global.Media.prototype.playPause.call(mockThis, mockCallback);
  expect(mockThis.play).toHaveBeenCalledTimes(1);
  expect(mockThis.isPlaying).toBe(true);
});
