import { Component, PropTypes} from "react"
import { Link } from "react-router"

import { VelocityTransitionGroup } from "velocity-react"

const Item = ({ section, go }) => {
  if (!section) {
    return (
      <div className="one-half grid__item">
        <div className="rounded ratio--square">
          <div className="ratio__item"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="one-half grid__item push-bottom">
      <Link
        to={section.path || section.offsite}
        className="plain"
        onClick={go}
      >
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

export default class SectionItem extends Component {

  static PropTypes = {
    sections: PropTypes.array,
    hide: PropTypes.func.isRequired
  }

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

    this.props.hide()

  }

  renderChildren = () => {
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

          {children.map((sectionItem, i) => (
            <Item section={sectionItem} key={i} go={this.expandOrGo} />
          ))}

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
                {sections.map((sectionItem, i) => (
                  <Item section={sectionItem} key={i} go={this.expandOrGo} />
                ))}
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
            {this.renderChildren()}
          </VelocityTransitionGroup>
        </div>
      </div>
    )


  }
}
