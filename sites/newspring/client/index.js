
import { GraphQL } from "apollos/dist/core/graphql";
import { run } from "apollos/dist/core/router/client";
import { routes, client } from "/imports"

run(routes, client);
