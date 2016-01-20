

import alive from "./alive"
import campuses from "./campuses"
import likes from "./likes"
import person from "./person"
import sections from "./sections"
import users from "./users"

const publish = () => {
  let rockPublications = {
    campuses,
    person,
    alive
  }

  for (let pub in rockPublications) {
    rockPublications[pub]()
  }
}

export default publish
