// @flow
import { Component } from "react";

import Tabs from "../../@primitives/UI/tabs";
import Forms from "../../@primitives/UI/forms";
import Validate from "../../../util/validate";

type Props = {
  setAccount: Function,
  clear: Function,
  save: Function,
  data: Object,
  forgot: Function,
  account: bool,
  header: Object,
  submit: Function,
  toggles: [],
  completeAccount: Function,
  alternateAccounts: [],
  peopleWithoutAccountEmails: [],
};

class SignIn extends Component {
  props: Props;

  static defaultProps = { toggles: ["Sign In", "Register"] }

  state = { showAlternativePeople: true, selectedPerson: undefined }

  header = () => (
    <div className="text-center">
      <h3 className="uppercase text-light-primary flush-bottom push-half-bottom" style={{ fontWeight: "900" }}>
        Welcome To NewSpring
      </h3>
      <p className="flush-bottom"><em className="text-light-primary small">
        Sign In or Create your NewSpring Account
      </em></p>
    </div>
  )

  toggle = (num: number) => this.props.setAccount(num === 0)

  isEmail = (value: string) => {
    const isValid = value.length ? Validate.isEmail(value) : true;

    if (!isValid) {
      this.props.clear("email");
    } else {
      this.props.save({ email: value });
    }

    this.setState({ showAlternativePeople: true });
    return isValid;
  }

  savePassword = (value: string) => {
    this.props.save({ password: value });
    return true;
  }

  liveSavePassword = (value: string) => {
    const isValid = value.length;

    if (!isValid) {
      this.props.clear("password");
    } else {
      this.props.save({ password: value });
    }

    return value;
  }

  firstName = (value: string) => {
    const isValid = value.length;

    if (!isValid) {
      this.props.clear("firstName");
    } else {
      this.props.save({ firstName: value });
    }

    return isValid;
  }

  lastName = (value: string) => {
    const isValid = value.length;

    if (!isValid) {
      this.props.clear("lastName");
    } else {
      this.props.save({ lastName: value });
    }

    return isValid;
  }

