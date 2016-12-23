
import { initial as blankState } from "../../reducer";

const initial = {...blankState, ...{
  data: {
    personal: {
      firstName: "James", // String
      lastName: "Baxley", // String
      email: "james.baxley@newspring.cc", // String
      campus: "Anderson", // String
      campusId: 1, // Number
    },
    billing: {
      streetAddress: "1 Linwa Blvd", // String
      streetAddress2: null, // String
      city: "Anderson", // String
      state: "SC", // String
      zip: 29621, // Number
      country: "USA", // String
    },
  },
}}

import formatPersonDetails from "../formatPersonDetails";

it("returns a default shape with inital state data", () => {
  expect(formatPersonDetails({ ...initial })).toMatchSnapshot();
});

describe("schedule shapes", () => {
  it("handles a one-time gift", () => {
    const data = {
      ...initial,
      transactions: { 1: { value: 10 } },
      schedule: {
        start: "20200101", payments: null, frequency: "One-Time"
      }
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });

  it("handles a one-time gift with two funds", () => {
    const data = {
      ...initial,
      transactions: { 1: { value: 10 }, 10: { value: 11 } },
      schedule: {
        start: "20200101", payments: null, frequency: "One-Time"
      }
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });

  it("handles a weekly gift", () => {
    const data = {
      ...initial,
      transactions: { 1: { value: 10 } },
      schedule: {
        start: "20200101", payments: null, frequency: "Weekly"
      }
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });

  it("handles a bi-weekly gift", () => {
    const data = {
      ...initial,
      transactions: { 1: { value: 10 } },
      schedule: {
        start: "20200101", payments: null, frequency: "Bi-Weekly"
      }
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });

  it("handles a monthly gift", () => {
    const data = {
      ...initial,
      transactions: { 1: { value: 10 } },
      schedule: {
        start: "20200101", payments: null, frequency: "Monthly"
      }
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });

});

describe("regular transactions", () => {
  it("handles a single fund gift", () => {
    const data = {
      ...initial,
      transactions: { 1: { label: "General Fund", value: 10 } },
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });

  it("handles multiple fund gifts", () => {
    const data = {
      ...initial,
      transactions: {
        1: { label: "General Fund", value: 10 },
        2: { label: "Tesla Fund", value: 100000000 }
      },
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });
});

describe("savedAccount", () => {
  it("adds saved account info without a name", () => {
    const data = {
      ...initial,
      savedAccount: { id: 4 }
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });

  it("adds saved account info with a name", () => {
    const data = {
      ...initial,
      savedAccount: { id: 4, name: "TEST" },
    };
    expect(formatPersonDetails(data)).toMatchSnapshot();
  });
});
