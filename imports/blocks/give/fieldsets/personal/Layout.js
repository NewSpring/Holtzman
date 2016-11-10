import { PropTypes } from "react";
import Forms from "../../../../components/forms";

const Header = () => (
  <h4 className="text-center">
    Personal Details
  </h4>
);

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
      {header || <Header />}
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


    <div>
      {/*
      <a href="#" tabIndex={-1} onClick={this.props.back}
         className="btn--small btn--dark-tertiary display-inline-block">
        Back
      </a>
      */}

      {(() => {
        const btnClasses = [
          // "push-left"
        ];
        let disabled = false;
        if (personal.email === null || personal.firstName === null ||
            personal.email === null || personal.campusId === null) {
          btnClasses.push("btn--disabled");
          disabled = true;
        } else {
          btnClasses.push("btn");
        }

        return (
          <button
            className={btnClasses.join(" ")}
            disabled={disabled}
            onClick={next}
          >
            Next
          </button>
        );
      })()}
    </div>
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
