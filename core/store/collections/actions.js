
import types from "./types"

export default {
  insert: (collection, data) => ({ type: types.INSERT, collection, data }),
  remove: (collection, data) => ({ type: types.REMOVE, collection, data }),
}
