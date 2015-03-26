
navRendered = false

# NAV -------------------------------------------------------
Template.nav.events

  "click #global-nav": (e, t) ->
    if not navRendered
      Blaze.render Template.navItems, document.body


# NAVITEMS --------------------------------------------------
# Template.navItems.onRendered ->
#
#   if not @.isRendered then @.isRendered = true


# Template.navItems.onCreated ->
#
#   alert "created"
#
#
# Template.navItems.onDestroyed ->
#
#   alert "destroyed"
