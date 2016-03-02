import { Component, PropTypes } from "react"
import ReactDom from "react-dom"

import { Controls, Forms } from "../../../../core/components"
import { Validate } from "../../../../core/util"

export default class Billing extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    clear: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    states: PropTypes.array,
  }


  header = () => {
    return (
      <h4 className="text-center">
        Billing Address
      </h4>
    )
  }

  streetAddress = (value) => {
    const isValid = value.length ? true : false

    if (!isValid ) {
      this.props.clear("streetAddress")
    } else {
      this.props.save({ billing: { streetAddress: value }})
    }

    return isValid
  }

  streetAddress2 = (value) => {
    this.props.save({ billing: { streetAddress2: value }})
    return true
  }

  saveState = (value) => {
    const isValid = value.length ? true : false

    if (!isValid ) {
      this.props.clear("state")
    } else {
      this.props.save({ billing: { state: value }})
    }

    return isValid
  }

  city = (value) => {
    const isValid = value.length ? true : false

    if (!isValid ) {
      this.props.clear("city")
    } else {
      this.props.save({ billing: { city: value }})
    }

    return isValid
  }

  zip = (value) => {
    let isValid = value.length >= 5 ? true : false

    if (!isValid ) {
      this.props.clear("zip")
    } else {
      this.props.save({ billing: { zip: value }})
    }

    return isValid
  }

  render () {
    const { billing } = this.props.data
    const { states } = this.props
    return (
      <div>
        <div className="push-double@lap-and-up push">
          {this.props.header || this.header()}
        </div>

        {this.props.children}

        <div className="soft">


          <Forms.Input
            name="streetAddress"
            label="Street Address"
            errorText="Please enter your address"
            validation={this.streetAddress}
            defaultValue={billing.streetAddress}
            ref="streetAddress"
            autofocus={true}
          />
          <Forms.Input
            name="streetAddress2"
            label="Street Address (optional)"
            validation={this.streetAddress2}
            defaultValue={billing.streetAddress2}
            ref="streetAddress2"
          />


          <Forms.Input
            name="city"
            label="City"
            errorText="Please enter your city"
            defaultValue={billing.city}
            validation={this.city}
            ref="city"
          />

          <div className="grid">

            <div className="grid__item one-half">
              <Forms.Select
                name="state"
                label="State/Territory"
                errorText="Please enter your state"
                defaultValue={billing.state}
                items={states}
                validation={this.saveState}
                ref="state"
                includeBlank={true}
              />

            </div>
            <div className="grid__item one-half">
              <Forms.Input
                name="zip"
                label="Zip"
                type="tel"
                errorText="Please enter your zip"
                defaultValue={billing.zip}
                onChange={this.zip}
                validation={this.zip}
                ref="zip"
                maxLength="5"
              />
            </div>
          </div>

        </div>



        <div>
          <a href="#" tabIndex={-1} onClick={this.props.back} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </a>

          {() => {
            const { billing } = this.props.data
            let btnClasses = ["push-left"];

            if (!billing.streetAddress || !billing.city || !billing.state || !billing.zip){
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")} type="submit" onClick={this.props.next}>
                Next
              </button>
            )
          }()}

        </div>

      </div>
    )
  }
}
