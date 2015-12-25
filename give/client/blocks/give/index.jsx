import { Component, PropTypes} from "react"
import ReactDom from "react-dom";
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { goBack } from "redux-router"

import { Controls, Forms } from "../../../../core/client/components"
import { People } from "../../../../rock/lib/collections"

import { give as giveActions } from "../../actions"
import { Personal, Payment, Billing } from "./fieldsets"


// We only care about the give state
function mapStateToProps(state) {
  return {
    give: state.give
  }
}



@connect(mapStateToProps, giveActions)
@ReactMixin.decorate(ReactMeteorData)
export default class Give extends Component {

  state = {
    postUrl: null
  }
  setData = false

  getMeteorData(){

    let person = null
    const user = Meteor.user()
    if (user) {
      Meteor.subscribe("people")
      person = People.findOne()
    }

    if (person && (this.setData === false)) {
      this.setData = true
      this.updateInputs(person)
    }

    return {
      person
    }
  }

  updateInputs = (person) => {
    person || (person = this.data.person)

    let { Campus, Home } = person
    Campus || (Campus = {})
    Home || (Home = {})

    person = {
      firstName: person.FirstName,
      lastName: person.LastName,
      email: person.Email,
      campus: Campus.Name,
      streetAddress: Home.Street1,
      streetAddress2: Home.Street2,
      city: Home.City,
      state: Home.State,
      zip: Home.PostalCode
    }

    const { inputs } = this.refs

    if (inputs) {

      for (let ref in inputs.refs) {

        if (inputs.refs[ref].setValue && person[ref]) {
          inputs.refs[ref].setValue(person[ref])
          inputs.refs[ref].validate()
        }

      }
    }


  }

  componentDidUpdate(prevProps) {

    // temp testing place
    if (this.props.give.step === 3 && !this.state.postUrl) {
      const { data, transaction } = this.props.give

      let joinedData = {
        amount: transaction.total + (Math.floor((Math.random() * 100) + 1)), // for test
        billing: {
          "first-name": data.personal.firstName,
          "last-name": data.personal.lastName,
          email: data.personal.email,
          address1: data.billing.streetAddress,
          address2: data.billing.streetAddress2 || "",
          city: data.billing.city,
          state: data.billing.state,
          postal: data.billing.zip
        }
      }

      Meteor.call("Give.order", joinedData, (err, url) => {
        if (!err) {
          this.setState({ postUrl: url})
        }
      })
    }


    if (this.props.give.step > prevProps.give.step) {
      this.updateInputs()
    }
  }

  goBack = (e) => {
    e.preventDefault();
    goBack()
  }

  next = (e) => {
    e.preventDefault()
    this.props.next()
  }

  back = (e) => {
    e.preventDefault()

    this.props.previous()
  }

  submit = (e) => {
    e.preventDefault()

    const { postUrl } = this.state
    const form = ReactDOM.findDOMNode(this.refs["form"])

    const next = this.props.next
    fetch(postUrl, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors"
    })
    .then((response) => {
      next()
    })
    .catch((e) => {
      console.log(e)
    })

  }

  completePurchase = (e) => {
    e.preventDefault()
    let segments = this.state.postUrl.split("/")
    const token = segments.pop()
    Meteor.call("Give.charge", token, (err, response) => {
      console.log(err, response)
    })
  }

  render () {
    const {
      data,
      errors,
      step
    } = this.props.give

    const {
      save, clear
    } = this.props

    return (

      <Forms.Form
        id="give"
        theme="hard"
        fieldsetTheme="flush soft-top"
        ref="form"
        method="POST"
        action={this.state.postUrl}
        submit={this.submit}
      >
      {() => {
        switch (step) {
          case 4:
            return (
              <div>
                <button onClick={this.completePurchase}>Complete Purchase</button>
              </div>
            )
          case 3:
            return (
              <Payment
                data={data}
                save={save}
                errors={errors}
                clear={clear}
                next={this.next}
                back={this.back}
                ref="inputs"
              />
            )
            break;
          case 2:
            return (
              <Billing
                data={data}
                save={save}
                errors={errors}
                clear={clear}
                next={this.next}
                back={this.back}
                ref="inputs"
              />
            )
            break;
          case 1:
          default:
            return (
              <Personal
                data={data}
                save={save}
                errors={errors}
                clear={clear}
                next={this.next}
                back={this.back}
                ref="inputs"
              />
            )
            break;

        }

      }()}

      </Forms.Form>
    )
  }
}
