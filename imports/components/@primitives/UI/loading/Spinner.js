import PropTypes from 'prop-types';
import { css } from "aphrodite";
import Styles from "./spinner-css";

function getClasses(mergeClasses) {
  let classes = [
    css(Styles.loader),
  ];

  if (mergeClasses) {
    classes = classes.concat(mergeClasses);
  }

  return classes.join(" ");
}

const Spinner = ({ theme, styles, classes }) => (
  <div
    className={theme || getClasses(classes)}
    style={styles || {}}
  />
);

Spinner.propTypes = {
  theme: PropTypes.string,
  styles: PropTypes.object, // eslint-disable-line
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

export default Spinner;

export {
  getClasses,
};
