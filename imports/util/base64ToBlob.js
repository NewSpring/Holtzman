
const decodeBase64 = string => atob(string);

const getLength = value => value.length;

const buildByteArray = (string, stringLength) => {
  const buffer = new ArrayBuffer(stringLength);
  const array = new Uint8Array(buffer);
  for (let i = 0; i < stringLength; i += 1) { array[i] = string.charCodeAt(i); }
  return array;
};

const createBlob = byteArray => new Blob([byteArray], { type: "application/pdf" });

export default base64String => {
  const decodedString = decodeBase64(base64String);
  const decodedStringLength = getLength(decodedString);
  const byteArray = buildByteArray(decodedString, decodedStringLength);
  return byteArray ? createBlob(byteArray) : null;
};
