import PropTypes from 'prop-types';
import Item from "./Item";

const Groups = ({ items, hide }) => (
  <section className="hard-sides soft-half-ends">
    {items.map((section, i) => (
      <Item sections={section} key={i} hide={hide} />
    ))}
  </section>
);

Groups.propTypes = {
  items: PropTypes.array.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Groups;
