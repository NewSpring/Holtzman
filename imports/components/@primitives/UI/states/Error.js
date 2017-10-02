import PropTypes from 'prop-types';
import { WindowLoading } from "../loading";

const Err = ({ msg, error, style }) => {
  let errorMessage;
  if (typeof error !== "string") {
    if (error && error.message) {
      errorMessage = error.message;
    } else if (error && error.error && typeof error.error === "string") {
      errorMessage = error.error;
    } else {
      errorMessage = "An unexpected error occured";
    }
  } else {
    errorMessage = error;
  }

  return (
    <WindowLoading classes={["background--alert"]} styles={style}>
      <div className="locked-top locked-bottom one-whole floating">
        <div className="floating__item">
          <h4 className="text-light-primary">{msg}</h4>
          <p className="text-light-primary hard">{errorMessage}</p>
        </div>
      </div>
    </WindowLoading>
  );
};

Err.propTypes = {
  msg: PropTypes.string.isRequired,
  error: PropTypes.object,
  style: PropTypes.object,
};

export default Err;
