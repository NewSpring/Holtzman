

import { inherit } from "./inherit"
import { base64Encode } from "./encode"
import { makeNewGuid } from "./guid"
import XML from "./xml"

import Error from "./error"
import format from "./format"
import regex from "./regex"
import rock from "./rock"
import validate from "./validate"

export default {
  inherit,
  base64Encode,
  makeNewGuid,
  parseXML: XML.parse,
  Error,
  format,
  regex,
  rock,
  validate
}
