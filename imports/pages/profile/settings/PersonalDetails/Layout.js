import { Component, PropTypes } from "react";
import { Link } from "react-router";
import inAppLink from "../../../../util/inAppLink";
import Forms from "../../../../components/@primitives/UI/forms";
import Meta from "../../../../components/shared/meta";
import Validate from "../../../../util/validate";

import Back from "../Back";

export default class Layout extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    person: PropTypes.object,
    months: PropTypes.array.isRequired,
    saveMonth: PropTypes.func.isRequired,
    days: PropTypes.array.isRequired,
    years: PropTypes.array.isRequired,
    campuses: PropTypes.array,
  };

  submit = (e) => {
    e.preventDefault();

    const data = {};
    // eslint-disable-next-line
    for (const ref in this.refs) {
      let value = this.refs[ref].getValue();
      if (ref === "Email" && !Validate.isEmail(value)) {
        continue; // eslint-disable-line
      }

      const number = Number(value);
      if (number) {
        value = number;
      }

      data[ref] = value;
    }

    this.props.submit(data);
  };

  render() {
    const { person, months, saveMonth, days, years, campuses } = this.props;

    const {
      campus,
      firstName,
      lastName,
      nickName,
      email,
      birthDay,
      birthMonth,
      birthYear,
    } = person;

    return (
      <div
        className={
          "background--light-primary one-whole text-center push-top " +
          "push-double-top@lap-and-up soft-double-bottom push-double-bottom"
        }
      >
        <Meta title="Update your details" />
        <Back />
        <Forms.Form
          id="reset-password"
          classes={[
            "soft",
            "one-whole",
            "two-thirds@portable",
            "one-half@anchored",
            "display-inline-block",
            "soft-double-sides@palm-wide",
          ]}
          submit={this.submit}
        >
          <div className="push-double">
            <h4 className="text-center">
              My Personal Details
            </h4>
          </div>

          <h6 className="soft-bottom">Name</h6>
          <Forms.Input
            name="NickName"
            label="Nickname"
            ref="NickName"
            type="text"
            defaultValue={nickName}
          />

          <div className="grid">
            <div className="grid__item one-half">

              <Forms.Input
                name="FirstName"
                label="First Name"
                ref="FirstName"
                type="text"
                defaultValue={firstName}
              />
            </div>
            <div className="grid__item one-half">

              <Forms.Input
                name="LastName"
                label="Last Name"
                ref="LastName"
                type="text"
                defaultValue={lastName}
              />
            </div>
          </div>

          <h6 className="soft-bottom">Contact</h6>
          <Forms.Input
            name="Email"
            placeholder="user@email.com"
            label="Email"
            type="email"
            ref="Email"
            errorText="Please enter a valid email"
            validation={Validate.isEmail}
            defaultValue={email}
            style={{ paddingBottom: "0px" }}
          />
          {email &&
            email.indexOf("@newspring.cc") <= -1 &&
            <small className="text-left">
              Note: Changing your email address will also change the email address that you use to
              sign in.
            </small>}
          {email &&
            email.indexOf("@newspring.cc") > -1 &&
            <small className="text-left">
              Note: To change your email, please visit{" "}
              <a href={"https://selfservice.newspring.cc"}>Self Service</a>
            </small>}

          <h6 className="soft-bottom push-double-top">Birthday</h6>
          <div className="grid">
            <div className="grid__item three-fifths">
              <div className="grid">
                <div className="grid__item one-half">
                  <Forms.Select
                    name="BirthMonth"
                    label="Month"
                    ref="BirthMonth"
                    type="text"
                    defaultValue={birthMonth}
                    includeBlank
                    items={months}
                    validation={saveMonth}
                  />
                </div>
                <div className="grid__item one-half">
                  <Forms.Select
                    name="BirthDay"
                    label="Day"
                    ref="BirthDay"
                    type="text"
                    defaultValue={birthDay}
                    includeBlank
                    items={days}
                  />
                </div>

              </div>

            </div>
            <div className="grid__item two-fifths">
              <Forms.Select
                name="BirthYear"
                label="Year"
                ref="BirthYear"
                type="text"
                defaultValue={birthYear}
                includeBlank
                items={years}
              />
            </div>
          </div>
          <h6 className="soft-bottom">Campus</h6>
          <Forms.Select
            name="Campus"
            label="Campus"
            type="Campus"
            defaultValue={(campus && campus.id) || false}
            ref="Campus"
            includeBlank
            items={campuses || []}
          />

          {/*
          <Link
            to="/profile/settings"
            tabIndex={-1}
            className="btn--small btn--dark-tertiary display-inline-block"
          >
            Back
          </Link>
          */}
          {(() => {
            const btnClasses = [];
            const ready = true;
            if (!ready) {
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")}>
                Update
              </button>
            );
          })()}
        </Forms.Form>
      </div>
    );
  }
}
