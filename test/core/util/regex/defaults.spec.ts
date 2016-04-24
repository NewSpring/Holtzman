/// <reference path="../../../../typings/main.d.ts" />

import { assert } from "chai";

import Defaults from "./../../../../src/core/util/regex/defaults";

const {
  email,
  bcrypt,
  phoneNumber,
  guid,
  visa,
  mastercard,
  americanExpress,
  discover,
  startOfVisa,
  startOfMastercard,
  startOfAmEx,
  startOfDiscover,
} = Defaults;

describe("Regex defaults", () => {

  it("does email", () => {
    assert.typeOf(email, "regexp");
    assert.notMatch("foo@test", email);
    assert.match("foo@test.com", email);
  });

  it("does bcrypt", () => {
    assert.typeOf(bcrypt, "regexp");
    assert.notMatch("foo@test", bcrypt);
    assert.match("$2a$10$Ym0BHs.vZNj2FVFGFiEIMOWTWvN/AlCaQ7VrK8jOFWllkd732.HEq", bcrypt);
    assert.notMatch("$3a$10$Ym0BHs.vZNj2FVFGFiEIMOWTWvN/AlCaQ7VrK8jOFWllkd732.HEq", bcrypt);
    assert.notMatch("$2a$11$Ym0BHs.vZNj2FVFGFiEIMOWTWvN/AlCaQ7VrK8jOFWllkd732.HEq", bcrypt);
  });

  it("does phone number", () => {
    assert.typeOf(phoneNumber, "regexp");
    assert.notMatch("0123456789", phoneNumber);
    assert.match("1234567890", phoneNumber);
    assert.notMatch("0123456", phoneNumber);
    assert.match("1234567", phoneNumber);
    assert.notMatch("234567", phoneNumber);
    assert.notMatch("567", phoneNumber);
  });

  it("does guid", () => {
    assert.typeOf(guid, "regexp");
    assert.notMatch("866E10AFE5E94D7E8F2E11356D9D91D4", guid);
    assert.match("BFDBF1E5-9E54-46D7-95DF-CF4A6B4429FF", guid);
    assert.match("045834ba-589b-4f75-9bb6-b98da3257203", guid);
    assert.notMatch("2fd9fab741bb40d795dd35bf6b5e7066", guid);
    assert.match("bFDBF1E5-9E54-46D7-95DF-CF4A6B4429FF", guid);
    assert.match("045834ba-589B-4f75-9bb6-b98da3257203", guid);
    assert.notMatch("bFDBF1E5-9E54-46D7-95DF-CF4A6B429FF", guid);
    assert.notMatch("45834ba-589B-4f75-9bb6-b98da3257203", guid);
    assert.notMatch("BFDBG1E5-9E54-46D7-95DF-CF4A6B4429FF", guid);
  });

  it("does visa", () => {
    assert.typeOf(visa, "regexp");
    assert.notMatch("4111", visa);
    assert.notMatch("5105105105105100", visa);
    assert.match("4111111111111111", visa);
    assert.match("4012888888881881", visa);
    assert.match("4222222222222", visa);
  });

  it("does mastercard", () => {
    assert.typeOf(mastercard, "regexp");
    assert.notMatch("5105", mastercard);
    assert.notMatch("4111111111111111", mastercard);
    assert.match("5555555555554444", mastercard);
    assert.match("5105105105105100", mastercard);
    assert.match("5500000000000004", mastercard);
  });

  it("does americanExpress", () => {
    assert.typeOf(americanExpress, "regexp");
    assert.notMatch("3782", americanExpress);
    assert.notMatch("5500000000000004", americanExpress);
    assert.match("340000000000009", americanExpress);
    assert.match("378282246310005", americanExpress);
    assert.match("371449635398431", americanExpress);
    assert.match("378734493671000", americanExpress);
  });

  it("does discover", () => {
    assert.typeOf(discover, "regexp");
    assert.notMatch("6011", discover);
    assert.notMatch("378282246310005", discover);
    assert.match("6011000000000004", discover);
    assert.match("6011111111111117", discover);
    assert.match("6011000990139424", discover);
  });

  it("does startOfVisa", () => {
    assert.typeOf(startOfVisa, "regexp");
    assert.match("4111", startOfVisa);
    assert.notMatch("5105105105105100", startOfVisa);
    assert.match("4111111111111111", startOfVisa);
    assert.match("4012888888881881", startOfVisa);
    assert.match("4222222222222", startOfVisa);
  });

  it("does startOfMastercard", () => {
    assert.typeOf(startOfMastercard, "regexp");
    assert.match("5105", startOfMastercard);
    assert.notMatch("4111111111111111", startOfMastercard);
    assert.match("5555555555554444", startOfMastercard);
    assert.match("5105105105105100", startOfMastercard);
    assert.match("5500000000000004", startOfMastercard);
  });

  it("does startOfAmEx", () => {
    assert.typeOf(startOfAmEx, "regexp");
    assert.match("3782", startOfAmEx);
    assert.notMatch("5500000000000004", startOfAmEx);
    assert.match("340000000000009", startOfAmEx);
    assert.match("378282246310005", startOfAmEx);
    assert.match("371449635398431", startOfAmEx);
    assert.match("378734493671000", startOfAmEx);
  });

  it("does startOfDiscover", () => {
    assert.typeOf(startOfDiscover, "regexp");
    assert.match("6011", startOfDiscover);
    assert.notMatch("378282246310005", startOfDiscover);
    assert.match("6011000000000004", startOfDiscover);
    assert.match("6011111111111117", startOfDiscover);
    assert.match("6011000990139424", startOfDiscover);
  });
});
