
import topics from "./topics"


const publications = {
  topics
}

const publish = () => {
  for (let publication in publications) {
    publications[publication]()
  }
}

export default {
  publish
}
