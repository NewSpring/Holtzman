import PropTypes from 'prop-types';
import { Link } from "react-router";
import Forms from "../../../components/@primitives/UI/forms";

const Layout = ({ submit, save, state }) => (
  <div
    className={
      "background--light-primary one-whole text-center " +
      "push-double-top@lap-and-up push-double-bottom"
    }
    style={{ overflow: "visible" }}
  >
    <Forms.Form
      id="reset-password"
      classes={[
        "soft",
        "one-whole",
        "two-thirds@portable",
        "one-half@anchored",
        "display-inline-block",
      ]}
      submit={submit}
    >
      <div className="push-double">
        <h4 className="text-center">
          Change Password
        </h4>
      </div>

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

      <Link
        to="/profile/settings"
        tabIndex={-1}
        className="btn--small btn--dark-tertiary display-inline-block"
      >
        Back
      </Link>

      {(() => {
        const btnClasses = ["push-left"];
        const { newP, newPDup } = state;
        if (!newP || !newPDup) {
          btnClasses.push("btn--disabled");
        } else {
          btnClasses.push("btn");
        }

        return (
          <button className={btnClasses.join(" ")}>
            Enter
          </button>
        );
      })()}
    </Forms.Form>
  </div>
);

Layout.propTypes = {
  submit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default Layout;
