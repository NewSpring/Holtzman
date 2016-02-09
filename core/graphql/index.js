
import { Lokka } from "lokka"

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

<<<<<<< HEAD

=======
>>>>>>> 277ad2915467ce53f88e16196d84ca0534c3e61f
export {
  GraphQL
}