  saveTerms = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.props.save({ terms: event.target.checked });
    }
  }

  changeEmails = (event: Event) => {
    const { dataset } = ((event.currentTarget: any): HTMLElement);
    const { email } = dataset;

    this.isEmail(email);
    this.props.setAccount(true);

    event.preventDefault();
  }

  submit = (event: Event) => {
    event.preventDefault();
    const { refs } = this;
    const data = { ...this.props.data };
    for (const input in refs) { // eslint-disable-line
      const component = refs[input];
      if (component.validate) component.validate();
      data[input] = component.getValue();
    }

    if (data.email && data.password) this.props.submit();
  }

  selectPerson = (id: string) => {
    if (this.state.selectedPerson === id) {
      this.setState({ selectedPerson: null });
      this.props.clear("data");
      return;
    }

    this.setState({ selectedPerson: id });
    this.props.save({ personId: id });
  }

  createNewPerson = (e: Event) => {
    if (e) e.preventDefault();
    this.setState({ showAlternativePeople: false });
    this.props.clear("data");
  }

  completeAccount = (e: Event) => {
    if (e) e.preventDefault();
    this.props.completeAccount();
  }

  render() {
    return (
      <div>
        <div className="soft-double-ends soft-sides background--primary">
          {this.props.header || this.header()}
        </div>

        <Tabs
          items={this.props.toggles}
          toggle={this.toggle}
          state={this.props.account ? 0 : 1}
        />

        <Forms.Form
          id="accounts"
          fieldsetTheme="flush soft-top"
          classes={["soft-double-sides@palm-wide-and-up", "soft-sides"]}
          submit={this.submit}
        >
          <div>
            <Forms.Input
              name="email"
              type="email"
              placeholder="user@email.com"
              label="Email"
              errorText="Please enter a valid email"
              validation={this.isEmail}
              defaultValue={this.props.data.email}
              ref="email"
            />
          </div>

          {(() => {
            if (!this.props.account && this.props.alternateAccounts.length) {
              // return null
              return (
                <div>
                  <div className="push-back-double-top soft-bottom one-whole text-left">
                    <h6 className="flush-bottom text-dark-primary push-back-half-top">
                      It looks like you may have a NewSpring account already!
                      <span>
                        &nbsp; Is this your email?<br /><br />
                        <a href="" onClick={this.changeEmails} data-email={this.props.alternateAccounts[0]}>
                          {this.props.alternateAccounts[0]}
                        </a>?
                      </span>
                      <br /><br />Click below to sign in with this email.
                    </h6>
                  </div>
                  <div className="push-half-top push-bottom soft-half-bottom one-whole text-center">
                    <button className="btn" type="submit" onClick={this.changeEmails} data-email={this.props.alternateAccounts[0]}>
                      Sign In
                    </button>
                  </div>
                </div>
              );
            }

            if (
              !this.props.account &&
              this.props.peopleWithoutAccountEmails.length &&
              this.state.showAlternativePeople
            ) {
              const people = [...this.props.peopleWithoutAccountEmails];
              return (
                <div className="one-whole text-left push-back-double-top">
                  <h6 className="text-dark-primary soft-top flush-bottom soft-half-bottom push-back-double-top">
                    It looks like you already have a NewSpring account started!
                    To finish setting it up, select your person and click complete account.
                  </h6>
                  {people.map((person, key) => {
                    const isActive = () => (
                      person.id === this.props.data.id || person.id === this.state.selectedPerson
                    );
                    return (
                      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                      <div
                        className="text-left soft-double-left push-top relative"
                        key={key}
                        onClick={() => this.selectPerson(person.id)}
                      >
                        <div className="locked-left">
                          {/* XXX just used for UI purposes */}
                          <Forms.Checkbox
                            classes={["push-top", "hard-bottom"]}
                            defaultValue={isActive()}
                          />
                        </div>
                        <div
                          className="round background--fill display-inline-block push-half-right"
                          style={{
                            backgroundImage: `url('${person.photo}')`,
                            width: "70px",
                            height: "70px",
                            verticalAlign: "middle",
                          }}
                        />
                        <div
                          className="flush hard display-inline-block"
                          style={{ verticalAlign: "middle" }}
                        >
                          <h5 className="flush-bottom">{person.firstName} {person.lastName}</h5>
                          <h7 className="flush-bottom em text-dark-tertiary">{person.email}</h7>
                        </div>
                      </div>
                    );
                  })}

                  <div className="one-whole text-center push-top">
                    <button className="btn push-top push-bottom" onClick={this.completeAccount}>
                      Complete Account
                    </button>
                    <a
                      className="h7 soft-double-bottom text-dark-secondary display-block"
                      onClick={this.createNewPerson}
                      href=""
                    >
                      Register new account
                    </a>
                  </div>

                </div>
              );
            }

            return (
              <div>
                <Forms.Input
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                  errorText="Password may not be empty"
                  validation={this.savePassword}
                  format={this.liveSavePassword}
                  ref="password"
                />
                {(() => {
                  if (this.props.account) return null;
                  return (
                    <div>
                      <Forms.Input
                        name="firstName"
                        label="First Name"
                        errorText="Please enter your first name"
                        validation={this.firstName}
                        defaultValue={this.props.data.firstName}
                        ref="firstName" // eslint-disable-line
                      />

                      <Forms.Input
                        name="lastName"
                        label="Last Name"
                        errorText="Please enter your last name"
                        validation={this.lastName}
                        defaultValue={this.props.data.lastName}
                        ref="lastName"
                      />
                    </div>
                  );
                })()}
                {(() => {
                  if (!this.props.account) {
                    return (
                      <Forms.Checkbox
                        name="terms"
                        defaultValue={this.props.data.terms}
                        clicked={this.saveTerms}
                      >
                        By signing up you agree to our <a
                          href="//newspring.cc/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                        >terms of use</a>
                      </Forms.Checkbox>
                    );
                  }
                  return (
                    <div className="push-bottom">
                      <h7>
                        <small>
                          <a
                            href="/profile/forgot-password"
                            className="text-primary"
                            onClick={this.props.forgot}
                          >
                            Forgot Password?
                          </a>
                        </small>
                      </h7>
                    </div>
                  );
                })()}

                {(() => {
                  const { data, account } = this.props;
                  const btnClasses = ["push-double-bottom"];

                  if (!data.email || !data.password || (!account && !data.terms)) {
                    btnClasses.push("btn--disabled");
                  } else {
                    btnClasses.push("btn");
                  }

                  return (
                    <button className={btnClasses.join(" ")} type="submit">
                      Enter
                    </button>
                  );
                })()}
              </div>

            );
          })()}


        </Forms.Form>
      </div>
    );
  }
}

export default SignIn;
