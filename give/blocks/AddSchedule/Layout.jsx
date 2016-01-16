
import GiveNow from "../ActionButtons"
import { Forms, Loading } from "../../../core/components"

// <div className="display-inline-block">
//
//
//   <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
//     I want this to start on&nbsp;
//   </h3>
//
//   <Forms.Input
//     name="date"
//     hideLabel={true}
//     ref="date"
//     classes={["soft-bottom", "input--active", "display-inline-block"]}
//     inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
//     placeholder="select date"
//     style={{width: "200px"}}
//   />
//
// </div>


const Layout = ({ schedules, setFrequency, accounts, setFund, state, save, format, total }) => (

  <div className="push-top@handheld soft-half-top@lap-and-up">
    <Forms.Form
      classes={["text-left", "hard"]}
      submit={(e) => {e.preventDefault()}}
      id="add-to-cart"
    >
      <Forms.Select
        items={schedules}
        name="schedules"
        id={`schedules`}
        hideLabel={true}
        ref="schedules"
        classes={["soft-bottom", "display-inline-block"]}
        inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom`}
        includeBlank={true}
        placeholder="Choose frequency"
        onChange={setFrequency}
      />

      <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
        &nbsp;I'd like to give to&nbsp;
      </h3>
      <Forms.Select
        items={accounts}
        name="select-account"
        id={`select`}
        hideLabel={true}
        ref="select-account"
        classes={["soft-bottom", "display-inline-block"]}
        inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom`}
        placeholder="select fund here"
        onChange={setFund}
      />

      <div className="display-inline-block">


        <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
          with&nbsp;
        </h3>

        <Forms.Input
          id={state.fundId || -1}
          name={state.fundLabel || "primary-account"}
          hideLabel={true}
          ref="primary-account"
          classes={["soft-bottom", "input--active", "display-inline-block"]}
          inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
          placeholder="$0.00"
          validate={save}
          format={format}
          style={{width: "200px"}}
          disabled={!state.fundId}
        />

      </div>



      <div className="push-top">
        <GiveNow
          disabled={total <= 0}
          disabledGuest={true}
        />
      </div>

    </Forms.Form>
  </div>
)
