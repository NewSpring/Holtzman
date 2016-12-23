import renderer from "react-test-renderer";
import { reset, startBuffering } from "aphrodite/lib/inject";
import moment from "moment";
import Layout from "../Layout";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("Layout", () => {
  it("should render the Recover component if no props are passed", () => {
    const schedules = {
      map: jest.fn(),
    };
    const tree = renderer.create(
      <Layout schedules={schedules} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should render the Remind component if state is set to 'remind'", () => {
    const tree = renderer.create(
      <Layout state={"remind"} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should render the Later component if state is set to 'later'", () => {
    const dateToUse = moment("19740101");
    const tree = renderer.create(
      <Layout state={"later"} reminderDate={dateToUse} />
    );
    expect(tree).toMatchSnapshot();
  });
});