import { Component } from "react"
import { connect } from "react-apollo";
import gql from "apollo-client/gql";

import {
  accounts as accountsActions,
  nav as navActions,
} from "../../../core/store"

import { avatar } from "../../../core/methods/files/client"

import Layout from "./Layout"

import Menu from "./Menu"
import ChangePassword from "./ChangePassword"
import PersonalDetails from "./PersonalDetails"
import HomeAddress from "./HomeAddress"
import PaymentDetails from "./Payments"

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetPersonForSettings {
        person: currentPerson {
          firstName
          lastName
          nickName
          photo
          home {
            state
            city
          }
        }
      }
    `,
  },
});
@connect({ mapQueriesToProps })
class Template extends Component {

  componentWillMount(){
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  onUpload = (e) => {
    let files = e.target.files

    if (!Meteor.settings.public.rock) {
      return
    }

    var data = new FormData()
    data.append('file', files[0])

    const { baseURL, token, tokenName } = Meteor.settings.public.rock

    fetch(`${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
      method: 'POST',
      headers: { [tokenName]: token },
      body: data
    })
      .then((response) => {
        return response.json()
       })
      .then((id) => {
        avatar(id, (err, response) => {
          updateUser(Meteor.userId(), this.props.dispatch)
        })
      })

    const save = (url) => {
      this.setState({
        photo: url
      })
    }

    for (let file in files) {
      // console.log(files[file])
      let { name } = files[file]
      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = ((theFile) => {
        return (e) => {
          // Render thumbnail.
          return save(e.target.result)
        };
      })(files[file]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[file]);

      break;

    }

  }

  render() {
    const { person } = this.props.data

    let mobile = process.env.WEB;
    if (this.props.location.pathname.split("/").length > 3) {
      mobile = false
    }

    return (
      <Layout person={person || {}} mobile={mobile} onUpload={this.onUpload}>
        {this.props.children}
      </Layout>
    )
  }
}


const Routes = [
  {
    path: "settings",
    component: Template,
    indexRoute: {
      component: Menu
    },
    childRoutes: [
      { path: "change-password", component: ChangePassword },
      { path: "personal-details", component: PersonalDetails },
      { path: "home-address", component: HomeAddress },
      { path: "saved-accounts", component: PaymentDetails },
    ]
  }
]

export default {
  Template,
  Routes
}
