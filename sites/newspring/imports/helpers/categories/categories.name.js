
function categoryName(contentItem) {
  let category = contentItem.channelName;

  switch(category) {
    case "series_newspring":
      return "Series"
    case "newspring_albums":
      return "Albums"
    default:
      let categoryName = category.charAt(0).toUpperCase();
      if (category.charAt(category.length - 2) === "s") {
        // capitlize first letter and remove "s" from end
        categoryName += category.substr(1, category.length-2);
      }
      else {
        categoryName += category.substr(1, category.length-1);
      }
      return categoryName
  }
}

export default categoryName
