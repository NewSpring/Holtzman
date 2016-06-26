

function categoryIcon(contentItem) {
  const category = contentItem.channelName;

  switch(category) {
    case "series_newspring":
    case "sermons":
      return "icon-category-video"
    case "newspring_albums":
      return "icon-category-audio"
    case "articles":
    case "devotionals":
    case "stories":
      return "icon-category-text"
  }
}

export default categoryIcon
