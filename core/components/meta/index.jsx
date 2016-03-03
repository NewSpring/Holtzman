
import Helmet from "react-helmet"

import { generateData } from "./metadata"

const Meta = (props) => (
  <Helmet {...generateData(props)} />
)

export default Meta
