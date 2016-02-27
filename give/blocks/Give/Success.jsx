
import { Success as SuccessIcon } from "../../../core/components/icons"
import Moment from "moment"
const Success = ({ total, email, guest, onClick, schedules }) => {

  let schedule = false
  for (let sched in schedules) {
    schedule = schedules[sched]
    break
  }

  return (
    <div className="soft soft-double-ends push-double-top one-whole text-center">
      <div className="push-double-top">
        <SuccessIcon />
        <h3 className="text-primary push-ends">Success!</h3>
        {() => {
          if (schedule) {
            return (
              <p className="text-left">
                Thank you for your gift of {total} starting on {Moment(schedule.start).format("MMM D, YYYY")} to NewSpring Church.
              </p>
            )
          }

          return (
            <p className="text-left">
              Thank you for your gift of {total} to NewSpring Church. We will email a receipt to {email}
            </p>
          )
        }()}

        {() => {
          if (guest) {
            return (
              <div>
                <p className="text-left">
                  If you would like to view your giving history, make it easier to give, and more, create a NewSpring Account!

                </p>
                <button
                  className="btn one-whole push-bottom" onClick={onClick}
                >
                  Create Account
                </button>
              </div>

            )
          }
        }()}
        <p className="test-dark-tertiary text-left"><em>
          If you have any questions please call our Finance Team at 864-965-9000 or email us at <a href="mailto:finance@newspring.cc">finance@newspring.cc</a> and someone will be happy to assist you.
        </em></p>

      </div>
    </div>
  )
}

export default Success
