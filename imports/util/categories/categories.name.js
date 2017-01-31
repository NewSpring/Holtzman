
function categoryName(contentItem) {
  const category = contentItem.channelName;
  let contentCategory = category.charAt(0).toUpperCase();

  switch (category) {
    case "study_entries":
      return "Devotionals";
    case "series_newspring":
      return "Series";
    case "newspring_albums":
      return "Albums";
    case "promotions_newspring":
      return "Need To Know";
    default:
      // XXX this handles the case of `articless` but not `articles`
      // i think this is wrong
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
