import { assert } from "chai";

import * as Utilities from "./../../../src/core/store/utilities";

describe("core/store/utilities", () => {

  describe("addReducer", () => {

    it("exists", () => {
      assert.isFunction(Utilities.addReducer);
    });

  });

});
