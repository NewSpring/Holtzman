
import collectionColor from "./collections.color"

function collectionClass(contentItem) {
  return `overlay-color--${collectionColor(contentItem)}`
}

export default collectionClass
