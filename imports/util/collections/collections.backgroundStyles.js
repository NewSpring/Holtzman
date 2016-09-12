
import collectionClass from "./collections.class";
import collectionColor from "./collections.color";

function collectionBackgroundStyles(contentItem) {
  return `
    .${collectionClass(contentItem)} {
      background-color: #${collectionColor(contentItem)};
    }
  `;
}

export default collectionBackgroundStyles;
