
function speakers(contentItem) {
  let contentSpeakers = [];

  if (contentItem.content.speaker.indexOf(",") > -1) {
    contentSpeakers = contentItem.content.speaker.split(",");
  } else {
    contentSpeakers = contentItem.content.speaker.split("\n");
  }

  return contentSpeakers.map((speaker) => {
    const words = speaker.split(" ");
    return words.map((word) => (
      word.charAt(0).toUpperCase() +
        word.substr(1, word.length - 1)
    )).join(" ");
  }).join(", ");
}

export default speakers;
