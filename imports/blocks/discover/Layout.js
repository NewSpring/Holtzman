import { PropTypes } from "react";
import Results from "./Results";
import Feed from "./feed";

const Content = ({ loadMore, search }) => {
  if (search.searching) {
    return <Results loadMore={loadMore} search={search} />;
  }

  return <Feed />;
};

const getStyle = () => {
  const style = {};

  if (process.env.NATIVE) {
    style.marginTop = "50px";
  }

  return style;
};

const SearchLayout = ({ loadMore, search }) => (
  <section className="hard" style={getStyle()}>
    <Content loadMore={loadMore} search={search} />
  </section>
);

Content.propTypes = {
  loadMore: PropTypes.func,
  search: PropTypes.func,
};

SearchLayout.propTypes = {
  loadMore: PropTypes.func,
  search: PropTypes.func,
};

export default SearchLayout;
