

function sectionImage(images) {

  let bgImage = _.find(images, (image) => {
    return image.fileLabel === "1:1"
  });

  if (!bgImage) {
    bgImage = images[0];
  }

  if (bgImage) {
    if (bgImage.cloudfront) bgImage = bgImage.cloudfront;
    else if (bgImage.s3) bgImage = bgImage.s3;
  } else {
    bgImage = "";
  }

  return bgImage

}

export default sectionImage
