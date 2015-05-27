Apollos.Router = FlowRouter;

if (Meteor.isClient) {
    Apollos.Layout = FlowLayout;
}

if (Meteor.isServer) {
    Apollos.Layoute = function () {};
}