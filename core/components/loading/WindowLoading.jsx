
function getStyles(style) {
  const defaults = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999
  }

  return {...defaults, ....style}

}

function getClasses(mergeClasses) {
  let classes = []

  if (mergeClasses) {
    classes = [...classes, ...mergeClasses]
  }

  return classes.join(" ")
}

const Loading = ({ theme, classes, styles, children }) => (
  <div
    className={theme || getClasses(classes)}
    style={getStyles(styles)}
  >
    {children}
  </div>
)

export default Loading
