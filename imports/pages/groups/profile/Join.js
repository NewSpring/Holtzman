import { Component, PropTypes } from "react";

import Forms from "../../../components/@primitives/UI/forms";
import { Error as Err, Loading } from "../../../components/@primitives/UI/states";
import Checkbox from "../../../components/@primitives/UI/forms/Checkbox";

export default class Join extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    onExit: PropTypes.func.isRequired,
  }

  state = {
    state: "default",
    err: null,
    emailCommunicationPreferenceChecked: false,
    phoneCommunicationPreferenceChecked: false,
    textCommunicationPreferenceChecked: false,
  };

  onClick = (e) => {
    this.setState({ state: "loading" });

    this.props.onClick(e, (err) => {
      if (err) {
        this.setState({ state: "error", err: err.message });
        return setTimeout(() => {
          this.setState({ state: "default" });
        }, 3000);
      }
      this.setState({ state: "success" });
      return null;
    });
  }

  toggleCheckbox = (checkboxName: String) => {
    console.log("checkboxName = ", checkboxName);
    switch (checkboxName) {
      case "emailCommunicationPreference":
        console.log("checking email communication preference");
        this.setState({ emailCommunicationPreferenceChecked: true });
        this.setState({ phoneCommunicationPreferenceChecked: false });
        this.setState({ textCommunicationPreferenceChecked: false });
        break;
      case "phoneCommunicationPreference":
        console.log("checking phone communication preference");
        this.setState({ emailCommunicationPreferenceChecked: false });
        this.setState({ phoneCommunicationPreferenceChecked: true });
        this.setState({ textCommunicationPreferenceChecked: false });
        break;
      case "textCommunicationPreference":
        console.log("checking text communication preference");
        this.setState({ emailCommunicationPreferenceChecked: false });
        this.setState({ phoneCommunicationPreferenceChecked: false });
        this.setState({ textCommunicationPreferenceChecked: true });
        break;
      default:
        this.setState({ emailCommunicationPreferenceChecked: false });
        this.setState({ phoneCommunicationPreferenceChecked: false });
        this.setState({ textCommunicationPreferenceChecked: false });
    }
  }

  render() {
    const { group, onExit } = this.props;
    const leaders = group.members.filter((x) => (x.role.toLowerCase() === "leader"));
    const firstNames = leaders.map((x) => (x.person.nickName || x.person.firstName)).join(", ");

    const message = `\nHey ${firstNames},\n\nI'm interested in learning more about your group and ` +
      "looking forward to hearing from you soon!\n\nThanks!";
    switch (this.state.state) {
      case "loading":
        return <Loading msg="We're sending your message!" />;
      case "error":
        return <Err msg="There was a problem sending your message" error={this.state.err} />;
      case "success":
        return (
          <div className="soft soft-double-ends one-whole text-center">
            <h4 className="text-center push-ends">
              Message Sent!
            </h4>
            <p>
              We have sent your request for more information
              about {group.name} to the group leaders!
            </p>
            <button className="btn--thin btn--small btn--dark-tertiary one-whole" onClick={onExit}>
              Close
            </button>
          </div>
        );
      default:
        return (
          <div className="soft soft-double-ends one-whole text-center">
            <h4 className="text-center push-ends">
              Contact {group.name}
            </h4>
            <Forms.Form
              id="message-form"
              classes={["hard"]}
              submit={this.onClick}
            >
              <Forms.TextArea
                label="Your Message (click message to edit)"
                name="message"
                classes={["hard-bottom", "push-half-ends"]}
                inputClasses="text-dark-secondary"
                rows={10}
                defaultValue={message}
              />
              <div className="text-left soft-bottom">
                <h5 className="soft-half-bottom">Communication Preference</h5>
                <Checkbox
                  name="emailCommunicationPreference"
                  classes={["soft-bottom display-inline-block soft-right push-double-right"]}
                  defaultValue={false}
                  clicked={() => this.toggleCheckbox("emailCommunicationPreference")}
                >
                  <span className="soft-half-top">Email</span>
                </Checkbox>
                <Checkbox
                  name="phoneCommunicationPreference"
                  classes={["soft-bottom display-inline-block soft-right push-double-right"]}
                  defaultValue={false}
                  clicked={() => this.toggleCheckbox("phoneCommunicationPreference")}
                >
                  <span className="soft-half-top">Phone</span>
                </Checkbox>
                <Checkbox
                  name="textCommunicationPreference"
                  classes={["soft-bottom display-inline-block soft-right push-double-right"]}
                  defaultValue={false}
                  clicked={() => this.toggleCheckbox("textCommunicationPreference")}
                >
                  <span className="soft-half-top">Text</span>
                </Checkbox>
              </div>
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
        );
    }
  }
}
