
import person from "./person"
import campuses from "./campuses"
import alive from "./alive"


const publications = {
  person,
  campuses,
  alive
}

const publish = () => {
  for (let publication in publications) {
    publications[publication]()
  }
}

export default {
  person,
  campuses,
  alive,
  publish
}
