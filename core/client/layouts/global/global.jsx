
import { Component, PropTypes } from "react"

import { Nav, Modal } from "../../blocks"

const Global = ({children}) => (
  <div className="
    push-double-bottom@handheld soft-bottom@handheld
    push-double-left@lap-and-up soft-double-left@lap-and-up
    "
  >
    {children}
    <Nav />
    <Modal/>
  </div>
)

export default Global
