import { Forms } from "../../../../core/components"
import Meta from "../../../../core/components/meta"

import Back from "../Back"

const styles = {
  overflow: "visible",
  zIndex: 1,
  marginTop: process.env.NATIVE ? "50px" : "0px",
};

const Layout = ({ submit, save, state }, context) => (
  <div
    className="background--light-primary one-whole text-center push-double-top@lap-and-up push-double-bottom "
    style={styles}>
    <Back />
    <Meta title="Change your password" />
      <Forms.Form
        id="reset-password"
        classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block", "soft-double-sides@palm-wide"]}
        submit={submit}
      >
        <div className="push-double">
          <h4 className="text-center">
            Change Password
          </h4>
        </div>

        <Forms.Input
          name="current"
          label="Current Password"
          validation={save}
          type="password"
        />

        <Forms.Input
          name="newP"
          label="New Password"
          validation={save}
          errorText="New password does not match"
          type="password"
        />

        <Forms.Input
          name="newPDup"
          label="Repeat New Password"
          validation={save}
          errorText="New password does not match"
          type="password"
        />
      {/*
        <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
          Back
        </Link>
         */}
        {(() => {
          let btnClasses = [];
          const { current, newP, newPDup } = state
          if (!current || !newP || !newPDup){
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return (
            <button className={btnClasses.join(" ")}>
              Enter
            </button>
          )
        })()}
      </Forms.Form>
    </div>
)

export default Layout
