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
const getDollars = (amount:string) => amount.split(".")[0].slice(1);
const getCents = (amount:string) => amount.split(".")[1];

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
      <button className="float-right h6 text-dark-tertiary outlined--bottom" style={{ borderColor: "inherit", borderWidth: "2px" }} onClick={onEditClick}>Edit</button>
      <div className="floating text-left text-dark-primary">
        <h4 className="floating__item flush" style={{ paddingRight: "5px" }}>{getCurrencySymbol(amount)}</h4>
        <h2 className="floating__item flush">{getDollars(amount)}</h2>
        <h4 className="floating__item flush">.{getCents(amount)}</h4>
      </div>
      <div className="floating text-left push-bottom">
        <h5 className="floating__item soft-half-right flush text-dark-primary">{fund}</h5>
        <h6 className="floating__item flush text-dark-tertiary">{frequency}</h6>
      </div>
      <p className="flush" style={{ marginBottom: "5px" }}><span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>Started: </span><em className="text-dark-primary">{started}</em></p>
      <p className="flush"><span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>Latest: </span><em className="text-dark-primary">{latest}</em></p>
    </div>
  </div>
);

export default ScheduleOverviewCard;
