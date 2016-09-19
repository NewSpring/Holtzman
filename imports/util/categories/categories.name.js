
function categoryName(contentItem) {
  const category = contentItem.channelName;
  let contentCategory = category.charAt(0).toUpperCase();

  switch (category) {
    case "series_newspring":
      return "Series";
    case "newspring_albums":
      return "Albums";
    default:
      if (category.charAt(category.length - 2) === "s") {
        // capitlize first letter and remove "s" from end
        contentCategory += category.substr(1, category.length - 2);
      } else {
        contentCategory += category.substr(1, category.length - 1);
      }
      return contentCategory;
  }
}

export default categoryName;
