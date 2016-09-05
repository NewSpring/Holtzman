
import collectionClass from "../collections/collections.class"
import collectionColor from "../collections/collections.color"

// TODO: can we do this better with CSS modules?
// no support for inline styles for pseudo elements
function overlayStyles(contentItem) {
  return `
    .${collectionClass(contentItem)}:after{
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #${collectionColor(contentItem)} 100%);
    }
  `
}

export default overlayStyles
