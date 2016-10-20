
import { Component, PropTypes } from "react";
import Forms from "../../../components/forms";

export default class Filter extends Component {

  static propTypes = {
    family: PropTypes.array.isRequired,
    changeFamily: PropTypes.func.isRequired,
    changeDates: PropTypes.func.isRequired,
  }

  state = { people: [], start: "", end: "", expanded: false }

  componentWillReceiveProps(nextProps) {
    if (this.props.family.length !== nextProps.family.length) {
      this.setState({ people: nextProps.family.map((x) => x.person.id) });
    }
  }

  onClick = ({ id }) => {
    const people = [...this.state.people];
    const index = people.indexOf(id);
    if (index > -1) {
      people.splice(index, 1);
      this.setState({ people });
      this.props.changeFamily(people);
      return;
    }

    people.push(id);
    this.setState({ people });
    this.props.changeFamily(people);
  }

  toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  saveData = (value, { id }) => {
    const { start, end } = this.state;
    if (id === "start") this.props.changeDates(value, end);
    if (id === "end") this.props.changeDates(start, value);
    this.setState({ [id]: value });
  }

  /* eslint-disable */
  // formatExp = (str, { id }, event) => {
  //
  //   let current = this.state[id];
  //   current || (current = "")
  //   str = `${str}`
  //
  //   if (str.length > 5) return str.slice(0, 5);
  //
  //   let copy = str
  //   const lastNumber = copy.slice(-1)
  //   const currentLastNumber = current.slice(-1)
  //
  //   if (lastNumber === "/" && str.length === 1) return `0${str}/`;
  //   if (lastNumber === "/" && str.length === 2 && currentLastNumber != "/") {
  //     return `${str}/`;
  //   }
  //
  //   if (str.length === 2 && lastNumber != "/" && currentLastNumber != "/" && currentLastNumber != "") {
  //     return `${str}/`;
  //   }
  //
  //   if (str.length === 4 && lastNumber === "/") return str.slice(0, 3);
  //   return str;
  // }
  /* eslint-enable */

  render() {
    const { family } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        <div
          onClick={this.toggle}
          className={
            "one-whole outlined--light outlined--top background--light-primary " +
            "soft-half-ends soft-sides soft-double-sides@lap-and-up"
          }
        >
          <h6 className="text-dark-secondary flush-bottom display-inline-block">
            Filter Transactions
          </h6>
          <span
            className={`float-right flush-bottom ${expanded ? "h7" : "icon-filter"}`}
            style={{ marginTop: expanded ? "3px" : "0px", cursor: "pointer" }}
          >
            {!expanded ? "" : "Done"}
          </span>
        </div>
        <div className="one-whole outlined--bottom outlined--light" />
        {(() => {
          if (!expanded) return null;
          return (
            <div
              className={
                "one-whole outlined--light outlined--bottom background--light-primary " +
                "soft-half-ends soft-sides soft-double-sides"
              }
            >
              <h6 className="push-top soft-half-bottom text-dark-secondary display-inline-block">
                Family Member
              </h6>

              {family && family.map(({ person }, key) => {
                const active = this.state.people.indexOf(person.id) > -1;
                return (
                  <div
                    key={key}
                    style={{ cursor: "pointer" }}
                    className="soft-half-bottom soft-half-left"
                    onClick={() => this.onClick(person)}
                  >
                    <div
                      className={
                        `${active ? "background--primary" : ""} ` +
                        "display-inline-block outlined"
                      }
                      style={{
                        width: "15px",
                        height: "15px",
                        verticalAlign: "middle",
                        borderWidth: "2px",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    />
                    <div
                      className="push-left round background--fill display-inline-block"
                      style={{
                        width: "35px",
                        height: "35px",
                        verticalAlign: "middle",
                        backgroundImage: `url('${person.photo}')`,
                      }}
                    />
                    <h7 className="soft-half-left">
                      {person.nickName || person.firstName} {person.lastName}
                    </h7>
                  </div>
                );
              })}

              <h6 className="soft-half-top push-top text-dark-secondary display-inline-block">
                Choose Date Range
              </h6>
              <div className="grid one-whole push-top flush-left@palm">
                <div
                  className={
                    "hard-left@palm grid__item one-whole one-half@palm-wide-and-up one-third@lap-and-up one-half@lap"
                  }
                >
                  <Forms.Input
                    label="Start Date (MM/YY)"
                    type="text"
                    id="start"
                    defaultValue={this.state.start}
                    onBlur={this.saveData}
                    errorText="Please enter a start date"
                    validation={(value) => (value.length === 0 || value.length === 5)}
                  />
                </div>
                <div
                  className={
                    "hard-left@palm grid__item one-whole one-half@palm-wide-and-up one-third@lap-and-up one-half@lap"
                  }
                >
                  <Forms.Input
                    label="End Date (MM/YY)"
                    type="text"
                    id="end"
                    defaultValue={this.state.end}
                    onBlur={this.saveData}
                    errorText="Please enter an end date"
                    validation={(value) => (value.length === 0 || value.length === 5)}
                  />
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }
}
