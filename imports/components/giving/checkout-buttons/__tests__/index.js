
import { Component } from "react";
import { print } from "graphql-tag/printer";
import { graphql } from "react-apollo";
import { MockedProvider } from "react-apollo/test-utils";
import { addTypenameToDocument } from "apollo-client";

import { mount } from "enzyme";

import { withSavedPayments, SAVED_ACCTS_QUERY } from "../";

it("has a known query shape", () => {
  expect(print(SAVED_ACCTS_QUERY)).toMatchSnapshot();
});

describe("graphql integration", () => {
  // XXX mocking react-apollo causes errors when using it later
  // let calls;
  // beforeEach(() => {
  //   calls = graphql.mock.calls[graphql.mock.calls.length - 1];
  // });

  // afterEach(() => {
  //   calls = undefined;
  // });

  // it("uses the known query", () => {
  //   expect(calls[0]).toEqual(SAVED_ACCTS_QUERY);
  // });

  // it("has a prop location of `savedPayments`", () => {
  //   expect(calls[1].name).toBe("savedPayments");
  // });

  // it("passes variables correctly", () => {
  //   const options = calls[1].options;

  //   const calculatedOptions = options();

  //   expect(calculatedOptions.variables).toEqual({
  //     cache: false,
  //   });
  // });

  it("correctly delivers props to child component", (done) => {

    const query = addTypenameToDocument(SAVED_ACCTS_QUERY);
    const variables = { cache: false };

    const mockedData = {
      savedPayments: null,
    };


    class Foo extends Component {
      componentWillReceiveProps({ savedPayments: { loading, savedPayments }}) {
        expect(loading).toBe(false);
        expect(savedPayments).toBe(null);
        done();
      }
      render() {
        return null;
      }
    }

    const DummyComponent = withSavedPayments(Foo);

    const wrapper = mount(
      <MockedProvider mocks={[
        { request: { query, variables }, result: { data: mockedData } }
      ]}>
        <DummyComponent />
      </MockedProvider>
    );


  });

  it("correctly delivers props to child component", (done) => {

    const query = addTypenameToDocument(SAVED_ACCTS_QUERY);
    const variables = { cache: false };

    const mockedData = {
      savedPayments: [],
    };


    class Foo extends Component {
      componentWillReceiveProps({ savedPayments: { loading, savedPayments }}) {
        expect(loading).toBe(false);
        expect(savedPayments).toEqual(mockedData.savedPayments);
        done();
      }
      render() {
        return null;
      }
    }

    const DummyComponent = withSavedPayments(Foo);

    const wrapper = mount(
      <MockedProvider mocks={[
        { request: { query, variables }, result: { data: mockedData } }
      ]}>
        <DummyComponent />
      </MockedProvider>
    );

  });

  xit("correctly delivers props to child component", (done) => {

    const query = addTypenameToDocument(SAVED_ACCTS_QUERY);
    const variables = { cache: false };

    const mockedData = {
      savedPayments: [
        {
          name: "Gold Card",
          id: 10,
          date: "date",
          __typename: "SavedPayment",
          payment: {
            accountNumber: "4111111111111111",
            paymentType: "Visa",
            __typename: "Card"
          }
        }
      ],
    };


    class Foo extends Component {
      componentWillReceiveProps({ savedPayments: { loading, savedPayments }}) {
        expect(loading).toBe(false);
        expect(savedPayments).toEqual(mockedData.savedPayments);
        expect(savedPayments).toMatchSnapshot();
        done();
      }
      render() {
        return null;
      }
    }

    const DummyComponent = withSavedPayments(Foo);

    const wrapper = mount(
      <MockedProvider mocks={[
        { request: { query, variables }, result: { data: mockedData } }
      ]}>
        <DummyComponent />
      </MockedProvider>
    );

  });
});

describe("redux implementation", () => {
  it("only uses mapStateToProps");
  it("correctly formats the shape to include authorized");
  it("correctly formats the shape to include savedAccount");
});

describe("CheckoutButtons", () => {
  it("has a default state");
  describe("onClick", () => {
    it("takes an event");
    it("fires an onClick function if provided");
    it("can stop execution if onClick tells it to");

    it("dispatches setting transactionType");
    it("stores savedPayment if it exists");

    it("handles a logged in user when input isn't disabled");
    it("handles a logged out user");

    it("sets the nav to modal");
  });

  describe("giveAsGuest", () => {
    it("returns early if disabled");
    it("dispatches correct actions");
  });
});
