
import { PropTypes} from "react"

import { Accounts } from "../icons"

const AccountType = ({ width, height, type }) => {

  let bottom = Number(height) / 10
  let style = {
    marginBottom: `-${bottom}px`,
    marginRight: "-6px",
    marginLeft: "6px"
  }

  if (type === "American Express") {
    type = "AmEx"
  }

  if (type === "ACH") {
    type = "Bank"
  }

  width || (width = 54)
  height || (height = 40)

  let Icon = Accounts[type]
  return <Icon width={width} height={height} style={style} />
}

AccountType.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string.isRequired,
}

AccountType.defaultProps = {
  type: "Bank"
}


export default AccountType
