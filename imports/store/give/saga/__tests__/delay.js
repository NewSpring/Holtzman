
import {
  delay,
} from "../";

describe("delay", () => {
  it("delays a result", async () => {
    let success = false;
    setTimeout(() => { success = true }, 10);
    await delay(11);
    expect(success).toBe(true);
  });
});

