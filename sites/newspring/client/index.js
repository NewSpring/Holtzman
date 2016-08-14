if (Meteor.settings.public.sentry && typeof Raven != "undefined") {
  Raven.config(Meteor.settings.public.sentry).install()
}
import { GraphQL } from "apollos-core/dist/core/graphql";
import { run } from "apollos-core/dist/core/router/client";
import { routes, client } from "/imports"

run(routes, client);
