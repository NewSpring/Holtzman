
const Input = ({ searchSubmit, hide }) => (
  <section className="push-bottom">
    <button onClick={hide} className="locked-right push-right push-half-top"><small>Cancel</small></button>
    <form onSubmit={searchSubmit} className="hard push-double-right">
      <div className="input hard-bottom push-right">
        <i className="icon-search locked-left push-half-top"></i>
        <input
          id="search"
          type="text"
          className="h5 text-dark-primary soft-double-left"
          autoComplete="off"
        />
      </div>
    </form>
  </section>
)

export default Input
