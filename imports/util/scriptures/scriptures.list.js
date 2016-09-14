

function scriptureList(contentItem, { commas = true } = {}) {
  const scriptures = contentItem.content.scripture;
  if (!scriptures && commas) return [];
  if (!scriptures) return [];

  const combo = scriptures.map(({ book, passage }) => (
    `${book} ${passage}`
  ));

  if (commas) return combo.join(", ");
  return combo;
}

export default scriptureList;
