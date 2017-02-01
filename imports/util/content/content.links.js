
function contentLink(contentItem) {
  const entryId = contentItem.entryId || contentItem.id;
  const category = contentItem.channelName;
  const seriesId = contentItem.parent && (contentItem.parent.entryId || contentItem.parent.id);

  switch (category) {
    case "series_newspring":
      return `/series/${entryId}`;
    case "sermons":
      return `/series/${seriesId}/sermon/${entryId}`;
    case "studies":
      return `/studies/${entryId}`;
    case "study_entries":
      return `/studies/${seriesId}/entry/${entryId}`;
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
    case "newspring_now":
      return `/events/${entryId}`;
    default:
      return null;

  }
}

export default contentLink;
