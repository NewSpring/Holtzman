
import { Component, PropTypes} from "react"
import Forms from "../../../../../core/components/forms"
import { Error as Err, Loading, Success } from "../../../../../core/components/states"

export default class Join extends Component {

  state = {
    state: "default",
    err: null
  }

  onClick = (e) => {

    this.setState({
      state: "loading"
    })

    this.props.onClick(e, (err, response) => {
      if (err) {
        this.setState({
          state: "error",
          err: err.message
        })

        setTimeout(() => {
          this.setState({
            state: "default",
          })
        }, 3000)

        return
      }

      this.setState({
        state: "success"
      })


    })

  }

  render () {
    const { group, onExit,  person } = this.props
    console.log(this.state)
    switch (this.state.state) {
      case "loading":
        return <Loading msg="We're sending your request!" />
      case "error":
        return <Err msg="There was a problem sending your request" error={this.state.err} />
      case "success":

        return (
          <div className="soft soft-double-ends one-whole text-center">

            <h4 className="text-center push-ends">
              Request Sent!
            </h4>
            <p>
              We have sent your request to join {group.name} to the group leaders!
            </p>
            <button className="btn--thin btn--small btn--dark-tertiary one-whole" onClick={onExit}>
              Close
            </button>
          </div>
        )

    }


    return (
      <div className="soft soft-double-ends one-whole text-center">

        <h4 className="text-center push-ends">
          Request to Join {group.name}
        </h4>

        <Forms.Form
          id="message-form"
          classes={["hard"]}
          submit={this.onClick}
        >
          <Forms.TextArea
            label="Your Message"
            name="message"
            classes={["hard-bottom", "push-half-ends"]}
            style={{border: "none"}}
            inputClasses="text-dark-secondary"
            rows={16}
            defaultValue={"\nHi there,\n\nPraesent commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n\nThanks!"}
          />

          <div className="grid">
            <div className="grid__item one-half">
              <button className="btn--thin btn--small btn--dark-tertiary one-whole" onClick={onExit}>
                Cancel
              </button>
            </div>
            <div className="grid__item one-half">
              <button type="submit" className="one-whole btn" >
                Send
              </button>
            </div>
          </div>
        </Forms.Form>
      </div>
    )
  }
}
