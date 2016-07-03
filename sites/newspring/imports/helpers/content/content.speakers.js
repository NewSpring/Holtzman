
function speakers(contentItem) {
  const speakers = contentItem.content.speaker.split(",");

  return speakers.map((speaker) => {
    let words = speaker.split(" ");
    return words.map((word) => {
      return word.charAt(0).toUpperCase() +
        word.substr(1, word.length-1)
    }).join(" ");
  }).join(", ");
}

export default speakers
