import { Component, PropTypes } from "react"
import ReactDom from "react-dom"
import { connect } from "react-redux"

import { Controls, Forms } from "../../../../../core/client/components"
import { Validate } from "../../../../../core/lib"


export default class Personal extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    clear: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
  }

  header = () => {
    return (
      <h4 className="text-center">
        Personal Details
      </h4>
    )
  }


  firstName = (value) => {
    const isValid = value.length ? true : false
    const noError = !this.props.errors["firstName"]

    if (!isValid ) {
      this.props.clear("firstName")
    } else {

      this.props.save({
        personal: {
          firstName: value
        }
      })
    }

    return isValid
  }

  isEmail = (value) => {
    const isValid = Validate.isEmail(value)
    const noError = !this.props.errors["email"]

    if (!isValid ) {
      this.props.clear("email")
    } else {
      this.props.save({ personal: { email: value }})
    }

    return isValid
  }

  lastName = (value) => {
    const isValid = value.length ? true : false
    const noError = !this.props.errors["lastName"]

    if (!isValid ) {
      this.props.clear("lastName")
    } else {
      this.props.save({ personal: { lastName: value }})
    }

    return isValid
  }

  campus = (value) => {
    const isValid = value.length ? true : false
    const noError = !this.props.errors["campus"]

    if (!isValid ) {
      this.props.clear("campus")
    } else {
      this.props.save({ personal: { campus: value }})
    }

    return isValid
  }



  render () {
    const { personal } = this.props.data

    return (
      <div>
        <div className="push-double">
          {this.props.header || this.header()}
        </div>
        {this.props.children}
        <div className="soft">


          <div className="grid">
            <div className="grid__item one-half">
              <Forms.Input
                name="firstName"
                label="First Name"
                errorText="Please enter your first name"
                validation={this.firstName}
                defaultValue={personal.firstName}
                ref="firstName"
              />
            </div>
            <div className="grid__item one-half">
              <Forms.Input
                name="lastName"
                label="Last Name"
                errorText="Please enter your last name"
                validation={this.lastName}
                defaultValue={personal.lastName}
                ref="lastName"
              />
            </div>


          </div>
          <Forms.Input
            name="email"
            placeholder="user@email.com"
            label="Email"
            errorText="Please enter a valid email"
            validation={this.isEmail}
            defaultValue={personal.email}
            ref="email"
          />

          <Forms.Input
            name="campus"
            placeholder="campus"
            label="Campus"
            type="campus"
            errorText="Please choose a campus"
            validation={this.campus}
            defaultValue={personal.campus}
            ref="campus"
          />
        </div>



        <div>
          <a href="#" tabIndex={-1} onClick={this.props.back} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </a>

          {() => {
            let btnClasses = ["push-left"];

            if (personal.email === null || personal.firstName === null || personal.email === null || personal.campus === null){
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")} onClick={this.props.next}>
                Enter
              </button>
            )
          }()}

        </div>

      </div>
    )
  }
}
