
import { Error } from "../../../core/components/icons"

const Err = ({ error }) => (
  <div className="soft soft-double-ends push-double-top one-whole text-center">
    <div className="push-double-top">
      <Error />
      <h3 className="text-alert push-ends">Uh Oh! Looks like there was a problem processing your gift!</h3>
      <p className="text-left">
        Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </p>
      <p className="test-dark-tertiary text-left"><em>
        If you would like a member of our customer support team to follow up with you regarding this error, click <a href="#">here</a>
      </em></p>
    </div>
  </div>
)

export default Err
