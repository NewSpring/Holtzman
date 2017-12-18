
function collectionColor(contentItem) {
  const content = contentItem.content;
  if (content && content.colors && content.colors.length > 0) {
    const primaryColor = _.find(content.colors, color => (
      color.description === "primary"
    ));
    return primaryColor ? primaryColor.value : content.colors[0].value;
  }
  return "000";
}

export default collectionColor;
