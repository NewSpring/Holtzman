
function base64Encode(str) {
  if (Buffer) {
    return new Buffer(str).toString('base64')
  }
}

export { base64Encode }
