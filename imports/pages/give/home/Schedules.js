
// @flow

import React, { Component } from "react";
import { Link, withRouter } from "react-router";
import ScheduleCard from "../../../components/giving/cards/ScheduleCard";
import LoadingCard from "../../../components/@primitives/UI/loading/ActivityCard";
import SectionHeader from "../../../components/@primitives/UI/section-header";
import SmallButton from "../../../components/@primitives/UI/buttons/SmallButton";

const SchedulesButton = () =>
  <SmallButton
    text="New Schedule"
    linkUrl="/give/now?schedule=true"
    className="btn--dark-tertiary flush"
  />;

type ISchedulesList = {
  schedules: Object,
  router: Object,
};

export class SchedulesList extends Component {
  props: ISchedulesList;

  renderSchedules(schedules: Object) {
    if (!Array.isArray(schedules)) return null;

    return schedules.map((schedule) =>
      <ScheduleCard
        classes="grid__item one-whole"
        key={schedule.id}
        amount={schedule.details.reduce((i, { amount }) => i + amount, 0).toFixed(2)}
        fund={schedule.details[0].account.name}
        frequency={schedule.schedule.description}
        started={schedule.start}
        latest={schedule.transactions[0] ? schedule.transactions[0].date : ""}
        onEditClick={() => { this.props.router.push(`/give/schedules/edit/${schedule.id}`); }}
        onDetailClick={() => { this.props.router.push(`/give/schedules/${schedule.id}`); }}
      />
    );
  }

  render() {
    const wrapper = "soft-half-sides soft-double-sides@lap-and-up";

    if (!this.props.schedules) return null;

    if (this.props.schedules.loading) {
      return (
        <div className={wrapper}>
          <LoadingCard />
        </div>
      );
    }

    if (!this.props.schedules || !this.props.schedules.scheduledTransactions) {
      return (
        <div>
          <div className={wrapper}>
            <SectionHeader
              title="Active Schedules"
              link={<SchedulesButton />}
            />
          </div>
          <Link
            className="one-whole ratio--landscape background--fill"
            style={{
              backgroundImage: "url(//s3.amazonaws.com/ns.assets/apollos/42835.marketing.cen.webad.scheduleyourgiving_2x1.jpg)",
            }}
            to="/give/now?schedule=true"
          >
            <div className="ratio__item" />
          </Link>

        </div>
      );
    }

    return (
      <div className={wrapper}>
        <SectionHeader
          title="Active Schedules"
          link={<SchedulesButton />}
        />
        <div className="grid">
          {this.renderSchedules(this.props.schedules.scheduledTransactions)}
        </div>
      </div>
    );
  }
}

export default withRouter(SchedulesList);
