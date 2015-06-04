
# Router.configure({
#   layoutTemplate: "layout"
# })
#
# Router.route "/",
#   name: "home"
#   template: "home"

Apollos.Router.route("/", {
  action: (params) ->
    Apollos.Layout.render('testLayout', { main: "home" })
})
