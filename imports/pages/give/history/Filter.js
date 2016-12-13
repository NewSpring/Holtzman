
import { Component, PropTypes } from "react";
import moment from "moment";
import TagSelect from "../../../components/forms/TagSelect";
import Tag from "../../../components/tags";

const DATE_RANGES = [
  { label: "Last Month", value: "LastMonth" },
  { label: "Last 6 Months", value: "LastSixMonths" },
  { label: "Last Year", value: "LastYear" },
  { label: "All Time", value: "AllTime" },
];

export default class Filter extends Component {

  static propTypes = {
    family: PropTypes.array.isRequired,
    changeFamily: PropTypes.func.isRequired,
    changeDates: PropTypes.func.isRequired,
    findByLimit: PropTypes.func.isRequired,
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

  dateRangeClick = (value: string) => {
    this.setState(({ start, end }) => {
      if (start !== "" || end !== "") {
        if (value === "AllTime") {
          this.props.findByLimit();
        } else {
          this.props.changeDates("", "");
        }
        return { start: "", end: "" };
      }

      let startDate;
      let endDate;
      if (value === "LastMonth") {
        startDate = moment().subtract(30, "days").format("L");
        endDate = moment().format("L");
      } else if (value === "LastSixMonths") {
        startDate = moment().subtract(6, "months").format("L");
        endDate = moment().format("L");
      } else if (value === "LastYear") {
        startDate = moment().subtract(12, "months").format("L");
        endDate = moment().format("L");
      } else {
        this.props.findByLimit(0);
      }

      this.props.changeDates(startDate, endDate);
      return {
        start: startDate,
        end: endDate,
      };
    });
  }

  render() {
    const { family } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        <div
          onClick={this.toggle}
          className={
            "one-whole background--light-primary " +
            "soft-half-ends soft-sides soft-double-sides@lap-and-up"
          }
        >
          <h7 className="text-dark-secondary flush-bottom push-half-left display-inline-block">
            Filter Transactions
          </h7>
          <span
            className={`float-right flush ${expanded ? "icon-close" : "icon-filter"}`}
            style={{ marginTop: expanded ? "0px" : "0px", cursor: "pointer" }}
          />
        </div>
        <div className="one-whole outlined--bottom outlined--light" />
        {(() => {
          if (!expanded) return null;
          return (
            <div
              className={
                "one-whole outlined--light outlined--bottom background--light-primary " +
                "soft-half-ends soft-sides soft-double-sides@lap-and-up push-half-left"
              }
            >
              <h7 className="push-top text-dark-secondary display-inline-block">
                Family Members
              </h7>

              {family && family.map(({ person }, key) => {
                const active = this.state.people.indexOf(person.id) > -1;
                return (
                  <div
                    key={key}
                    style={{ cursor: "pointer" }}
                    className=""
                    onClick={() => this.onClick(person)}
                  >
                    <div
                      className={
                        `${active ? "checkbox-checked" : ""} ` +
                        "display-inline-block outlined checkbox"
                      }
                    />
                    <h6 className="soft-half-left display-inline-block">
                      {person.nickName || person.firstName} {person.lastName}
                    </h6>
                  </div>
                );
              })}

              <h7 className="soft-half-top push-half-top text-dark-secondary display-inline-block">
                Date Range
              </h7>
              <div className="grid one-whole flush-left@palm">
                <div
                  className={
                    "hard-left@palm grid__item one-whole"
                  }
                >
                  <TagSelect items={DATE_RANGES} onClick={this.dateRangeClick} />
                </div>
              </div>

              <h7 className="soft-half-top push-half-top text-dark-secondary display-inline-block">
                Custom Dates
              </h7>
              <div className="grid one-whole flush-left@palm">
                <div
                  className={
                    "hard-left@palm grid__item one-whole display-inline-block"
                  }
                >
                  <Tag
                    key={1}
                    label={"Start Date"}
                    val={"StartDate"}
                    onClick={this.dateRangeClick}
                    active={false}
                    className={false && "tag--disabled"}
                  />
                  <Tag
                    key={2}
                    label={"End Date"}
                    val={"EndDate"}
                    onClick={this.dateRangeClick}
                    active={false}
                    className={false && "tag--disabled"}
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
