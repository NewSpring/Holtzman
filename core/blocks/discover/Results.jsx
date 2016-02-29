
import Item from "./Item"

const LoadingText = ({ search }) => {
  if (search.loading) {
    return <span>Loading...</span>
  } else {
    return <span>Load More Results</span>
  }
}

const LoadMore = ({ loadMore, search }) => {
  if (!search.done) {
    return (
      <div className="text-center push-double-top">
        <button
          className="btn--dark-tertiary"
          onClick={loadMore}
        >
          <LoadingText search={search} />
        </button>
      </div>
    )
  }
  else {
    return <div></div>
  }
}

const Results = ({ loadMore, search }) => {

  if (search.none) {
    return <h6 className="soft">No results for {search.term}!</h6>
  }
  if (search.items.length > 0) {
    return (
      <section className="background--light-secondary soft-half">
        {search.items.map((item, i) => {
          return <Item item={item} key={i} />
        })}
        <LoadMore loadMore={loadMore} search={search} />
      </section>
    );
  }

  return <div></div>
}

export default Results
