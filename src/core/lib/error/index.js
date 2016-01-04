
import { inherit } from '../util/inherit'


// Makes an error subclass which properly contains a stack trace in most
// environments. constructor can set fields on `this` (and should probably set
// `message`, which is what gets displayed at the top of a stack trace).
//
function makeErrorType(name, constructor) {
  let errorClass = function (/*arguments*/) {
    let self = this

    // Ensure we get a proper stack trace in most Javascript environments
    if (Error.captureStackTrace) {
      // V8 environments (Chrome and Node.js)
      Error.captureStackTrace(self, errorClass)
    } else {
      // Firefox
      let e = new Error
      e.__proto__ = errorClass.prototype
      if (e instanceof errorClass) {
        self = e
      }
    }
    // Safari magically works.

    constructor.apply(self, arguments)

    self.errorType = name

    return self
  }

  inherit(errorClass, Error)

  return errorClass
}


/**
 * @summary This class represents a symbolic error thrown by a method.
 * @locus Anywhere
 * @class
 * @param {String} error A string code uniquely identifying this kind of error.
 * This string should be used by callers of the method to determine the
 * appropriate action to take, instead of attempting to parse the reason
 * or details fields. For example:
 *
 * @param {String} [reason] Optional.  A short human-readable summary of the
 * error, like 'Not Found'.
 * @param {String} [details] Optional.  Additional information about the error,
 * like a textual stack trace.
*/

const ApollosError = makeErrorType(
  'Apollos.Error',
  function (error, reason, details) {

    // String code uniquely identifying this kind of error.
    this.error = error

    // Optional: A short human-readable summary of the error. Not
    // intended to be shown to end users, just developers. ("Not Found",
    // "Internal Server Error")
    this.reason = reason

    // Optional: Additional information about the error, say for
    // debugging. It might be a (textual) stack trace if the server is
    // willing to provide one. The corresponding thing in HTTP would be
    // the body of a 404 or 500 response. (The difference is that we
    // never expect this to be shown to end users, only developers, so
    // it doesn't need to be pretty.)
    this.details = details

    // This is what gets displayed at the top of a stack trace. Current
    // format is "[404]" (if no reason is set) or "File not found [404]"
    if (this.reason) {
      this.message = `[${this.error}] - ${this.reason}`
    } else {
      this.message = `[${this.error}]`
    }

  }
)

export default ApollosError
