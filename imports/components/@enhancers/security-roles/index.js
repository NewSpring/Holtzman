
import { graphql } from "react-apollo";
import intersection from "lodash.intersection";
import gql from "graphql-tag";

export const SECURITY_ROLES_QUERY = gql`
  query GetSecurityRoles {
    currentPerson{
      roles {
        name
        id
      }
    }
  }
`;

export const authorized = (data, roles) => {
  const auth = !data.loading && intersection(
    data.currentPerson.roles.map((x) => x.name), roles
  ).length > 0;
  return auth;
};

export const canSee = (roles) => graphql(SECURITY_ROLES_QUERY, {
  props: ({ data }) => ({
    person: {
      ...data,
      authLoading: data.loading,
      authorized: authorized(data, roles),
    },
  }),
});

export const isStaff = canSee(["Hello"]);

