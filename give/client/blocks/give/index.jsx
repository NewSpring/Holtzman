import { Component, PropTypes} from "react"
import ReactDom from "react-dom";
import { connect } from "react-redux"
import ReactMixin from "react-mixin"
import { VelocityComponent } from "velocity-react"
import { goBack } from "redux-router"

import { Controls, Forms, Icons } from "../../../../core/client/components"
import { WindowLoading, Spinner } from "../../../../core/client/components/loading"

import { People } from "../../../../rock/lib/collections"

import { give as giveActions } from "../../actions"
import { Personal, Payment, Billing, Confirm} from "./fieldsets"


// We only care about the give state
const map = (state) => ({ give: state.give })

@connect(map, giveActions)
@ReactMixin.decorate(ReactMeteorData)
export default class Give extends Component {

  state = {
    postUrl: null,
    transactionId: null,
    state: "default"
  }


  componentWillUnmount(){
    if (this.state != "default") {
      this.props.clearData()
      // if (this.state.transactionId) {
      //   Meteor.call("Give.void", this.state.transactionId, (err, response) => {
      //     console.log(err, reponse)
      //   })
      // }
    }
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
    const { data, transactions, total } = this.props.give

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
      },
      product: [

      ]
    }

    for (let transaction in transactions) {
      joinedData.product.push({
        "quantity": 1,
        "product-code": transaction,
        description: transactions[transaction].label,
        "total-amount": transactions[transaction].value
      })
    }


    Meteor.call("Give.order", joinedData, (err, data) => {
      if (!err) {
        this.setState({ postUrl: data.url, transactionId: data.transactionId})
      }

      console.log(err, data)
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


  completePurchase = (e) => {
    e.preventDefault()
    let segments = this.state.postUrl.split("/")
    const token = segments.pop()
    this.setState({state: "loading"})
    Meteor.call("Give.charge", token, (err, response) => {
      console.log(err, response)
      if (err) {
        this.setState({state: "error", err: err})
        return
      }

      this.setState({state: "success"})
    })
  }

  render () {
    const {
      data,
      errors,
      step,
      transactions,
      total
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

    if (this.state.state === "loading") {
      return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          runOnMount={true}
        >
          <WindowLoading classes={["background--primary"]}>
            <div className="soft soft-double-ends push-double-top one-whole text-center">
              <div className="push-double-top">
                <Spinner styles={{borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px"}}/>
                <h3 className="text-light-primary push-top">We're Processing Your Gift</h3>
              </div>
            </div>
          </WindowLoading>
        </VelocityComponent>
      )
    }


    if (this.state.state === "error") {

      return (

        <div className="soft soft-double-ends push-double-top one-whole text-center">
          <div className="push-double-top">
            <Icons.Error/>
            <h3 className="text-alert push-ends">Uh Oh! Looks like there was a problem processing your gift!</h3>
            <p className="text-left">
              Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
            <p className="test-dark-tertiary text-left"><em>
              If you would like a member of our customer support team to follow up with you regarding this error, click <a href="#">here</a>
            </em></p>
          </div>
        </div>

      )
    }


    if (this.state.state === "success") {
      return (
        <div className="soft soft-double-ends push-double-top one-whole text-center">
          <div className="push-double-top">
            <Icons.Success/>
            <h3 className="text-primary push-ends">Success!</h3>
            <p className="text-left">
              Thank you for your gift of {this.monentize(total)} to NewSpring Church. We will email a reciept to {data.personal.email}
            </p>
            <p className="test-dark-tertiary text-left"><em>
              If you have any questions please call our Finance Team at 864-965-9000 or email us at <a href="mailto:finance@newspring.cc">finance@newspring.cc</a> and someone will be happy to assist you.
            </em></p>

          </div>
        </div>
      )
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
          total={total}
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
