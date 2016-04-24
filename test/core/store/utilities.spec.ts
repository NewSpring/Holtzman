import { assert } from "chai";

import * as Utilities from "./../../../src/core/store/utilities";

describe("core/store/utilities", () => {

  describe("reducers", () => {

    it("starts empty", () => {
      assert.equal(Object.keys(Utilities.reducers).length, 0);
    });

    it("adds reducers", () => {
      Utilities.addReducer({
        "a": () => { return "return a"; },
        "b": () => { return "return b"; },
      });

      assert.equal(Object.keys(Utilities.reducers).length, 2);
      assert.equal(Utilities.reducers["a"](), "return a");
      assert.equal(Utilities.reducers["b"](), "return b");
    });

    it("throws on non function", () => {
      assert.throws(() => {
        Utilities.addReducer({ "c": null });
      }, "Reducer c requires a function" );
    });

    it("throws on duplicate", () => {
      assert.throws(() => {
        Utilities.addReducer({
          "c": () => { return "return c1"; },
        });
        Utilities.addReducer({
          "c": () => { return "return c2"; },
        });
      }, "reducers function c is already registered" );
    });

  });

  describe("middlewares", () => {
    it("starts empty", () => {
      assert.equal(Utilities.middlewares.length, 0);
    });

    it("adds middleware", () => {
      Utilities.addMiddleware( { a: "a" }, { b: "b" } );
      assert.equal(Utilities.middlewares.length, 2);
      assert.deepEqual(Utilities.middlewares, [
         { a: "a" },
         { b: "b" },
      ]);
    });
  });

  describe("sagas", () => {
    it("starts empty", () => {
      assert.equal(Utilities.sagas.length, 0);
    });

    it("adds sagas", () => {
      Utilities.addSaga( { a: "a" }, { b: "b" } );
      assert.equal(Utilities.sagas.length, 2);
      assert.deepEqual(Utilities.sagas[0](), { a: "a" });
      assert.deepEqual(Utilities.sagas[1](), { b: "b" });
    });
  });

});
