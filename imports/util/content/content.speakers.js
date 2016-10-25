
function speakers(contentItem) {
  const contentSpeakers = contentItem.content.speaker.split(",");

  return contentSpeakers.map((speaker) => {
    const words = speaker.split(" ");
    return words.map((word) => (
      word.charAt(0).toUpperCase() +
        word.substr(1, word.length - 1)
    )).join(" ");
  }).join(", ");
}

export default speakers;
