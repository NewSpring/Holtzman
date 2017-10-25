

function sectionImage(images) {
  let bgImage = _.find(images, image => (
    image.fileLabel === "1:1"
  ));

  if (!bgImage) {
    bgImage = images[0];
  }

  if (bgImage) {
    bgImage = bgImage.url;
  } else {
    bgImage = "";
  }

  return bgImage;
}

export default sectionImage;
