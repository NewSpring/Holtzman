import PropTypes from 'prop-types';

const Offline = ({ link = "finance@newspring.cc" }) => (
  <div>
    <h3 className="text-dark-tertiary">
      Unfortunately our giving service is offline.
    </h3>
    <p>
      We are working to resolve this as fast as possible.
      We are sorry for any inconvience this may have caused.
    </p>
    <p>
      <em>
        We appreciate your patience. If you have any questions
        please contact us at <a href={`mailto:${link}`}>
          {link}
        </a>
      </em>
    </p>
  </div>
);

Offline.propTypes = {
  link: PropTypes.string,
};

export default Offline;
