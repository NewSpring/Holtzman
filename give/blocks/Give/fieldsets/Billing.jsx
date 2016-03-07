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
      this.props.clear("billing", "streetAddress")
    } else {
      this.props.save({ billing: { streetAddress: value }})
    }

    return true
  }

  streetAddress2 = (value) => {
    this.props.save({ billing: { streetAddress2: value }})
    return true
  }

  saveState = (value) => {
    // we can't require city for international giving

    if (!value.length) {
      this.props.clear("billing", "state")
    } else {
      this.props.save({ billing: { state: value }})
    }

    return true
  }

  saveCountry = (value) => {
    const isValid = value.length ? true : false

    if (!isValid ) {
      this.props.clear("billing", "country")
    } else {
      this.props.save({ billing: { country: value }})
    }

    return true
  }

  city = (value) => {

    if (!value.length) {
      this.props.clear("billing", "city")
    } else {
      this.props.save({ billing: { city: value }})
    }

    return true
  }

  zip = (value) => {

    // we can't require zip for international giving
    if (!value.length ) {
      this.props.clear("billing", "zip")
    } else {
      this.props.save({ billing: { zip: value }})
    }

    return true
  }

  render () {
    const { billing } = this.props.data
    const { states, countries } = this.props
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

          <Forms.Select
            name="country"
            label="Country"
            errorText="Please enter your country"
            defaultValue={billing.country ? billing.country : "US"}
            items={countries}
            validation={this.saveCountry}
            ref="country"
            includeBlank={true}
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
            {() => {
              if (!billing.country || billing.country === "US" || billing.country === "CA") {
                return (
                  <div className="grid__item one-half">
                    <Forms.Select
                      name="state"
                      label="State/Territory"
                      errorText="Please enter your state"
                      defaultValue={billing.state ? billing.state : "SC"}
                      items={states}
                      validation={this.saveState}
                      ref="state"
                      includeBlank={true}
                    />
                  </div>
                )
              }
            }()}
            {() => {
              let length = "one-whole"
              if (!billing.country || billing.country === "US" || billing.country === "CA") {
                length = "one-half"
              }
              return (
                <div className={`grid__item ${length}`}>
                  <Forms.Input
                    name="zip"
                    label="Zip/Postal"
                    type="tel"
                    errorText="Please enter your zip"
                    defaultValue={billing.zip}
                    onChange={this.zip}
                    validation={this.zip}
                    ref="zip"
                    maxLength="5"
                  />
                </div>
              )
            }()}


          </div>

        </div>



        <div>
          <a href="#" tabIndex={-1} onClick={this.props.back} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </a>

          {() => {
            const { billing } = this.props.data
            let btnClasses = ["push-left"];
            let disabled = false
            if (!billing.streetAddress || !billing.city ){
              btnClasses.push("btn--disabled");
              disabled = true
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")} disabled={disabled} type="submit" onClick={this.props.next}>
                Next
              </button>
            )
          }()}

        </div>

      </div>
    )
  }
}
