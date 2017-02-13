// @flow
import { Component } from "react";

import Forms from "../../../components/@primitives/UI/forms";
import { Error as Err, Loading } from "../../../components/@primitives/UI/states";

type IShowTextArea = {
  loading: boolean,
  phones: Object,
  show: boolean,
  onChange: Function,
  validatePhoneNumber: Function,
}

export const ShowPhoneTextArea = (props: IShowTextArea) => {
  if (props.loading) return null;
  if ((!props.phones || !props.phones.length) && props.show) {
    return (
      <Forms.Input
        label={"Your phone number"}
        name={"phoneNumber"}
        onChange={props.onChange}
        errorText={"Incorrect phone number format"}
        maxLength={20}
        validation={props.validatePhoneNumber}
      />
    );
  }
  return null;
};

type IJoin = {
  onClick: Function,
  group: Object,
  onExit: Function,
  loading: boolean,
  phones: Object,
  onChange: Function,
  validatePhoneNumber: Function,
}

export default class Join extends Component {

  props: IJoin;

  state = {
    state: "default",
    err: null,
    showPhoneBox: false,
  };

  onClick = (e: Event) => {
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

  showPhoneBox = (value: string) => {
    let shouldShowPhoneBox = false;
    if (value === "Phone" || value === "Text") {
      shouldShowPhoneBox = true;
    }
    this.setState({ showPhoneBox: shouldShowPhoneBox });
  }

  render() {
    const { group, onExit } = this.props;
    const leaders = group.members.filter((x) => (x.role.toLowerCase() === "leader"));
    const firstNames = leaders.map((x) => (x.person.nickName || x.person.firstName)).join(", ");
    const communicationPreferences = [
      { label: "No Preference", value: "No Preference" },
      { label: "Email", value: "Email" },
      { label: "Phone", value: "Phone" },
      { label: "Text", value: "Text" },
    ];

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
                <Forms.Select
                  defaultValue={"No Preference"}
                  items={communicationPreferences}
                  onChange={this.showPhoneBox}
                />
                <ShowPhoneTextArea
                  loading={this.props.loading}
                  phones={this.props.phones}
                  show={this.state.showPhoneBox}
                  onChange={this.props.onChange}
                  validatePhoneNumber={this.props.validatePhoneNumber}
                />
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
