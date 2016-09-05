import { PropTypes } from "react"
import { WindowLoading } from "../loading"

const Err = ({msg, error, style}, context) => {

  if (typeof error != "string") {
    if (error.message) {
      error = error.message
    } else if (error.error && typeof error.error === "string") {
      error = error.error
    } else {
      error = "An unexpected error occured"
    }
  }

  return (
    <WindowLoading classes={["background--alert"]} styles={style}>
      <div className="locked-top locked-bottom one-whole floating">
        <div className="floating__item">
          <h4 className="text-light-primary">{msg}</h4>
          <p className="text-light-primary hard">{error}</p>
        </div>
      </div>
    </WindowLoading>
  )

}

Err.contextTypes = {
  shouldAnimate: PropTypes.bool
}

export default Err
