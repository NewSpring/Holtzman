import Moment from "moment";
import { PropTypes } from "react";
import { Success as SuccessIcon } from "../../components/icons";

const Success = ({ total, email, guest, onClick, schedules, additionalMessage }) => {
  let schedule = false;
  // eslint-disable-next-line
  for (const sched in schedules) {
    schedule = schedules[sched];
    break;
  }
  return (
    <div className="soft soft-double-ends push-double-top one-whole text-center">
      <div className="push-double-top">
        <SuccessIcon />
        <h3 className="text-primary push-ends">Success!</h3>
        {schedule && (/* eslint-disable */
          <p className="text-left">
            Thank you for your contribution of {total} starting on { Moment(schedule.start).format("MMM D, YYYY") } to NewSpring Church.
          </p>
            /* eslint-enable */)}

        {!schedule && (
          <p className="text-left">
            Thank you for your contribution of {total} to NewSpring Church.
            We will email a receipt to {email}
          </p>
        )}

        {additionalMessage && <h5>{additionalMessage}</h5>}

        {guest && (
          <div>
            <p className="text-left">
              If you would like to view your giving history,
              make it easier to give, and more, create a NewSpring Account!
            </p>
            <button className="btn one-whole push-bottom" onClick={onClick()}>
              Create Account
            </button>
          </div>
        )}

        <p className="test-dark-tertiary text-left"><em>
          If you have any questions please call our Finance Team at 864-965-9990 or <a target="_blank" rel="noopener noreferrer" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us </a> and someone will be happy to assist you.
        </em></p>

      </div>
    </div>
  );
};

Success.propTypes = {
  total: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  guest: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  schedules: PropTypes.array.isRequired,
  additionalMessage: PropTypes.string.isRequired,
};

export default Success;
