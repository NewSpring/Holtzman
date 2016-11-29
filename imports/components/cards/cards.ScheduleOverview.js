// @flow

type IScheduleOverviewCard = {
  amount: string,
  fund: string,
  frequency: string,
  started: string,
  latest: string,
  onEditClick: Function,
};

const getCurrencySymbol = (amount:string) => amount.charAt(0);
const getDollarAmount = (amount:string) => amount.split(".")[0].slice(1);
const getCentsAmount = (amount:string) => amount.split(".")[1];

const ScheduleOverviewCard = ({
  amount,
  fund,
  frequency,
  started,
  latest,
  onEditClick,
}: IScheduleOverviewCard) => (
  <div className="card">
    <div className="card__item soft push-half-ends one-whole" style={{ verticalAlign: "middle" }}>
      <h3 className="flush">
        <span className="h5" style={{ verticalAlign: "middle" }}>{getCurrencySymbol(amount)}</span>
        <span className="h3" style={{ verticalAlign: "middle" }}>{getDollarAmount(amount)}</span>
        <span className="h5" style={{ verticalAlign: "middle" }}>.{getCentsAmount(amount)}</span>
      </h3>
      <h4>{fund} <span className="h6 text-dark-tertiary" style={{ verticalAlign: "middle" }}>{frequency}</span></h4>
      <p><span className="h6 text-dark-tertiary" style={{ verticalAlign: "middle" }}>Started: </span>{started}</p>
      <p><span className="h6 text-dark-tertiary" style={{ verticalAlign: "middle" }}>Latest: </span>{latest}</p>
      <button className="float" onClick={onEditClick}>Edit</button>
    </div>
  </div>
);

export default ScheduleOverviewCard;
