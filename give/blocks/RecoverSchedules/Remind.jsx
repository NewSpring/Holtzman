
import { Forms } from "../../../core/components"

const Remind = ({ onSubmit, back }) => {

  const reminderFrequency = [
    {
      label: "Tomorrow",
      value: "tomorrow"
    },
    {
      label: "Next Week",
      value: "nextWeek"
    },
    {
      label: "In Two Weeks",
      value: "twoWeeks"
    }
  ]

  return (
    <div className="soft soft-double-ends one-whole text-center">
      <h4 className="text-center push-ends">
        Remind Me Later
      </h4>
      <p className="push-double-bottom text-left">
        We know life is busy!
        We would be happy to remind you about restarting your schedules at a later date.
      </p>

      <Forms.Form
        classes={["text-left", "hard", "push-top"]}
        submit={onSubmit}
        id="remind"
      >
        <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
          I'd like to be reminded
        </h3>

        <Forms.Select
          items={reminderFrequency}
          name="frequency"
          id="remind-frequency"
          hideLabel={true}
          classes={["soft-bottom", "display-inline-block"]}
          inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom`}
          includeBlank={false}
          defaultValue="tomorrow"
        />

        <button className="one-whole btn push-ends">
          Remind Me Later
        </button>

        <button
          className="btn--thin btn--small btn--dark-tertiary one-whole"
          onClick={back}
        >
          Back to Gifts
        </button>

      </Forms.Form>

    </div>
  )
}

export default Remind
