import gql from "graphql-tag";

import { GraphQL } from "../../graphql";
import Split, { Left, Right } from "../../blocks/split";

import ResetPassword from "./reset-password";

const Template = (props) => {
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
    onEnter: (location, replaceState, callback) => {
      const url = location.params.splat
        .replace(/\s+/g, "")
        .toLowerCase();

      const [fund, amount] = url.split("/");

      const query = gql`
        query CashTag($tag: String!) {
          account: accountFromCashTag(cashTag: $tag) {
            name
          }
        }
      `;
      const variables = { tag: fund };

      GraphQL.query({ query, variables })
        .then(({ data }) => {
          const { account } = data;
          let dest = `/give/campaign/${account.name}`;

          if (amount) dest += `?${account.name}=${amount}`;

          replaceState(null, dest);
          callback();
        });
    },
  },
];

export default {
  Template,
  Routes,
};
