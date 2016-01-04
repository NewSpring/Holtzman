
const Util = {}
import Error from '../error'


Util.addUtil = (name, handler) => {

  if (Util[name]) {
    throw new Error(
      'Util assigned',
      `Util function ${name} is already registered`
    )
  }

  if (!handler || typeof(handler) != 'function') {
    throw new Error(
      'Util TypeError',
      `Util ${name} requires a function`
    )
  }

  Util[name] = handler
  return

}

import { inherit } from './inherit'
Util.addUtil('inherit', inherit)

import { base64Encode } from './encode'
Util.addUtil('base64Encode', base64Encode)

import { makeNewGuid } from './guid'
Util.addUtil('makeNewGuid', makeNewGuid)

import XML from './xml'
Util.addUtil('parseXML', XML.parse)


export default Util
