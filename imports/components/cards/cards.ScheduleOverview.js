// @flow

import moment from "moment";
import {
  getCurrencySymbol,
  getNegative,
  getDollars,
  getCents,
} from "./../currency";

type IScheduleOverviewCard = {
  amount: string,
  fund: string,
  frequency: string,
  started: string,
  latest: string,
  onEditClick: Function,
  classes: string,
};

const ScheduleOverviewCard = ({
  amount,
  fund,
  frequency,
  started,
  latest,
  onEditClick,
  classes,
}: IScheduleOverviewCard) => (
  <div className={`${classes || ""}`}>
    <div className="card">
      <div className="card__item soft push-half-ends one-whole">
        <button className="float-right h6 text-dark-tertiary outlined--bottom" style={{ borderColor: "inherit", borderWidth: "2px" }} onClick={onEditClick}>Edit</button>
        <div className="floating text-left text-dark-primary">
          <h4 className="floating__item flush" style={{ paddingRight: "5px" }}>{getCurrencySymbol(amount)}</h4>
          {getNegative(amount) && <h4 className="floating__item flush" style={{ paddingRight: "3px" }}>{getNegative(amount)}</h4>}
          <h2 className="floating__item flush">{getDollars(amount)}</h2>
          <h4 className="floating__item flush">.{getCents(amount)}</h4>
        </div>
        <div className="floating text-left push-bottom">
          <h5 className="floating__item soft-half-right flush text-dark-primary">{fund}</h5>
          <h6 className="floating__item flush text-dark-tertiary">{frequency}</h6>
        </div>
        <p className="flush" style={latest ? { marginBottom: "5px" } : {}}><span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>Started: </span><em className="text-dark-primary">{ moment(started).format("MMM D, YYYY") }</em></p>
        {latest && <p className="flush"><span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>Latest: </span><em className="text-dark-primary">{ moment(latest).format("MMM D, YYYY") }</em></p>}
      </div>
    </div>
  </div>
);

export default ScheduleOverviewCard;
