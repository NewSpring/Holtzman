import { Component, PropTypes} from "react"
import Meta from "../../../../core/components/meta"

import { Forms } from "../../../../core/components"

import Back from "../Back"

export default class Layout extends Component {
  static propTypes = {
    home: PropTypes.object,
    update: PropTypes.func
  }

  submit = (e) => {
    e.preventDefault()

    let data = {}
    for (let ref in this.refs) {
      let value = this.refs[ref].getValue()
      let number = Number(value)
      if (number) {
        value = number
      }

      data[ref] = value
    }

    this.props.update(data)
  }

  render () {
    const { update, home, campuses, campus } = this.props

    let {
      city,
      country,
      zip,
      state,
      street1,
      street2,
    } = home

    return (
    <div className="background--light-primary one-whole text-center push-double-top@lap-and-up push-double-bottom background--light-primary">
      <Meta title="Change your address" />
        <Back />
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
          submit={this.submit}
        >
          <div className="push-double">
            <h4 className="text-center">
              My Home Address
            </h4>
          </div>

          <Forms.Input
            name="Street1"
            label="Street"
            ref="Street1"
            type="text"
            defaultValue={street1}
          />
          <Forms.Input
            name="Street2"
            label="Street 2 (Optional)"
            ref="Street2"
            type="text"
            defaultValue={street2}
          />
          <div className="grid">

            <div className="grid__item two-fifths">
              <Forms.Input
                name="City"
                label="City"
                defaultValue={city}
                ref="City"
              />
            </div>

            <div className="grid__item three-fifths">

              <div className="grid">

                <div className="grid__item one-half">
                  <Forms.Input
                    name="State"
                    label="State"
                    defaultValue={state}
                    ref="State"
                  />

                </div>
                <div className="grid__item one-half">
                  <Forms.Input
                    name="PostalCode"
                    label="Zip"
                    defaultValue={zip}
                    ref="PostalCode"
                  />
                </div>
              </div>
            </div>
          </div>

          <h6 className="soft-bottom">Campus</h6>
          <Forms.Select
            name="Campus"
            label="Campus"
            type="Campus"
            defaultValue={campus.id || false}
            ref="Campus"
            includeBlank={true}
            items={campuses}
          />
          {/*
          <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </Link>
          */}
          {() => {
            let btnClasses = [];
            let ready = true
            if (!ready){
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")}>
                Update
              </button>
            )
          }()}
        </Forms.Form>
      </div>
    )
  }
}
