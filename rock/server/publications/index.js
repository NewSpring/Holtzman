
import person from "./person"

const publications = {
  person,

}

const publish = () => {
  for (let publication in publications) {
    publications[publication]()
  }
}

export default {
  person,
  publish
}
