
function backgroundImage(contentItem, { label = "1:1" } = {}) {
  let images = contentItem.content ?
                  contentItem.content.images :
                  undefined;
  if ((!images || !images.length) && contentItem.parent && contentItem.parent.content) {
    images = contentItem.parent.content.images || undefined;
  }
  const channel = contentItem.channelName;

  let bgImage = _.find(images, image => (
    image.fileLabel === label
  ));

  if (!bgImage) {
    if (channel === "devotionals") {
      const editorialImage = _.find(images, image => (
        image.fileLabel === "2:1"
      ));
      const inlineImage = _.find(images, image => (
        image.fileLabel === "inline"
      ));
      const defaultImage = _.find(images, image => (
        image.fileLabel === "default"
      ));
      if (editorialImage) bgImage = editorialImage;
      else if (inlineImage) bgImage = inlineImage;
      else if (defaultImage) bgImage = defaultImage;
      else if (images) bgImage = images[0];
    } else if (images) {
      bgImage = images[0];
    }
  }

  if (bgImage) {
    if (bgImage.url) bgImage = bgImage.url;

    // for backwards compatability
    else if (bgImage.cloudfront && bgImage.cloudfront !== "false") bgImage = bgImage.cloudfront;
    else if (bgImage.s3) bgImage = bgImage.s3;
  } else {
    bgImage = "";
  }

  return bgImage;
}

export default backgroundImage;
