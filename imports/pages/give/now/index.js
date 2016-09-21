import { connect } from "react-apollo";
import gql from "graphql-tag";

import createContainer from "../../../blocks/meteor/react-meteor-data";
import { header as headerActions } from "../../../store";

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

class Page extends Component {
  componentDidMount(){
    if (process.env.NATIVE) {
      const item = {
        title: "Give Now",
      };

      this.props.dispatch(headerActions.set(item));
      this.setState({
        __headerSet: true,
      });
    }

  }

  render() {
    return <Layout {...this.props} />;
  }
}

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
