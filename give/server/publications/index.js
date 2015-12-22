
import accounts from "./accounts"
import transactions from "./transactions"

const publications = {
  accounts,
  transactions
}

const publish = () => {
  for (let publication in publications) {
    publications[publication]()
  }
}

export default {
  accounts,
  transactions,
  publish
}
