

function scriptureList(contentItem, { commas = true } = {}) {
  const scriptures = contentItem.content.scripture;
  // XXX i'm not sure this check is necessary
  if (!scriptures && commas) return [];
  if (!scriptures) return [];

  const combo = scriptures.map(({ book, passage }) => (
    `${book} ${passage}`
  ));

  if (commas) return combo.join(", ");
  return combo;
}

export default scriptureList;
