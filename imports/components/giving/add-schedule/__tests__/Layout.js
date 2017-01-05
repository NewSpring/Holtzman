import { shallow } from "enzyme";
import { shallowToJson }from "enzyme-to-json";
import { reset, startBuffering } from "aphrodite/lib/inject";
import Layout from "../Layout";

beforeEach(() => {
  reset();
  startBuffering();
});

afterEach(() => {
  reset();
});

describe("Layout", () => {
  it("renders when accounts & state exist", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        state={{}}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders null if no accounts exist", () => {
    const tree = shallow(
      <Layout
        state={{}}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders with custom text", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        state={{}}
        text="Make Schedules Now"
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("disables checkout when total is undefined", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        state={{}}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("disables checkout when total is negative", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        state={{}}
        total={-50}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("disables checkout when not ready", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        state={{}}
        ready={false}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });


  it("disables checkout when total is positive but not ready", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        ready={false}
        state={{}}
        total={50}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("enables checkout when total is positive and ready", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        ready={true}
        state={{}}
        total={50}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders the prefilled fund for an existing schedule ", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        existing={{
          details: [{
            account: { name: "Step Up", id: 180}
          }]
        }}
        ready={true}
        state={{}}
        total={50}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders the prefilled date for an existing schedule ", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        existing={{
          next: new Date("2025", "01", "01")
        }}
        ready={true}
        state={{}}
        total={50}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders the prefilled amount for an existing schedule", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        existing={{
          details: [{
            amount: 10
          }]
        }}
        ready={true}
        state={{}}
        total={50}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("renders the prefilled frequency for an existing schedule ", () => {
    const tree = shallow(
      <Layout
        accounts={[{value: "General Fund"}]}
        existing={{
          schedule: {value: "Monthly"}
        }}
        ready={true}
        state={{}}
        total={50}
      />
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
