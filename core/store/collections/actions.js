
import types from "./types"

export default {
  insert: (collection, data) => ({ type: types.INSERT, collection, data }),
  upsertBatch: (collection, data, key) => ({ type: types.INSERT_BATCH, collection, data, key }),
  remove: (collection, data) => ({ type: types.REMOVE, collection, data }),
  clear: (collection) => ({ type: types.CLEAR, collection }),

}
