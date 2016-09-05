import { PropTypes } from "react"
import { WindowLoading, Spinner } from "../loading"

const Loading = ({msg, style}, context) => (
  <WindowLoading styles={style} classes={["background--primary"]}>
    <div className="locked-top locked-bottom one-whole floating">
      <div className="floating__item">
        <Spinner styles={{borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px"}}/>
        <h4 className="text-light-primary">{msg}</h4>
      </div>
    </div>
  </WindowLoading>
)

Loading.contextTypes = {
  shouldAnimate: PropTypes.bool
}

export default Loading
