// @flow
import Currency from "./../currency";

type IScheduleOverviewCard = {
  amount: string,
  fund: string,
  frequency: string,
  started: string,
  latest: string,
  onEditClick: Function,
};

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
      <div className="floating text-left push-bottom">
        <h5 className="floating__item soft-half-right flush text-dark-primary">{fund}</h5>
        <h6 className="floating__item flush text-dark-tertiary">{frequency}</h6>
      </div>
      <p className="flush" style={latest ? { marginBottom: "5px" } : {}}>
        <span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>
          Started:
        </span>
        <em className="text-dark-primary">{started}</em>
      </p>
      {latest && (
        <p className="flush">
          <span className="h7 text-dark-tertiary push-half-right" style={{ verticalAlign: "middle" }}>
            Latest:
          </span>
          <em className="text-dark-primary">{latest}</em>
        </p>
      )}
    </div>
  </div>
);

export default ScheduleOverviewCard;
