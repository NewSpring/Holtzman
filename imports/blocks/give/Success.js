
import { Success as SuccessIcon } from "../../components/icons";
import Moment from "moment";
const Success = ({ total, email, guest, onClick, schedules, additionalMessage }) => {
  let schedule = false;
  for (let sched in schedules) {
    schedule = schedules[sched];
    break;
  }
  return (
    <div className="soft soft-double-ends push-double-top one-whole text-center">
      <div className="push-double-top">
        <SuccessIcon />
        <h3 className="text-primary push-ends">Success!</h3>
        {(({ email, total, schedule }) => {
          if (schedule) {
            return (
              <p className="text-left">
                Thank you for your contribution of {total} starting on {Moment(schedule.start).format("MMM D, YYYY")} to NewSpring Church.
              </p>
            );
          }

          return (
            <p className="text-left">
              Thank you for your contribution of {total} to NewSpring Church. We will email a receipt to {email}
            </p>
          );
        })({ email, schedule, total })}

        {(({ additionalMessage }) => {
          if (!additionalMessage) return;
          return (
            <h5>{additionalMessage}</h5>
          );
        })({ additionalMessage })}

        {(({ guest, onClick }) => {
          console.log(onClick);
          if (!guest) return;
          return (
            <div>
              <p className="text-left">
                If you would like to view your giving history, make it easier to give, and more, create a NewSpring Account!

              </p>
              <button
                  className="btn one-whole push-bottom" onClick={(e) => onClick()}
              >
                Create Account
              </button>
            </div>
          );
        })({ guest, onClick })}
        <p className="test-dark-tertiary text-left"><em>
          If you have any questions please call our Finance Team at 864-965-9990 or <a target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">contact us </a> and someone will be happy to assist you.
        </em></p>

      </div>
    </div>
  );
};

export default Success;
