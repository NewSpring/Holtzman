
// @flow

import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ScheduleCard from "../../../components/cards/cards.ScheduleOverview";
import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

const SchedulesButton = () =>
  <SmallButton
    text="New Schedule"
    linkUrl="/give/history"
    className="btn--dark-tertiary flush"
  />;

const SCHEDULE_QUERY = gql`
  query scheduledTransactions {
    scheduledTransactions {
      id
      start
      details {
        account {
          name
        }
        amount
      }
      transactions {
        date
      }
      schedule {
        description
      }
    }
  }
`;
const withSchedules = graphql(SCHEDULE_QUERY, {
  name: "schedules",
});

type ISchedulesList = {
  schedules: Object,
};

export class SchedulesList extends Component {
  props: ISchedulesList;

  renderSchedules(schedules: Object) {
    if (!Array.isArray(schedules)) return null;

    return schedules.map((schedule) =>
      <ScheduleCard
        key={schedule.id}
        amount={`${schedule.details[0].amount}`}
        fund={schedule.details[0].account.name}
        frequency={schedule.schedule.description}
        started={schedule.start}
        latest={schedule.transactions[0] ? schedule.transactions[0].date : ""}
        onEditClick={() => {}}
      />
    );
  }

  render() {
    if (!this.props.schedules || !this.props.schedules.scheduledTransactions) return <div />;
    return (
      <div>
        <SectionHeader
          title="Schedule"
          link={<SchedulesButton />}
        />
        <div className="soft-half">
          {this.renderSchedules(this.props.schedules.scheduledTransactions)}
        </div>
      </div>
    );
  }
}

export default withSchedules(SchedulesList);
