

const Schemas = {};
import Error from "../error"


Schemas.addSchema = (name, schema) => {

  if (Schemas[name]) {
    throw new Error(
      "Schema assigned",
      `Schema ${name} is already registered`
    )
  }

  if (!schema || typeof(schema) != "object") {
    throw new Error(
      "Schema TypeError",
      `Schema ${name} requires an object`
    )
  }

  Schemas[name] = schema;
  return;

}


export default Schemas
