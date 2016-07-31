
import { GraphQL } from "apollos-core/dist/core/graphql";
import { run } from "apollos-core/dist/core/router/client";
import { routes, client } from "/imports"

run(routes, client);
