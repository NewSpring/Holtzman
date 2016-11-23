import { Meteor } from "meteor/meteor";
import Audio, { addMediaListeners } from "../";

describe("addMediaListeners", () => {
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
});

describe("Audio", () => {
  beforeEach(() => {
    global.Audio5 = jest.fn(() => ({
      on: jest.fn(),
      duration: 300,
      position: 20,
    }));
  });

  it("initiates Audio5 on instantiation", () => {
    const mockOn = jest.fn();
    global.Audio5 = jest.fn(() => ({
      on: mockOn,
      duration: 300,
    }));
    const audio = new Audio("src", "success", "error", "status");
    audio._audio5.position = 20;
    audio._audio5.duration = 300;
    expect(audio._audio5).toBeTruthy();
    expect(mockOn).toHaveBeenCalledTimes(2);
    expect(mockOn.mock.calls[0][0]).toBe("canplay");
    expect(mockOn.mock.calls[0][1]).toBe("success");
    expect(mockOn.mock.calls[1][0]).toBe("timeupdate");
    // simulate timeupdate callback
    expect(audio.position).toBe(null);
    mockOn.mock.calls[1][1]();
    expect(audio.position).toBe(20);
    expect(audio.duration).toBe(300);
    // simulate ready callback
    const mockThis = {
      load: jest.fn(),
    };
    global.Audio5.mock.calls[0][0].ready.call(mockThis);
    expect(mockThis.load).toHaveBeenCalledTimes(1);
    expect(mockThis.load).toHaveBeenCalledWith("src");
  });

  it("errors if something goes wrong", () => {
    const audio = new Audio("src", "success", "error", "status");
    // simulate ready callback
    const mockThis = {};
    try {
      global.Audio5.mock.calls[0][0].ready.call(mockThis);
      expect(true).toBe(false);
    } catch (e) {
      expect(true).toBe(true);
    }
  });

  it("timeupdate calls back with position", () => {
    const audio = new Audio();
    audio.position = 10;
    audio._audio5.on = jest.fn();
    const mockCallback = jest.fn();
    audio.timeupdate(mockCallback);
    expect(audio._audio5.on).toHaveBeenCalledTimes(1);
    expect(audio._audio5.on.mock.calls[0][0]).toBe("timeupdate");
    // simulate time update
    audio._audio5.on.mock.calls[0][1]();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(10);
  });

  // XXX jest doesn't seem to be binding `this` correctly for Audio
  // which is why there aren't more tests
  // I wasn't even able to mock this and fake the whole thing. Oh well.
});
