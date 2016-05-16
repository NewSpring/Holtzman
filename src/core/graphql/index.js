
import { Lokka } from "lokka"
// import { Promise } from "es6-promise"

const LokkaTransport = class {

  send(query, variables, operationName) {
    return this.call("graphql.transport", query, variables, operationName)
      .then(({data, errors}) => {
        if (errors) {
          const message = errors[0].message;
          const error = new Meteor.Error(400, `GraphQL Error: ${message}`);
          error.rawError = errors;

          throw error;
        }

        return data;
      });
  }

  call(...args) {
    return new Promise((resolve, reject) => {
      Meteor.call(...args, (error, result) => {
        if(error) {
          return reject(error);
        }

        return resolve(result);
      });
    });
  }
};

const GraphQL = new Lokka({ transport: new LokkaTransport() })

export {
  GraphQL
}
