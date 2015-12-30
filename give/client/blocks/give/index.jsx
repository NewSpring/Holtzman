import { Component, PropTypes} from "react"
import ReactDom from "react-dom";
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { goBack } from "redux-router"

import { Controls, Forms } from "../../../../core/client/components"
import { People } from "../../../../rock/lib/collections"

import { give as giveActions } from "../../actions"
import { Personal, Payment, Billing, Confirm} from "./fieldsets"


// We only care about the give state
const map = (state) => ({ give: state.give })

@connect(map, giveActions)
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

    const mappedPerson = {
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

    const inputs = this.refs.inputs
    if (inputs) {

      for (let ref in inputs.refs) {
        if (inputs.refs[ref].setValue && mappedPerson[ref]) {
          inputs.refs[ref].setValue(mappedPerson[ref])
          inputs.refs[ref].validate()
        }

      }

    } else {
      setTimeout(() => {
        this.updateInputs(person)
      }, 100)
    }


  }

  componentDidUpdate(prevProps) {

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

    if (this.props.give.step === 2) {
      this.submitPersonalDetails()
    }

    if (this.props.give.step === 3) {
      this.submitPaymentDetails()
    }

    this.props.next()
  }

  back = (e) => {
    e.preventDefault()

    this.props.previous()
  }

  submitPersonalDetails = () => {
    const { data, transaction, total } = this.props.give

    let joinedData = {
      amount: total,
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

      console.log(err, url)
    })

  }

  submitPaymentDetails = () => {

    const { postUrl } = this.state
    const form = ReactDOM.findDOMNode(this.refs["form"])

    // const next = this.props.next
    fetch(postUrl, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors"
    })
    .then((response) => {
      // next()
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
      step,
      transactions
    } = this.props.give

    const {
      save, clear
    } = this.props

    let Step;

    switch (step) {
      case 4:
        Step = Confirm
        break;
      case 3:
        Step = Payment
        break;
      case 2:
        Step = Billing
        break;
      default:
        Step = Personal
    }

    return (

      <Forms.Form
        id="give"
        theme="hard"
        fieldsetTheme="flush soft-top"
        ref="form"
        method="POST"
        action={this.state.postUrl}
        submit={this.completePurchase}
      >

        <Step
          data={data}
          transactions={transactions}
          save={save}
          errors={errors}
          clear={clear}
          next={this.next}
          back={this.back}
          ref="inputs"
        >
          <Controls.Progress
            steps={4}
            active={step}
          />
        </Step>


      </Forms.Form>
    )
  }
}
