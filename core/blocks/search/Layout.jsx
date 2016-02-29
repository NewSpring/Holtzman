
import Input from "./Input"
import Results from "./Results"

const SearchLayout = ({ searchSubmit, loadMore, search, hide }) => (

  <section className="hard-sides hard-bottom soft-top">

    <Input searchSubmit={searchSubmit} hide={hide} />

    <Results loadMore={loadMore} search={search} />

  </section>

)

export default SearchLayout
