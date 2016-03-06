import { Component } from "react"
import { connect } from "react-redux"

import { onBoard as onBoardActions, nav as navActions } from "../../../core/store"
import { avatar } from "../../../core/methods/files/client"
import { GraphQL } from "../../../core/graphql"

import Layout from "./Layout"

import Menu from "./Menu"
import ChangePassword from "./ChangePassword"
import PersonalDetails from "./PersonalDetails"
import HomeAddress from "./HomeAddress"
import PaymentDetails from "./Payments"


function updateUser(id, dispatch) {
  let personQuery = `
    {
      person(mongoId: "${id}", cache: false) {
        age
        birthdate
        birthDay
        birthMonth
        birthYear
        campus {
          name
          shortCode
          id
        }
        home {
          city
          country
          id
          zip
          state
          street1
          street2
        }
        firstName
        lastName
        nickName
        email
        phoneNumbers {
          number
          formated
        }
        photo
      }
    }
  `

  return GraphQL.query(personQuery)
    .then((person) => {
      dispatch(onBoardActions.person(person.person))
    })
}

const map = (state) => ({ person: state.onBoard.person })

@connect(map)
class Template extends Component {

  // we need to fork react-router-ssr to allow cascading
  // fetch datas
  static fetchData(getStore, dispatch) {

    let id = Meteor.userId()

    if (id) {
      return updateUser(id, dispatch)
    }

  }

  componentDidMount(){
    const { dispatch } = this.props
    let id = Meteor.userId()

    if (id) {
      return updateUser(id, dispatch)
    }
    
  }

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
    const { person } = this.props
    let { photo } = person
    // photo = photo ? `//core-rock.newspring.cc/${photo}` : null
    let mobile = true

    if (this.props.location.pathname.split("/").length > 3) {
      mobile = false
    }
    return (
      <Layout photo={photo} person={person} mobile={mobile} onUpload={this.onUpload}>
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
