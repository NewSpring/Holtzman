

import { addReducer } from "apollos/core/store"
import audio from "./audio"
import header from "./header"

addReducer({ audio })

export default {
  audio,
  header
}
