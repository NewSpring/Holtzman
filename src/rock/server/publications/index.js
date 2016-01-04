
import person from './person'
import campuses from './campuses'

const publications = {
  person,
  campuses
}

const publish = () => {
  for (let publication in publications) {
    publications[publication]()
  }
}

export default {
  person,
  campuses,
  publish
}
