
import Input from "./Input"
import Results from "./Results"
import Discover from "./Discover"

const Content = ({ loadMore, search }) => {

  if (search.searching) {
    return <Results loadMore={loadMore} search={search} />
  } else {
    return <Discover />
  }

}

const SearchLayout = ({ searchSubmit, loadMore, cancel, search, hide }) => (

  <section className="hard-sides hard-bottom soft-top">

    <Input searchSubmit={searchSubmit} cancel={cancel} />

    <Content loadMore={loadMore} search={search} />

  </section>

)

export default SearchLayout
