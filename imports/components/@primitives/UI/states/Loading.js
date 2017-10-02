import PropTypes from 'prop-types';
import { WindowLoading, Spinner } from "../loading";

const Loading = ({ msg, style }) => (
  <WindowLoading styles={style} classes={["background--primary"]}>
    <div className="locked-top locked-bottom one-whole floating">
      <div className="floating__item">
        <Spinner styles={{ borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px" }} />
        <h4 className="text-light-primary">{msg}</h4>
      </div>
    </div>
  </WindowLoading>
);

Loading.propTypes = {
  msg: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Loading;
