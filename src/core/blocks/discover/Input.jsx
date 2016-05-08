
const Input = ({ searchSubmit, cancel, showCancel }) => (
  <section className="soft-double-ends background--light-primary">

    {(() => {
      if (showCancel) {
        return (
          <button onClick={cancel} className="locked-right push-right push-half-top">
            <small>Cancel</small>
          </button>
        )
      }
    })()}

    <form onSubmit={searchSubmit} className={`hard ${showCancel ? "push-double-right" : ""}`}>
      <div className={`input hard-bottom ${showCancel ? "push-right" : ""}`}>
        <i className="icon-search locked-left push-half-top"></i>
        <input
          id="search"
          type="text"
          className="h5 text-dark-primary"
          autoComplete="off"
          style={{ paddingLeft: "30px" }}
        />
      </div>
    </form>
  </section>
)

export default Input
