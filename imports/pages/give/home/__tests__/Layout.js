
import { ACTIVITY_QUERY } from "../Layout";
import { mount } from "enzyme";
import { mountToJson } from "enzyme-to-json";

describe("giving homepage layout", () => {

  it("should have a consistent data shape", () => {
    expect(ACTIVITY_QUERY).toMatchSnapshot();
  });
});