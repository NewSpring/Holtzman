import { Link } from "react-router"
import { Forms } from "../../../../core/components"
import { VelocityComponent } from "velocity-react"

const Layout = ({ submit, save, state }) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    duration={500}
    runOnMount={true}
  >
  <div className="background--light-primary one-whole text-center push-double-top@lap-and-up locked-ends locked-sides scrollable push-double-bottom">
      <Forms.Form
        id="reset-password"
        classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
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

        <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
          Back
        </Link>

        {() => {
          let btnClasses = ["push-left"];
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
        }()}
      </Forms.Form>
    </div>
  </VelocityComponent>
)

export default Layout
