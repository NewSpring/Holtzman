import { PropTypes } from "react";
import { Link } from "react-router";
import Forms from "../../components/forms";

const RecoverableSchedule = ({ account, amount, frequency }) => (
  <div>
    <div className="display-inline-block soft-half-ends one-whole">
      <h5 className="flush-bottom float-left">{account}</h5>
    </div>

    <div className="grid push-top soft-bottom">

      <div className="grid__item one-half">
        <Forms.Input
          label="Amount"
          defaultValue={`$${amount}`}
          disabled
          classes={["soft-half-bottom"]}
        />
      </div>

      <div className="grid__item one-half">
        <Forms.Input
          label="Frequency"
          defaultValue={frequency}
          disabled
          classes={["soft-half-bottom"]}
        />
      </div>
    </div>

  </div>
);

RecoverableSchedule.propTypes = {
  account: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  frequency: PropTypes.string.isRequired,
};

/* eslint-disable max-len */
const Layout = ({ schedules, onClick, hide }) => (
  <div className="soft soft-double-ends one-whole text-center">
    <h4 className="text-center push-ends">
      Transfer Your Schedule
    </h4>
    <p className="push-bottom text-left">
      Our records show that you have active giving schedules in our previous system. To access your schedule within our new system, simply review your schedule and re-enter your payment details. If you're not ready to do this, your schedule will continue in our previous system until you transfer it.
    </p>

    {schedules.map(schedule => (
      <RecoverableSchedule
        amount={schedule.details[0].amount}
        frequency={schedule.schedule.value}
        account={schedule.details[0].account.name}
        key={Number(schedule.id)}
        id={Number(schedule.id)}
      />
    ))}

    <Link className="btn one-whole push-ends" to="/give/schedules/transfer" onClick={hide}>
      Confirm Schedules
    </Link>

    <button className="btn--thin btn--small btn--dark-tertiary one-whole" onClick={onClick}>
      Remind Me Later
    </button>

    <p className="push-top text-left">
      <em>
        <small>
          You can cancel your schedule at any time from the Scheduled Giving page. If you have any questions please call our Finance Team at 864-965-9990 or <a rel="noopener noreferrer" target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us </a> and someone will be happy to assist you.
        </small>
      </em>
    </p>

  </div>
);
/* eslint-enable max-len */

Layout.propTypes = {
  schedules: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Layout;
