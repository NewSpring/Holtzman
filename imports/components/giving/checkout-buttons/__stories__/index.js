/* eslint-disable */
import { Meteor } from "meteor/meteor";
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';
import withReadme from "storybook-readme/with-readme";
import backgrounds from "react-storybook-addon-backgrounds";

import { MockedProvider } from "react-apollo/lib/test-utils";
import { addTypenameToDocument } from "apollo-client/queries/queryTransform";

import Provider, { ReduxProvider } from "/.storybook/mocks/Provider";

import centered from "/.storybook/decorators/centered";
import defaultColors from "/.storybook/defaults";

import Readme from "../README.md";
import CheckoutButtons, { SAVED_ACCTS_QUERY } from "../";

const story = storiesOf("CheckoutButtons", module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addDecorator(backgrounds(defaultColors("light-primary", "light-secondary")))
  ;

// We don't use description quite yet. As such, it's not really styled.
// So let's not pass it on this story.
// description={text("description", "MiniCard description")}

story
  .add("Without a Card", withReadme(Readme, () => {
    const query = SAVED_ACCTS_QUERY;
    const variables = { cache: false };

    const mockedData = {
      savedPayments: [],
    };

    const status = boolean("Sign In", false);
    Meteor.userId = () => status;

    // This actually makes the request to graphql and loads the full
    // redux store
    return (
      <Provider>
        <CheckoutButtons
          authorized={status}
          disabledGuest={boolean("Disable Guest", false)}
        />
      </Provider>
    );
  }))
  .add("With a Card", withReadme(Readme, () => {
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

    Meteor.userId = () => true;

    // this mocks the graphql endpoint with fake data
    return (
      <MockedProvider mocks={[
        { request: { query, variables }, result: { data: mockedData } }
      ]}>
        <ReduxProvider>
          <CheckoutButtons />
        </ReduxProvider>
      </MockedProvider>
    );
  }));
