import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import ReactMixin from "react-mixin"
import Moment from "moment"
import { VelocityComponent } from "velocity-react"


import { Forms } from "../../../../core/client/components"
import { WindowLoading } from "../../../../core/client/components/loading"

import { Campuses } from "../../../../rock/lib/collections"

import { nav } from "../../../../core/client/actions"

import { updateHome } from "../../../../rock/client/methods/auth"


const map = (state) => ({ person: state.onBoard.person })

@connect(map)
export default class HomeAddress extends Component {

  state = {
    state: "default"
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  updateAddress = (e) => {
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

    this.setState({ state: "loading" })

    let refs = this.refs
    updateHome(data, (err, result) => {

      if (err) {
        this.setState({ state: "error", err: err })
        setTimeout(() => {
          this.setState({ state: "default"})
        }, 3000)
        return
      }


      this.setState({ state: "success" })

      setTimeout(() => {
        this.setState({ state: "default"})
      }, 3000)

    })


  }

  render () {

    let {
      City,
      Country,
      PostalCode,
      State,
      Street1,
      Street2
    } = this.props.person.Home

    if (this.state.state === "error") {

      return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          runOnMount={true}
        >
          <WindowLoading classes={["background--alert"]}>
            <div className="locked-top locked-bottom one-whole floating">
              <div className="floating__item">
                <h4 className="text-light-primary">Looks like there was a problem :(</h4>
                <p className="text-light-primary">{this.state.err.error}</p>
              </div>
            </div>
          </WindowLoading>
        </VelocityComponent>
      )
    }

    if (this.state.state === "loading") {
      return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          runOnMount={true}
        >
          <WindowLoading classes={["background--primary"]}>
            <div className="locked-top locked-bottom one-whole floating">
              <div className="floating__item">
                <h4 className="text-light-primary">Updating your information...</h4>
              </div>
            </div>
          </WindowLoading>
        </VelocityComponent>
      )
    }

    if (this.state.state === "success") {
      return (
        <div className="one-whole text-center push-double-top soft-double-top@lap-and-up">
          <h4>Your information has been updated!</h4>
        </div>
      )
    }

    return (
      <div className="one-whole text-center push-double-top@lap-and-up">
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
          submit={this.updateAddress}
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
            defaultValue={Street1}
          />
          <Forms.Input
            name="Street2"
            label="Street 2 (Optional)"
            ref="Street2"
            type="text"
            defaultValue={Street2}
          />
          <div className="grid">

            <div className="grid__item two-fifths">
              <Forms.Input
                name="City"
                label="City"
                defaultValue={City}
                ref="City"
              />
            </div>

            <div className="grid__item three-fifths">

              <div className="grid">

                <div className="grid__item one-half">
                  <Forms.Input
                    name="State"
                    label="State"
                    defaultValue={State}
                    ref="State"
                  />

                </div>
                <div className="grid__item one-half">
                  <Forms.Input
                    name="PostalCode"
                    label="Zip"
                    defaultValue={PostalCode}
                    ref="PostalCode"
                  />
                </div>
              </div>
            </div>
          </div>

          <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </Link>

          {() => {
            let btnClasses = ["push-left"];
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
