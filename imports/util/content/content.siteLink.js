
function siteLink(contentItem, parentItem) {
  const siteUrl = "https://newspring.cc";
  const slug = contentItem.meta.urlTitle;
  const category = contentItem.channelName;

  switch (category) {
    case "series_newspring":
      return `${siteUrl}/sermons/${slug}`;
    case "sermons":
      return `${siteUrl}/sermons/${parentItem.meta.urlTitle}/${slug}`;
    case "devotionals":
      return `${siteUrl}/devotionals/${slug}`;
    case "newspring_albums":
      return `${siteUrl}/music/${slug}`;
    case "articles":
      return `${siteUrl}/articles/${slug}`;
    case "stories":
      return `${siteUrl}/stories/${slug}`;
    default:
      return null;

  }
}

export default siteLink;
