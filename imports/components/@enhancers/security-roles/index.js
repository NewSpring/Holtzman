
import { graphql } from "react-apollo";
import { intersection } from "lodash";
import gql from "graphql-tag";

export const SECURITY_ROLES_QUERY = gql`
  query GetSecurityRoles {
    currentPerson{
      roles {
        name
        id
        groupId: entityId
      }
    }
  }
`;

export const authorized = (data, roles) => {
  const auth = !data.loading && intersection(data.roles.map((x) => x.name), roles).length > 0;
  return auth;
};

export const canSee = (roles) => graphql(SECURITY_ROLES_QUERY, {
  props: ({ data }) => ({
    ...data,
    authorized: authorized(data, roles),
  }),
});

export const isStaff = canSee(["Hello"]);

