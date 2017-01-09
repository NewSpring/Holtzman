// @flow
import moment from "moment";

import Currency from "../../@primitives/typography/currency";

type IScheduleCard = {
  amount: string,
  frequency: string,
  started: string,
  classes: string,
  latest: string,
  onDetailClick: Function,
};

const ScheduleCard = ({
  amount,
  frequency,
  started,
  latest,
  classes,
  onDetailClick,
}: IScheduleCard) => (
  <div className={classes}>
    <div className="card">
      <div className="card__item soft push-half-ends one-whole">
        <Currency
          amount={amount}
          className="text-left"
          baseHeadingSize="1"
        />
        <h5 className="floating__item soft-half-right push-half--bottom text-dark-primary">
          {frequency}
        </h5>
        <p className="flush-bottom soft-half-top" style={latest ? { marginBottom: "5px" } : {}}>
          <span
            className="h7 text-dark-tertiary push-half-right"
            style={{ verticalAlign: "middle" }}
          >
            Start Date:
          </span>
          <em className="text-dark-primary">{moment.utc(started).format("MMM D, YYYY")}</em>
        </p>
        {latest && (
          <p>
            <span
              className="h7 text-dark-tertiary push-half-right"
              style={{ verticalAlign: "middle" }}
            >
              Latest Contribution:
            </span>
            <em className="text-dark-primary">{moment(latest).format("MMM D, YYYY")}</em>
          </p>
        )}
        <button
          className={`${String(!latest) && "soft-top"} text-primary`}
          style={{ borderColor: "inherit", borderWidth: "2px" }}
          onClick={onDetailClick}
        >
          <h6 className="display-inline-block soft-half-right flush-bottom">
            View Schedule Details
          </h6>
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

export default ScheduleCard;
