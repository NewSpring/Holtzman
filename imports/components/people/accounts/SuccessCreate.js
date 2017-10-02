import PropTypes from 'prop-types';

const Success = ({ email, goBack }) => (

  <div className="soft soft-double-ends one-whole text-center">

    <h4 className="text-center push-ends">
      Thanks for finishing your account!
    </h4>

    <p className="text-left">
      Congratulations on setting up your NewSpring account!
      This will help us to serve you better in your walk with Jesus.
      We have sent an email to <span className="text-primary">{email}</span> with instructions on finishing your account.
    </p>

    <button className="btn--thin btn--small btn--dark-tertiary one-whole " onClick={goBack}>
      Back
    </button>

  </div>
);

Success.propTypes = {
  email: PropTypes.string,
  goBack: PropTypes.function,
};

export default Success;
