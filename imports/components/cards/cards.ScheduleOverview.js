// @flow

import moment from "moment";

type IScheduleOverviewCard = {
  amount: string,
  fund: string,
  frequency: string,
  started: string,
  latest: string,
  onEditClick: Function,
};

// eslint-disable-next-line max-len
const currencySymbolRegex = /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/;

export const getCurrencySymbol = (amount:string) => amount.match(currencySymbolRegex) || "$";
export const getNegative = (amount:string) => amount.match(/-/);
export const getDollars = (amount:string) => amount.replace(currencySymbolRegex, "").replace("-", "").split(".")[0] || "0";
export const getCents = (amount:string) => amount.split(".")[1] || "00";

const ScheduleOverviewCard = ({
  amount,
  fund,
  frequency,
  started,
  latest,
  onEditClick,
}: IScheduleOverviewCard) => (
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
);

export default ScheduleOverviewCard;
