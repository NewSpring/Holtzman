/// <reference path="../../../../typings/main.d.ts" />

import { assert } from "chai";

import Defaults from "./../../../../src/core/util/regex/defaults";

const {
  email,
} = Defaults;

describe("Regex defaults", () => {

  describe("email", () => {

    it("is a valid regex", () => {
      assert.typeOf(email, "regexp");
    });

    it("correctly matches a valid email", () => {
      const address = "foo@test.com";

      assert.match(address, email);
    });

    it("does not match an invalid email", () => {
      const address = "foo@test";

      assert.notMatch(address, email);
    });

  });
});
