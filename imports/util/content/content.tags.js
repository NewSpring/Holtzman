
function tags(contentItem) {
  let tags = contentItem.content.tags;
  if (typeof tags === "string") tags = tags.split(",")
  if (tags[0] === "") return []
  return tags.map((tag) => {
    return `#${tag}`
  });
}

export default tags
