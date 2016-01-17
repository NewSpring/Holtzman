import { VelocityComponent } from "velocity-react"
import { WindowLoading } from "../loading"

const Loading = ({msg}) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    runOnMount={true}
  >
    <WindowLoading classes={["background--primary"]}>
      <div className="locked-top locked-bottom one-whole floating">
        <div className="floating__item">
          <Spinner styles={{borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px"}}/>
          <h4 className="text-light-primary">{msg}</h4>
        </div>
      </div>
    </WindowLoading>
  </VelocityComponent>
)

export default Loading
