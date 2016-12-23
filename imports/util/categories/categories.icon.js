

function categoryIcon(contentItem) {
  const category = contentItem.channelName;

  switch (category) {
    case "series_newspring":
    case "series":
    case "sermons":
      return "icon-category-video";
    case "newspring_albums":
      return "icon-category-audio";
    case "articles":
    case "devotionals":
    case "stories":
    case "news":
    case "study":
    case "study_entries":
    default:
      return "icon-category-text";
  }
}

export default categoryIcon;
