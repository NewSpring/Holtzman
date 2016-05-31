
function siteLink(contentItem, parentItem) {
  const siteUrl = "https://newspring.cc";
  const slug = contentItem.meta.urlTitle;
  const category = contentItem.channelName;

  switch(category) {
    case "series_newspring":
      return `${siteUrl}/sermons/${slug}`
    case "sermons":
      const seriesSlug = parentItem.meta.urlTitle;
      return `${siteUrl}/sermons/${seriesSlug}/${slug}`
    case "devotionals":
      return `${siteUrl}/devotionals/${slug}`
    case "albums":
      return `${siteUrl}/music/${slug}`
    case "articles":
      return `${siteUrl}/articles/${slug}`
    case "stories":
      return `${siteUrl}/stories/${slug}`

  }
}

export default siteLink
