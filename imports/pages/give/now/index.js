import { connect } from "react-apollo";
import gql from "graphql-tag";

import createContainer from "../../../blocks/meteor/react-meteor-data";

import Layout from "./Layout";

const mapQueriesToProps = () => ({
  accounts: {
    query: gql`
      query GetFinancialAccounts {
        accounts {
          description
          name
          id: entityId
          summary
          image
          order
          images { fileName, fileType, fileLabel, s3, cloudfront }
        }
      }
    `,
  },
});

// Bind reactive data to component
const TemplateWithData = createContainer(() => {
  let alive = true;
  try { alive = serverWatch.isAlive("ROCK"); } catch (e) { /* do nothing */ }
  return { alive };
},
  connect({ mapQueriesToProps })(props => <Layout {...props} />)
);


const Routes = [
  { path: "now", component: TemplateWithData },
];

export default {
  TemplateWithData,
  Routes,
};
