import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import ReactDom from "react-dom"
import {VelocityComponent, VelocityTransitionGroup } from "velocity-react"


import { modal } from "../../actions"


@connect()
export default class Item extends Component {

  state = {
    section: null
  }

  expandOrGo = (e) => {

    const { id } = e.target

    for (let section of this.props.sections) {
      if (section._id === id && section.children) {

        e.preventDefault()
        if (this.state.section != null && this.state.section._id === id) {
          this.setState({ section: null })
        } else {
          this.setState({ section: section })
        }

        return

      }
    }

    this.props.dispatch(modal.hide())

  }



  item = (section, i) => {

    if (!section) {
      return (
        <div className="one-half grid__item" key={i}>
          <div className="rounded ratio--square">
            <div className="ratio__item"></div>
          </div>
        </div>
      )
    }

    return (
      <div className="one-half grid__item push-bottom" key={i}>
        <Link to={section.path || section.external} className="plain" onClick={this.expandOrGo}>
          <div
            id={section._id}
            className="overlay--gradient background--fill background--dark-tertiary rounded ratio--square floating--bottom floating--left"
            style={{backgroundImage: `url(${section.image})`}}
            >
            <div className="overlay__item floating__item ratio__item">
              <h6 className="text-light-primary soft-left">{section.name}</h6>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  children = () => {
    const { section } = this.state

    if (!section) {
      return null
    }

    let children = []

    for (let child in section.children) {
      children.push(section.children[child])
    }

    return (
      <div className="soft-sides soft-top background--dark-primary push-bottom">
        <h4 className="text-light-primary text-center">{section.name}</h4>
        <div className="grid ">

          {children.map((sectionItem, i) => {
            return this.item(sectionItem, i)
          })}

        </div>
      </div>

    )

  }

  render () {

    const { sections } = this.props

    return (
      <div>
        <div className="soft-sides">
          <div className="grid">
            <div className="grid__item one-whole" >
              <div className="grid">
                {this.item(sections[0])}
                {this.item(sections[1])}
              </div>

            </div>
          </div>
        </div>

        <div className="one-whole">
          <VelocityTransitionGroup
            enter={{
              animation: "slideDown", duration: 250
            }}
            leave={{
              animation: "slideUp", duration: 250
            }}
          >
            {this.children()}
          </VelocityTransitionGroup>
        </div>
      </div>
    )


  }
}
