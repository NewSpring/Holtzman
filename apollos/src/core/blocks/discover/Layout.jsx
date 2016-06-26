
import Results from "./Results"
import Feed from "./feed"

const Content = ({ loadMore, search }) => {

  if (search.searching) {
    return <Results loadMore={loadMore} search={search} />
  } else {
    return <Feed />
  }

}

const getStyle = () => {
  const style = {};

  if (process.env.NATIVE) {
    style.marginTop = "50px";
  }

  return style;
};

const SearchLayout = ({ loadMore, cancel, search, hide }) => (

  <section className="hard" style={getStyle()}>

    <Content loadMore={loadMore} search={search} />

  </section>

)

export default SearchLayout
