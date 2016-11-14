// @flow

import Forms from "../../../../components/forms";

type IHeader = {
  override?: React$Element<any>,
};

const Header = ({ override }: IHeader) => {
  if (override) return override;
  return (
    <h4 className="text-center">
      Personal Details
    </h4>
  );
};

type INextButton = {
  personal: Object,
  next: Function,
};

const NextButton = ({
  personal,
  next,
}: INextButton) => {
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

type ILayout = {
  campus: Function,
  campuses: Object[],
  children?: React$Element<any>,
  firstName: Function,
  header?: React$Element<any>,
  isEmail: Function,
  lastName: Function,
  next: Function,
  personal: Object,
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
}: ILayout) => (
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

export default Layout;
