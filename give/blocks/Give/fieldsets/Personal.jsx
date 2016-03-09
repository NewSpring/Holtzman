import { Component, PropTypes } from "react"


import { Controls, Forms } from "../../../../core/components"
import Validate from "../../../../core/util/validate"

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

    return true
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

    return true
  }

  campus = (value) => {

    this.props.save({ personal: { campus: value }})

    return true
  }



  render () {
    const { personal } = this.props.data
    let { campuses } = this.props

    campuses || (campuses = [])

    if (campuses.length === 0) {
      delete personal.campus
    }

    return (
      <div>
        <div className="push-double@lap-and-up push">
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
            type="email"
            errorText="Please enter a valid email"
            validation={this.isEmail}
            defaultValue={personal.email}
            ref="email"
          />

          <Forms.Select
            name="campus"
            label="Campus"
            type="campus"
            errorText="Please choose a campus"
            validation={this.campus}
            defaultValue={personal.campus}
            ref="campus"
            includeBlank={true}
            items={campuses}
          />
        </div>



        <div>
          {/*
          <a href="#" tabIndex={-1} onClick={this.props.back} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </a>
          */}

          {() => {
            let btnClasses = [
              // "push-left"
            ];
            let disabled = false
            if (personal.email === null || personal.firstName === null || personal.email === null || personal.campus === null){
              btnClasses.push("btn--disabled");
              disabled = true
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")} disabled={disabled} onClick={this.props.next}>
                Next
              </button>
            )
          }()}

        </div>

      </div>
    )
  }
}
