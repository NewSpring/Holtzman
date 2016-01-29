
import { Forms } from "../../../core/components"
import ConfirmNow from "../ActionButtons"

const RecoverableSchedule = ({id, account, amount, frequency, removeOnClick}) => (
  <div>
    <div className="display-inline-block soft-half-ends one-whole">
      <h6 className="flush-bottom float-left">{account}</h6>
      <button className="h6 flush-bottom float-right text-alert" data-id={id} onClick={removeOnClick}>Remove</button>
    </div>

    <div className="grid push-top">

      <div className="grid__item one-half">
        <Forms.Input
          label="Amount"
          defaultValue={amount}
          disabled={true}
          classes={["soft-half-bottom"]}
        />
      </div>

      <div className="grid__item one-half">
        <Forms.Input
          label="Frequency"
          defaultValue={frequency}
          disabled={true}
          classes={["soft-half-bottom"]}
        />
      </div>
    </div>

  </div>
)

const Layout = ({ schedules, reminderDate, onClick }) => (
  <div className="soft soft-double-ends one-whole text-center">
    <h4 className="text-center push-ends">
      Continue Your Gift
    </h4>
    <p className="push-bottom text-left">
      Our records indicate you have existing reccuring gifts with us that are no longer active.
      This may be because of a payment exipration, or this gift has not been reactived since we moved giving platforms.
    </p>

    {schedules.map((schedule) => (
      <RecoverableSchedule
        amount={schedule.details[0].amount}
        frequency={schedule.schedule.value}
        account={schedule.details[0].account.name}
        key={Number(schedule.id)}
        id={Number(schedule.id)}
      />
    ))}

    <ConfirmNow classes={["one-whole push-ends"]} text="Confirm" />


    <button className="btn--thin btn--small btn--dark-tertiary one-whole" onClick={onClick}>
      Remind Me Later
    </button>

    <p className="push-top text-left">
      <em>
        <small>
          You can cancel your schedule at any time from the Scheduled Giving page. If you have any questions please call our Finance Team at 864-965-9990 or email us at <a href="mailto:finance@newspring.cc">finance@newspring.cc</a> and someone will be happy to assist you.
        </small>
      </em>
    </p>

  </div>
)

export default Layout
