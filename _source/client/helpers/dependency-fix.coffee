
# Patch for this issue https://github.com/meteor/meteor/issues/4793
# Found here: https://github.com/meteor/meteor/issues/4793#issuecomment-129930335
#
# Fixes issue with dependencies invalidating on change in Chrome producing this error:
#   TypeError: Cannot read property 'invalidate' of undefined
#
# Meteor core team is aware and should be working on it
#
# Found in Chrome 44.0.2403.130 (64-bit)

console.log 'Patching Tracker.Dependency.prototype.changed function for https://github.com/meteor/meteor/issues/4793'

Tracker.Dependency::changed = ->
  self = @
  for id of self._dependentsById
    dependent = self._dependentsById[id]
    if dependent
      dependent.invalidate()
  return
