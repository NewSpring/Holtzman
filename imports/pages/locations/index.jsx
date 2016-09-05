import { connect } from "react-apollo";
import gql from "apollo-client/gql";

import Layout from "./Layout";

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetCampuses {
        campuses {
          id
          guid
          name
          services
          url
          location {
            street1
            street2
            city
            state
            zip
          }
        }
      }
    `
  },
});

const Template = connect({ mapQueriesToProps })(Layout);

const Routes = [
  {
    path: "/locations",
    component: Template,
  },
];

export default {
  Routes,
};
