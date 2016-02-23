
import types from "./types"

export default {
  // @DEPRECIATED
  insert: (collection, data) => ({ type: types.INSERT, collection, data }),

  // NEW
  upsertBatch: (collection, data, key) => ({ type: types.MONGO_INSERT_BATCH, collection, data, key }),
  remove: (collection, data) => ({ type: types.REMOVE, collection, data }),
}
