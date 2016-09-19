import { Component } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import {
  accounts as accountsActions,
  nav as navActions,
} from "../../../store";

import withProfileUpload from "../profile-photo";

import Layout from "./Layout";

import Menu from "./Menu";
import ChangePassword from "./ChangePassword";
import PersonalDetails from "./PersonalDetails";
import HomeAddress from "./HomeAddress";
import PaymentDetails from "./Payments";

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetPersonForSettings {
        person: currentPerson(cache: false) {
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
@withProfileUpload
@connect({ mapQueriesToProps })
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
  }

  onUpload = (e) => {
<<<<<<< af9dad8f18cc2439eddcf93cec4b6bf310851530
    this.props.upload(e).then(() => this.props.data.refetch())
=======
    const files = e.target.files;

    if (!Meteor.settings.public.rock) {
      return;
    }

    const data = new FormData();
    data.append("file", files[0]);

    const { baseURL, token, tokenName } = Meteor.settings.public.rock;

    fetch(`${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
      method: "POST",
      headers: { [tokenName]: token },
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((id) => {
        avatar(id, (err, response) => {
          updateUser(Meteor.userId(), this.props.dispatch);
        });
      });

    const save = (url) => {
      this.setState({
        photo: url,
      });
    };

    for (const file in files) {
      // console.log(files[file])
      const { name } = files[file];
      const reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = ((theFile) => {
        return (e) => {
          // Render thumbnail.
          return save(e.target.result);
        };
      })(files[file]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[file]);

      break;
    }
>>>>>>> lint fix yayayayay
  }

  render() {
    const { photo } = this.props;
    const { person } = this.props.data;

    let mobile = process.env.WEB;
    if (this.props.location.pathname.split("/").length > 3) {
      mobile = false;
    }

    if (photo) person.photo = photo;
    return (
      <Layout person={person || {}} mobile={mobile} onUpload={this.onUpload}>
        {this.props.children}
      </Layout>
    );
  }
}


const Routes = [
  {
    path: "settings",
    component: Template,
    indexRoute: {
      component: Menu,
    },
    childRoutes: [
      { path: "change-password", component: ChangePassword },
      { path: "personal-details", component: PersonalDetails },
      { path: "home-address", component: HomeAddress },
      { path: "saved-accounts", component: PaymentDetails },
    ],
  },
];

export default {
  Template,
  Routes,
};
