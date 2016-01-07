import { Component, PropTypes} from "react"
import ReactDom from "react-dom";
import { connect } from "react-redux"
import ReactMixin from "react-mixin"
import { VelocityComponent } from "velocity-react"
import Moment from "moment"

import { Controls, Forms, Icons } from "../../../../core/client/components"
import { OnBoard } from "../../../../core/client/blocks"
import { WindowLoading, Spinner } from "../../../../core/client/components/loading"
import { modal } from "../../../../core/client/actions"

import { People } from "../../../../rock/lib/collections"

import { give as giveActions } from "../../actions"
import { Personal, Payment, Billing, Confirm} from "./fieldsets"


// We only care about the give state
const map = (state) => ({ give: state.give, person: state.onBoard.person })

@connect(map)
export default class Give extends Component {

  state = {
    postUrl: null,
    transactionId: null,
    state: "default"
  }

  componentWillMount() {
    const { savedAccount } = this.props.give

    this.updateData()

    if (!savedAccount) {
      return
    }

    this.props.dispatch(giveActions.setProgress(4))

    this.submitPersonalDetails((err, data) => {
      if (!err || !data.url) {
        this.setState({ postUrl: data.url, transactionId: data.transactionId})
        fetch(data.url, {
          method: "POST",
          body: new FormData(),
          mode: "no-cors"
        })
        .then((response) => {
          // next()
        })
        .catch((e) => {
          console.log(e)
        })
      } else {
        err || (err = "Saved payment declined")
        this.setState({state: "error", err: err})
      }

    })

  }

  componentWillUnmount(){
    if (this.state != "default") {
      this.props.dispatch(giveActions.clearData())
      // if (this.state.transactionId) {
      //   Meteor.call("Give.void", this.state.transactionId, (err, response) => {
      //     console.log(err, reponse)
      //   })
      // }
    }
  }


  updateData= () => {

    const { person } = this.props

    let { Campus, Home } = person
    Campus || (Campus = {})
    Home || (Home = {})

    const mappedPerson = {
      personal: {
        firstName: person.FirstName,
        lastName: person.LastName,
        email: person.Email,
        campus: Campus.Name
      },
      billing: {
        streetAddress: Home.Street1,
        streetAddress2: Home.Street2,
        city: Home.City,
        state: Home.State,
        zip: Home.PostalCode
      }
    }
    console.log(mappedPerson)
    this.props.dispatch(giveActions.save(mappedPerson))

  }


  goBack = (e) => {
    e.preventDefault();
    window.history.back()
  }

  next = (e) => {
    e.preventDefault()

    let next = () => {
      this.props.dispatch(giveActions.next())
    }

    if (this.props.give.step === 2) {
      this.submitPersonalDetails()
      next()
      return
    }

    if (this.props.give.step === 3) {
      this.submitPaymentDetails(next)
      return
    }

    next()

  }

  back = (e) => {
    e.preventDefault()

    this.props.dispatch(giveActions.previous())
  }

  submitPersonalDetails = (callback) => {
    const { data, transactions, total, schedule, savedAccount } = this.props.give
    let method = "Give.order"

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

    if (schedule.frequency) {
      joinedData["start-date"] = schedule.start || Moment().add(1, 'days').format("YYYYMMDD")
      joinedData.plan = {
        payments: schedule.payments || 0,
        amount: total
      }
      delete joinedData.amount

      switch (schedule.frequency) {
        case "One Time":
          joinedData.plan["day-of-month"] = schedule.start ? schedule.start : Moment().date()
          break;
        case "Weekly":
          joinedData.plan["day-frequency"] = 7
          break;
        case "Bi-Weekly":
          joinedData.plan["day-frequency"] = 14
          break;
        // case "Twice a Month":
        //   joinedData.plan["month-frequency"] =
        //   break;
        case "Monthly":
          joinedData.plan["month-frequency"] = 1
          joinedData.plan["day-of-month"] = schedule.start ? schedule.start : Moment().date()
          break;
      }

      for (let transaction in transactions) {
        joinedData["merchant-defined-field-1"] = transaction
        break
      }

    } else {

      joinedData.product = []

      for (let transaction in transactions) {
        joinedData.product.push({
          "quantity": 1,
          "product-code": transaction,
          description: transactions[transaction].label,
          "total-amount": transactions[transaction].value
        })
      }
    }

    if (savedAccount) {
      joinedData.savedAccount = savedAccount
    }


    callback || (callback = (err, data) => {
      if (!err) {
        this.setState({ postUrl: data.url, transactionId: data.transactionId})
      }

    })


    Meteor.call(method, joinedData, callback)

  }

  submitPaymentDetails = (callback) => {

    const { postUrl } = this.state
    const form = ReactDOM.findDOMNode(this.refs["form"])

    fetch(postUrl, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors"
    })
    .then((response) => {
      // next()

    })
    .catch((e) => {
      // @TODO error handling
    })

    if (callback) {
      callback()
    }
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

    let token
    let segments = this.state.postUrl.split("/")
    token = segments.pop()


    this.setState({state: "loading"})
    let method = "Give.charge"

    if (this.props.give.schedule.frequency) {
      method = "Give.schedule.charge"
    }

    console.log(method)
    Meteor.call(method, token, this.props.give.data.payment.name, (err, response) => {

      console.log(err)
      if (err) {
        this.setState({state: "error", err: err})
        return
      }

      this.setState({state: "success"})
    })
  }

  goToOnboard = () => {
    const { data } = this.props.give

    let props = {
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
    const {
      data,
      errors,
      step,
      transactions,
      total,
      savedAccount,
      transactionType
    } = this.props.give


    let save = (...args) => { this.props.dispatch(giveActions.save(...args)) }
    let clear = (...args) => { this.props.dispatch(giveActions.clear(...args)) }


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


    if (this.state.state === "success" && transactionType != "guest") {
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

    if (this.state.state === "success" && transactionType === "guest") {
      return (
        <div className="soft soft-double-ends push-double-top one-whole text-center">
          <div className="push-double-top">
            <Icons.Success/>
            <h3 className="text-primary push-ends">Success!</h3>
            <p className="text-left">
              Thank you for your gift of {this.monentize(total)} to NewSpring Church. We will email a reciept to {data.personal.email}
            </p>
            <p className="text-left">
              If you would like to view your giving history, make it easier to give, and more, create a NewSpring Account!

            </p>
            <button className="btn one-whole push-bottom" onClick={this.goToOnboard}>Create Account</button>
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
