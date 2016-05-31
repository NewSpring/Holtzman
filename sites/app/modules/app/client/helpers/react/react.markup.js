

function createMarkup(contentItem, prop="body") {
  let content = contentItem.content[prop];
  if (content === "false") {
    content = ""
  }
  return {
    __html: content
  }
}

export default createMarkup
