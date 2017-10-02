import PropTypes from 'prop-types';

const Leaf = ({ size, color, type, style, className }) => {
  const computedStyles = { ...{ width: size, height: size }, ...style };
  const textStyles = { fontSize: size };

  if (computedStyles.color) {
    textStyles.color = computedStyles.color;
  }

  return (
    <div style={computedStyles} className={className}>
      <i className={`icon-${type} ${color}`} style={textStyles} />
    </div>
  );
};

Leaf.propTypes = {
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

const OutlinedLeaf = (props) => (
  <Leaf type="leaf-outline" {...props} />
);

const SolidLeaf = (props) => (
  <Leaf type="leaf-solid" {...props} />
);

const StripedLeaf = (props) => (
  <Leaf type="leaf-striped" {...props} />
);

const Logo = (props) => (
  <Leaf type="logo" {...props} />
);

export {
  OutlinedLeaf,
  SolidLeaf,
  StripedLeaf,
  Logo,
  Leaf,
};
