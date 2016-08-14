import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import ReactMixin from "react-mixin"
import gql from "graphql-tag";
import { createContainer } from "../../../core/blocks/meteor/react-meteor-data";

import Layout from "./Layout"

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
    `
  }
});


@connect({ mapQueriesToProps })
class Template extends Component {
  componentDidMount(){
    setTimeout(() => {
      throw new Error("Auto bound to sentry!");
    }, 1000)

  }
  render () { return <Layout {...this.props} />; }
}

// Bind reactive data to component
const TemplateWithData = createContainer(() => {
  let alive = true;
  try {  alive = serverWatch.isAlive("ROCK"); } catch (e) {}
  return { alive };
}, Template);


const Routes = [
  { path: "now", component: TemplateWithData }
]

export default {
  Template,
  Routes
}
