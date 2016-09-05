
const getDefault = ({ searchSubmit, cancel, showCancel }) => (
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
);

const getApp = ({ searchSubmit, cancel, showCancel }) => (
  <div
    className="text-center soft-sides"
    style={{
      backgroundColor: "#6BAC43",
      borderBottom: "1px solid rgba(0,0,0, 0.1)",
      position: "relative",
      zIndex: 100
    }}
  >
    <form onSubmit={searchSubmit} className={`hard ${showCancel ? "push-double-right" : ""}`}>
      <div className={`input hard-bottom ${showCancel ? "push-right" : ""}`}>
        <i className="icon-search locked-left push-half-top text-light-primary"></i>
        <input
          id="search"
          type="text"
          className="h5 text-light-primary"
          autoComplete="off"
          style={{ paddingLeft: "30px", borderBottom: "none", marginTop: "7px" }}
          placeholder="Type your search here..."
        />
      </div>
    </form>
  </div>
);

const Input = ({ searchSubmit, cancel, showCancel }) => {
  if(Meteor.isCordova) {
    return getApp({ searchSubmit, cancel, showCancel });
  }

  return getDefault({ searchSubmit, cancel, showCancel });
};

export default Input
