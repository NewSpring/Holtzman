import { PropTypes } from "react";
import Forms from "../../../../components/forms";

const Header = ({ override }) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Personal Details
    </h4>
  );
};

Header.propTypes = {
  override: PropTypes.object,
};

const NextButton = ({
  personal,
  next,
}) => {
  const btnClasses = [];
  let disabled = false;
  if (
    personal.email === null ||
    personal.firstName === null ||
    personal.campusId === null
  ) {
    btnClasses.push("btn--disabled");
    disabled = true;
  } else {
    btnClasses.push("btn");
  }

  return (
    <div>
      <button
        className={btnClasses.join(" ")}
        disabled={disabled}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};

NextButton.propTypes = {
  personal: PropTypes.object,
  next: PropTypes.func,
};

const Layout = ({
  campus,
  campuses,
  children,
  firstName,
  header,
  isEmail,
  lastName,
  next,
  personal,
}) => (
  <div>
    <div className="push-double@lap-and-up push">
      <Header override={header} />
    </div>

    {children}

    <div className="soft">

      <div className="grid">
        <div className="grid__item one-half">
          <Forms.Input
            name="firstName"
            label="First Name"
            errorText="Please enter your first name"
            validation={firstName}
            defaultValue={personal.firstName}
          />
        </div>
        <div className="grid__item one-half">
          <Forms.Input
            name="lastName"
            label="Last Name"
            errorText="Please enter your last name"
            validation={lastName}
            defaultValue={personal.lastName}
          />
        </div>
      </div>

      <Forms.Input
        name="email"
        placeholder="user@email.com"
        label="Email"
        type="email"
        errorText="Please enter a valid email"
        validation={isEmail}
        defaultValue={personal.email}
      />

      <Forms.Select
        name="campus"
        label="Campus"
        type="campus"
        errorText="Please choose a campus"
        validation={campus}
        defaultValue={personal.campusId}
        includeBlank
        items={campuses}
      />
    </div>

    <NextButton
      personal={personal}
      next={next}
    />
  </div>
);

Layout.propTypes = {
  campus: PropTypes.func,
  campuses: PropTypes.array,
  children: PropTypes.object,
  firstName: PropTypes.func,
  header: PropTypes.func,
  isEmail: PropTypes.func,
  lastName: PropTypes.func,
  next: PropTypes.func,
  personal: PropTypes.object,
};

export default Layout;
