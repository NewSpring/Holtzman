import PropTypes from "prop-types";
import { Component } from "react";

import Meta from "../../../../components/shared/meta";
import Forms from "../../../../components/@primitives/UI/forms";

import Back from "../Back";

export default class Layout extends Component {
  static propTypes = {
    home: PropTypes.object,
    update: PropTypes.func,
  }

  submit = e => {
    e.preventDefault();

    const data = {};
    // eslint-disable-next-line
    for (const ref in this.refs) {
      let value = this.refs[ref].getValue();
      const number = Number(value);
      if (number) {
        value = number;
      }

      data[ref] = value;
    }

    this.props.update(data);
  }

  render() {
    const { home } = this.props;

    const {
      city,
      zip,
      state,
      street1,
      street2,
    } = home;

    return (
      <div
        className={
          "background--light-primary one-whole text-center push-top " +
          "push-double-top@lap-and-up push-double-bottom background--light-primary"
        }
      >
        <Meta title="Change your address" />
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
