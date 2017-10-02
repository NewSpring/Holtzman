import PropTypes from 'prop-types';

const Success = ({ msg }) => (
  <div className="one-whole text-center push-double-top soft-double-top@lap-and-up">
    <h4>{msg}</h4>
  </div>
);

Success.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Success;
