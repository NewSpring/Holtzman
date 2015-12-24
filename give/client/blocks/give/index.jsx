import { Component, PropTypes} from "react"
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

  setData = false

  getMeteorData(){

    let person = null
    const user = Meteor.user()
    if (user) {
      Meteor.subscribe("people")
      person = People.findOne()
    }

    console.log(person)

    if (person && (this.setData === false)) {
      this.updateInputs(person)
      this.setData = true
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

    const { form } = this.refs

    if (form) {

      for (let ref in form.refs) {

        if (form.refs[ref].setValue && person[ref]) {
          form.refs[ref].setValue(person[ref])
          form.refs[ref].validate()
        }

      }
    }


  }

  componentDidUpdate(prevProps) {

    // temp testing place
    if (this.props.give.step === 3) {
      console.log("fire test post")
      const { data, transaction } = this.props.give

      let joinedData = {
        amount: transaction.total + 1, // for test
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

      Meteor.call("Give.NMI.Step1", joinedData, (err, url) => {
        console.log(err, url)
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
      >
      {() => {
        switch (step) {
          case 3:
            return (
              <Payment
                data={data}
                save={save}
                errors={errors}
                clear={clear}
                next={this.next}
                back={this.back}
                ref="form"
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
                ref="form"
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
                ref="form"
              />
            )
            break;

        }

      }()}

      </Forms.Form>
    )
  }
}
