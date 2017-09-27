import PropTypes from 'prop-types';
import gql from "graphql-tag";

import { GraphQL } from "../../data/graphql";
import Split, { Left, Right } from "../../components/@primitives/layout/split";

import ResetPassword from "./reset-password";

const Template = props => {
  const photo = "https://s3.amazonaws.com/ns.assets/apollos/leaves.png";
  return (
    <div>
      <Split nav classes={["background--light-primary"]}>

        <Right
          mobile={false}
          background={photo}
          backgroundFill={false}
          classes={["background--right", "background--bottom"]}
        />


      </Split>
      <Left scroll classes={["background--light-primary"]}>
        {props.children}
      </Left>
    </div>

  );
};

Template.propTypes = {
  children: PropTypes.object.isRequired,
};

const CASH_TAG_QUERY = gql`
  query CashTag($tag: String!) {
    account: accountFromCashTag(cashTag: $tag) {
      name
    }
  }
`;

const matchAccountToCashTag = (location, replaceState, callback) => {
  const url = location.params.splat
    .replace(/\s+/g, "")
    .toLowerCase();

  const [fund, amount] = url.split("/");

  const variables = { tag: fund };

  GraphQL.query({ query: CASH_TAG_QUERY, variables })
    .then(({ data }) => {
      const { account } = data;
      let dest = `/give/campaign/${account.name}`;

      if (amount) dest += `?${account.name}=${amount}`;

      replaceState(null, dest);
      callback();
    });
};

const Routes = [
  {
    path: "/_",
    component: Template,
    childRoutes: [
      { path: "reset-password/:token", component: ResetPassword },
    ],
  },
  {
    path: "/$*",
    onEnter: matchAccountToCashTag,
  },
];

export default {
  Template,
  Routes,
};

export {
  Template,
  CASH_TAG_QUERY,
  matchAccountToCashTag,
};
