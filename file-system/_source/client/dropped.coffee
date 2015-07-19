

ref = Template.prototype
_super = ref.events

_noop = (evt) ->
  evt.stopPropagation()
  evt.preventDefault()
  return


ref.events = (dict) ->

  self = @
  # Carry
  resultDict = {}
  # Iterate over the event bindings
  for name of dict
    # XXX: we dont currently support 'dropped #foo, dropped #bar'
    if /^dropped/.test(name)
      # Get the selector part
      selector = name.split(' ')[1]
      n = name
      if not selector
        continue

      # Block drag events
      resultDict["dragenter/dragexit/dragover/dragend #{selector}"] = _noop
      # Rig the drop event

      resultDict['drop ' + selector] = (evt, tmp) ->
        # Stop original behaviour
        _noop evt
        # Run user callback
        dict[n].apply this, [
          evt
          tmp
        ]
        return

    else
      # Pass on original
      resultDict[name] = dict[name]
  # Hand over to super
  _super.apply self, [ resultDict ]
