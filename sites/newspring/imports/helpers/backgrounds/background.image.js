
function backgroundImage(contentItem, { label="1:1" } = {}) {

  const images = contentItem.content ?
                  contentItem.content.images :
                  undefined;
  const channel = contentItem.channelName;

  let bgImage = _.find(images, (image) => {
    return image.fileLabel === label
  });

  if (!bgImage) {
    if (channel === "devotionals") {
      let editorialImage = _.find(images, (image) => {
        return image.fileLabel === "2:1"
      });
      let inlineImage = _.find(images, (image) => {
        return image.fileLabel === "inline"
      });
      let defaultImage = _.find(images, (image) => {
        return image.fileLabel === "default"
      });
      if (editorialImage) bgImage = editorialImage;
      else if (inlineImage) bgImage = inlineImage;
      else if (defaultImage) bgImage = defaultImage;
      else if (images) bgImage = images[0];
    } else if (images) {
      bgImage = images[0]
    }
  }

  if (bgImage) {
    if (bgImage.cloudfront && bgImage.cloudfront !== "false") bgImage = bgImage.cloudfront;
    else if (bgImage.s3) bgImage = bgImage.s3;
  } else {
    bgImage = "";
  }

  return bgImage
}

export default backgroundImage
