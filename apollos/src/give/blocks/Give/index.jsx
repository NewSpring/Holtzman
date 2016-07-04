import { Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import { connect } from "react-apollo";
import gql from "apollo-client/gql";
import Moment from "moment"

import { Controls, Forms } from "../../../core/components";
import OnBoard from "../../../core/blocks/accounts";
import { modal } from "../../../core/store";


import { give as giveActions } from "../../store"

import { Personal, Payment, Billing, Confirm} from "./fieldsets"
import Loading from "./Loading"
import Err from "./Err"
import Success from "./Success"

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      fragment DefinedValues on DefinedValue {
        name: description
        value
        id
        _id
      }

      query GetCheckoutData($state: Int!, $country: Int!) {
        states: definedValues(id: $state, all: true) {
          ...DefinedValues
        }
        countries: definedValues(id: $country, all: true) {
          ...DefinedValues
        }
        person: currentPerson {
          firstName
          nickName
          lastName
          email
          campus {
            name
          }
          home {
            street1
            street2
            city
            state
            zip
            country
          }
        }
        savedPayments {
          name
          id
          date
          payment {
            accountNumber
            paymentType
          }
        }
        campuses {
          name
        }
      }
    `,
    variables: { state: 28, country: 45 }
  }
});
const defaultArray = []; // empty array for usage as default in render
// We only care about the give state
const mapStateToProps = (state) => ({
  give: state.give,
});

@connect({ mapStateToProps, mapQueriesToProps })
export default class Give extends Component {

  componentWillMount() {
    this.updateData()

    const { savedAccount } = this.props.give
    if (!savedAccount.id) return;

    this.props.dispatch(giveActions.setProgress(4))
  }

  componentWillUnmount(){
    if (this.props.give.state != "default") {
      this.props.dispatch(giveActions.clearData())
      this.props.dispatch(giveActions.clearSchedules())
    }
  }

  updateData = () => {

    const { data } = this.props
    if (data.loading || !data.person) return;

    const { person } = data;

    let { campus, home } = person
    campus || (campus = {})
    home || (home = {})

    const mappedPerson = {
      personal: {
        firstName: person.nickName || person.firstName,
        lastName: person.lastName,
        email: person.email,
        campus: campus.name
      },
      billing: {
        streetAddress: home.street1,
        streetAddress2: home.street2,
        city: home.city,
        state: home.state,
        zip: home.zip,
        country: home.country
      }
    }

    this.props.dispatch(giveActions.save(mappedPerson))

  }

  onSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(giveActions.submit())
  }

  goBack = (e) => {
    e.preventDefault();
    if (typeof window != "undefined" && window != null) {
      window.history.back()
    }

  }

  next = (e) => {
    e.preventDefault()
    this.props.dispatch(giveActions.next())
  }

  goToStepOne = (e) => {
    e.preventDefault()
    this.props.dispatch(giveActions.clearAccount())
    this.props.dispatch(giveActions.setState("default"))
    this.props.dispatch(giveActions.setProgress(1))
  }

  changeSavedAccount = (account) => {
    this.props.dispatch(giveActions.setAccount(account))
  }

  back = (e) => {
    e.preventDefault()
    if (this.props.give.step === 1) {
      this.props.dispatch(modal.hide())
      return
    }

    this.props.dispatch(giveActions.previous())
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`
    }

    if (!value.length) {
      return `$0.00`
    }

    value = value.replace(/[^\d.-]/g, "")

    let decimals = value.split(".")[1]
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2)
      value = String(value)
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `$${value}`
  }

  goToaccounts = () => {
    const { data } = this.props.give

    let props = {
      coverHeader: true,
      account: false,
      data: {
        email: data.personal.email,
        firstName: data.personal.firstName,
        lastName: data.personal.lastName,
        terms: true
      }
    }

    this.props.dispatch(modal.render(OnBoard, props))
  }

  render () {
    let {
      data,
      errors,
      step,
      transactions,
      schedules,
      total,
      savedAccount,
      state,
      transactionType,
      scheduleToRecover
    } = this.props.give

    let { campuses, states, countries } = this.props.data

    campuses || (campuses = defaultArray);
    campuses = campuses.map((x) => ({
      label: x.name,
      value: x.name
    }))

    states || (states = defaultArray);
    states = states.map((x) => ({
      label: x.name,
      value: x.value
    }))

    countries || (countries = defaultArray);
    countries = countries.map((x) => ({
      label: x.name,
      value: x.value
    }))


    let save = (...args) => { this.props.dispatch(giveActions.save(...args)) }
    let clear = (...args) => { this.props.dispatch(giveActions.clear(...args)) }

    switch (state) {
      case "loading":
        this.copiedSchedules = {...schedules}
        return <Loading msg="We're Processing Your Contribution" />
      case "error":
        return <Err msg={errors[Object.keys(errors)[0]].error} goToStepOne={this.goToStepOne} />
      case "success":
        return <Success
          total={this.monentize(total.toFixed(2))}
          email={data.personal.email}
          guest={transactionType === "guest"}
          onClick={this.goToaccounts}
          schedules={this.copiedSchedules}
        />
      default:
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
            fieldsetTheme="flush soft-top scrollable soft-double-bottom"
            ref="form"
            method="POST"
            submit={this.onSubmit}
          >

            <Step
              data={data}
              savedAccount={savedAccount}
              transactions={transactions}
              transactionType={transactionType}
              save={save}
              errors={errors}
              clear={clear}
              next={this.next}
              back={this.back}
              ref="inputs"
              total={total}
              campuses={campuses}
              states={states}
              countries={countries}
              schedules={schedules}
              goToStepOne={this.goToStepOne}
              savedAccounts={this.props.data.savedPayments || defaultArray} // XXX perf
              changeSavedAccount={this.changeSavedAccount}
              scheduleToRecover={scheduleToRecover}
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
}
