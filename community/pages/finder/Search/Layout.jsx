import { Component, PropTypes } from "react"
import { Link } from "react-router"
import Moment from "moment"
import { VelocityComponent } from "velocity-react"

import Split, { Left, Right } from "../../../../core/blocks/split"
import { Forms } from "../../../../core/components"

const Layout = ({ geocode, home, ready, save, states, showError, campuses }, context) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    duration={500}
    runOnMount={context.shouldAnimate}
  >
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
      <Left scroll={true} classes={["background--light-primary"]}>
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

            <h6 className="soft-bottom">Find by Name</h6>
            <Forms.Input
              name="name"
              label="Group Name"
              onChange={save}
              onBlur={save}
              autofocus={true}
            />

            <h6 className="soft-bottom">Find by Location</h6>
            <Forms.Input
              name="streetAddress"
              label="Street Address"
              errorText="Please enter your address"
              defaultValue={home.street1}
              onChange={save}
              onBlur={save}
            />

            <div className="grid">

              <div className="grid__item two-fifths">
                <Forms.Input
                  name="city"
                  label="City"
                  errorText="Please enter your city"
                  defaultValue={home.city}
                  onChange={save}
                  onBlur={save}
                />

              </div>
              <div className="grid__item three-fifths">
                <div className="grid">
                  <div className="grid__item one-half">
                    <Forms.Select
                      name="state"
                      label="State"
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
                      onChange={save}
                      onBlur={save}
                    />
                  </div>
                </div>

              </div>
            </div>

            <h6 className="soft-bottom">Find by Campus</h6>
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
  </VelocityComponent>

)

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout
