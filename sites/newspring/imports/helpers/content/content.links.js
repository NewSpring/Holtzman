
function contentLink(contentItem) {
  const entryId = contentItem.entryId || contentItem.id;
  const category = contentItem.channelName;

  switch(category) {
    case "series_newspring":
      return `/series/${entryId}`
    case "sermons":
      const seriesId = contentItem.parent && contentItem.parent.entryId;
      return `/series/${seriesId}/sermon/${entryId}`
    case "devotionals":
      return `/devotions/${entryId}`
    case "newspring_albums":
      return `/music/${entryId}`
    case "articles":
      return `/articles/${entryId}`
    case "stories":
      return `/stories/${entryId}`

  }
}

export default contentLink
