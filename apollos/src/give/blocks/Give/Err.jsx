
import { Error } from "../../../core/components/icons"

const Err = ({ msg, goToStepOne, additionalMessage }) => (
  <div className="soft soft-double-ends push-double-top one-whole text-center">
    <div className="push-double-top">
      <Error />
      <h3 className="text-alert push-ends">Uh Oh! Looks like there was a problem processing your contribution!</h3>
      <p className="text-left">
        {msg}
      </p>

      {(({ goToStepOne }) => {
        if (!goToStepOne) return;
        return (
          <div className="one-whole text-center soft-ends">
            <button onClick={goToStepOne} className="btn--small btn--dark-tertiary one-whole">
              Try Again
            </button>
          </div>
        );
      })({ goToStepOne })}

      {(({ additionalMessage }) => {
        if (!additionalMessage) return;
        return <h5>{additionalMessage}</h5>;
      })({ additionalMessage })}

      <p className="test-dark-tertiary text-left"><em>
        If you would like a member of our customer support team to follow up with you regarding this error, click <a target="_blank" href="//rock.newspring.cc/workflows/152?Topic=Stewardship">here</a>
      </em></p>
    </div>
  </div>
)

export default Err
