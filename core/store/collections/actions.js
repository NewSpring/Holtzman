
import types from "./types"

export default {
  insert: (collection, data) => ({ types: types.INSERT, collection, data }),
  remove: (collection, data) => ({ types: types.INSERT, collection, data }),
}
