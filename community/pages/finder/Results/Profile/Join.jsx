
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
    let leaders = group.members.filter((x) => (x.role.toLowerCase() === "leader"))
    let firstNames = leaders.map((x, i) => (x.person.nickName || x.person.firstName)).join(", ")

    let message = `\nHey${" " + firstNames},\n\nI'm interested in joining your group and looking forward to hearing from you soon!\n\nThanks!`

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
            rows={10}
            defaultValue={message}
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
