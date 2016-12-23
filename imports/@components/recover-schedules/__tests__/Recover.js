import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

import Recover, { RecoverableSchedule } from "../Recover";

describe("Recover", () => {
  it("should give default info if no props are passed", () => {
    const schedules = {
      map: jest.fn(),
    };

    const tree = shallow(
      <Recover schedules={schedules} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe("RecoverableSchedule", () => {
  it("should test the RecoverableSchedule", () => {
    const amount="1.00";
    const account="Test Account";
    const frequency="Weekly";

    const tree = shallow(
      <RecoverableSchedule amount={amount} account={account} frequency={frequency} />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});