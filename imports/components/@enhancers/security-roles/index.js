import { graphql } from "react-apollo";
import { intersection } from "ramda";
import gql from "graphql-tag";

export const SECURITY_ROLES_QUERY = gql`
  query GetSecurityRoles {
    currentPerson {
      roles {
        name
        id
      }
    }
  }
`;

export const authorized = (data, roles) => {
  const auth =
    !data.loading &&
    data.networkStatus !== 7 &&
    data.currentPerson &&
    data.currentPerson.roles &&
    intersection(data.currentPerson.roles.map(x => x.name), roles).length > 0;
  return auth;
};

// XXX skip if not logged in
export const canSee = roles =>
  graphql(SECURITY_ROLES_QUERY, {
    props: ({ data }) => ({
      person: {
        ...data,
        authLoading: data.loading && data.networkStatus !== 7,
        authorized: authorized(data, roles),
      },
    }),
  });
