
import Moment from "moment"

const Later = ({ date, onClick }) => (
  <div className="soft soft-double-ends one-whole text-center">

    <h4 className="text-center push-ends">
      Sounds Great!
    </h4>

    <p className="text-left">
      We will remind you about your contributions on <strong>
      {Moment(date).format("dddd, MMMM Do")}
      </strong>!
      If you would like to reset your schedules before then, please contact our Finance Team at 864-965-9990 or <a target="_blank" href="//rock.newspring.cc/workflows/177">contact us </a>
    </p>

    <button className="one-whole btn push-ends" onClick={onClick}>
      Close
    </button>

  </div>
)


export default Later
