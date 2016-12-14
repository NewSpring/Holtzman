// @flow
import moment from "moment";

import Currency from "./../currency";

type IScheduleOverviewCard = {
  amount: string,
  frequency: string,
  started: string,
  classes: string,
  latest: string,
  onEditClick: Function,
  onDetailClick: Function,
};

const ScheduleOverviewCard = ({
  amount,
  frequency,
  started,
  latest,
  classes,
  onEditClick,
  onDetailClick,
}: IScheduleOverviewCard) => (
  <div className={classes}>
    <div className="card">
      <div className="card__item soft push-half-ends one-whole">
        <button
          className="float-right h6 text-dark-tertiary outlined--bottom"
          style={{ borderColor: "inherit", borderWidth: "2px" }}
          onClick={onEditClick}
        >
          Edit
        </button>
        <Currency
          amount={amount}
          className="text-left"
        />
        <h5 className="floating__item soft-half-right push-bottom text-dark-primary">
          {frequency}
        </h5>
        <p className="flush" style={latest ? { marginBottom: "5px" } : {}}>
          <span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>
            Started:
          </span>
          <em className="text-dark-primary">{moment(started).format("MMM D, YYYY")}</em>
        </p>
        {latest && (
          <p>
            <span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>
              Latest:
            </span>
            <em className="text-dark-primary">{moment(latest).format("MMM D, YYYY")}</em>
          </p>
        )}
        <button
          className="text-primary"
          style={{ borderColor: "inherit", borderWidth: "2px" }}
          onClick={onDetailClick}
        >
          <h6 className="display-inline-block soft-half-right">View Schedule Details</h6>
          <span
            className="text-primary display-inline-block icon-arrow-next"
            style={{
              right: "-5px",
              top: "1px",
            }}
          />
        </button>
      </div>
    </div>
  </div>
);

export default ScheduleOverviewCard;
