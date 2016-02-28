import { Component, PropTypes } from "react"
import { Link } from "react-router"
import Moment from "moment"

import Split, { Left, Right } from "../../../../core/blocks/split"
import { Forms } from "../../../../core/components"

const Layout = ({ geocode, home, ready, save, states, showError, campuses }) => (
  <Split nav={true}>

    <Right
      mobile={true}
      classes={["floating", "overlay--solid-dark"]}
      ratioClasses={["floating", "floating__item", "overlay__item", "one-whole", "text-center"]}
      background="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/fpo/fpo.groups-flipped_1700_850_90_c1.jpg"
    >
      <div className="soft one-whole">
        <h4 className="text-light-primary soft-half-top flush-bottom">Community Finder</h4>
        <p className="text-light-primary flush"><em>#TheseAreMyPeople</em></p>
      </div>
    </Right>
    <Left scroll={true}>
      <div className="one-whole text-center push-double-top@lap-and-up push-double-bottom">
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
          submit={geocode}
        >
          <div className="push-double">
            <h4 className="text-center flush-bottom">
              Find Your People
            </h4>
            <p>
              <em>
                <small>
                  Search for communities near you
                </small>
              </em>
            </p>
          </div>

          <Forms.Input
            name="streetAddress"
            label="Street Address"
            errorText="Please enter your address"
            defaultValue={home.street1}
            onBlur={save}
            autofocus={true}
          />
          <Forms.Input
            name="streetAddress2"
            label="Street Address (optional)"
            defaultValue={home.street2}
            onBlur={save}
          />

          <Forms.Input
            name="city"
            label="City"
            errorText="Please enter your city"
            defaultValue={home.city}
            onBlur={save}
          />

          <div className="grid">

            <div className="grid__item one-half">
              <Forms.Select
                name="state"
                label="State/Territory"
                errorText="Please enter your state"
                defaultValue={home.state}
                onChange={save}
                items={states}
                includeBlank={true}
                deselect={true}
              />

            </div>
            <div className="grid__item one-half">
              <Forms.Input
                name="zip"
                label="Zip"
                type="tel"
                errorText="Please enter your zip"
                defaultValue={home.zip}
                onBlur={save}
              />
            </div>
          </div>

          <Forms.Select
            name="campus"
            label="Campus"
            onChange={save}
            items={campuses}
            includeBlank={true}
            deselect={true}
          />

          {() => {

            if (showError) {
              return (
                <h6 className="text-alert soft-bottom">
                  <em>
                    We were not able to find your location. Please try adding more information or a different address
                  </em>
                </h6>
              )
            }
          }()}

          {() => {

            let btnClasses = ["one-whole"];
            if (!ready){
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")} disabled={!ready}>
                Search
              </button>
            )
          }()}

        </Forms.Form>
      </div>
    </Left>
  </Split>

)

export default Layout
