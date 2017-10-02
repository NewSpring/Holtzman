import PropTypes from 'prop-types';
import Forms from "../../../../components/@primitives/UI/forms";
import Meta from "../../../../components/shared/meta";

import Back from "../Back";

const styles = {
  overflow: "visible",
  zIndex: 1,
};

const Layout = ({ submit, save, state }) => (
  <div
    className={
      "background--light-primary one-whole text-center " +
      "push-top push-double-top@lap-and-up push-double-bottom"
    }
    style={styles}
  >
    <Back />
    <Meta title="Change your password" />
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
      {(() => {
        const btnClasses = [];
        let disabled = true;
        const { current, newP, newPDup } = state;
        if (!current || !newP || !newPDup) {
          btnClasses.push("btn--disabled");
        } else {
          btnClasses.push("btn");
          disabled = false;
        }

        return (
          <button className={btnClasses.join(" ")} disabled={disabled}>
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
