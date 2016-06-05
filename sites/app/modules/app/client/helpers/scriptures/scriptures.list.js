

function scriptureList(contentItem, { commas=true } = {}) {
  let scriptures = contentItem.content.scripture;

  if (scriptures === "false") {
    if (commas) {
      return
    } else {
      return []
    }
  }

  scriptures = scriptures.split("\n");
  scriptures = _.filter(scriptures, (scripture) => {
    return scripture !== ""
  });

  let books = _.filter(scriptures, (scripture, i) => {
    return i % 2 === 0
  });
  let verses = _.filter(scriptures, (scripture, i ) => {
    return i % 2 === 1
  });
  let combo = books.map((book, i) => {
    return `${book} ${verses[i]}`
  });

  if (commas) {
    return combo.join(", ")
  } else {
    return combo
  }
}

export default scriptureList
