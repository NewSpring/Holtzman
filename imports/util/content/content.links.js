
function contentLink(contentItem) {
  const entryId = contentItem.entryId || contentItem.id;
  const category = contentItem.channelName;
  const seriesId = contentItem.parent && contentItem.parent.entryId;

  switch (category) {
    case "series_newspring":
      return `/series/${entryId}`;
    case "sermons":
      return `/series/${seriesId}/sermon/${entryId}`;
    case "devotionals":
      return `/devotions/${entryId}`;
    case "newspring_albums":
      return `/music/${entryId}`;
    case "articles":
      return `/articles/${entryId}`;
    case "stories":
      return `/stories/${entryId}`;
    case "news":
      return `/news/${entryId}`;
    default:
      return null;

  }
}

export default contentLink;
