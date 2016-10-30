
import {
  delay,
} from "../";

describe("delay", () => {
  it("delays a result", () => {
    let success = false;
    setTimeout(() => { success = true }, 10);
    return delay(11).then(() => {
      expect(success).toBe(true);
    });
  });
});

