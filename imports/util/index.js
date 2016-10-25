

import { inherit } from "./inherit";
import { base64Encode, base64Decode } from "./encode";
import makeNewGuid from "./guid";
import XML from "./xml";

import format from "./format";
import regex from "./regex";
import rock from "./rock";
import validate from "./validate";
import Debouncer from "./debounce";

const parseXML = XML.parse;

export {
  inherit,
  base64Encode,
  base64Decode,
  makeNewGuid,
  parseXML,
  format,
  regex,
  rock,
  Debouncer,
  validate,
};
