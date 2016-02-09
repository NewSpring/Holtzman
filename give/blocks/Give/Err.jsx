
import { Error } from "../../../core/components/icons"

const Err = ({ msg }) => (
  <div className="soft soft-double-ends push-double-top one-whole text-center">
    <div className="push-double-top">
      <Error />
      <h3 className="text-alert push-ends">Uh Oh! Looks like there was a problem processing your gift!</h3>
      <p className="text-left">
        {msg}
      </p>
      <p className="test-dark-tertiary text-left"><em>
        If you would like a member of our customer support team to follow up with you regarding this error, click <a href="#">here</a>
      </em></p>
    </div>
  </div>
)

export default Err
