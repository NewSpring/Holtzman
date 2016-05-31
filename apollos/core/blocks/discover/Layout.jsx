
import Input from "./Input"
import Results from "./Results"
import Feed from "./feed"

const Content = ({ loadMore, search }) => {

  if (search.searching) {
    return <Results loadMore={loadMore} search={search} />
  } else {
    return <Feed />
  }

}

const SearchLayout = ({ searchSubmit, loadMore, cancel, search, hide }) => (

  <section className="hard">

    <Input searchSubmit={searchSubmit} cancel={cancel} showCancel={search.searching} />

    <Content loadMore={loadMore} search={search} />

  </section>

)

export default SearchLayout
