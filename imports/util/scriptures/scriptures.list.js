

function scriptureList(contentItem, { commas = true } = {}) {
  const scriptures = contentItem.content.scripture;
  if (!scriptures && commas) return;
  if (!scriptures) return [];

  const { book, passage } = scriptures;

  const combo = scriptures.map(({ book, passage }, i) => {
    return `${book} ${passage}`;
  });

  if (commas) return combo.join(", ");
  return combo;
}

export default scriptureList;
