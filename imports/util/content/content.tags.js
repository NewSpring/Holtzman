
function tags(contentItem) {
  let contentTags = contentItem.content.contentTags;
  if (typeof contentTags === "string") contentTags = contentTags.split(",");
  if (contentTags[0] === "") return [];
  return contentTags.map(tag => (`#${tag}`));
}

export default tags;
