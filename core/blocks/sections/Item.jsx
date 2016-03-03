import { Component, PropTypes} from "react"
import { Link } from "react-router"

import { VelocityTransitionGroup } from "velocity-react"


const ChildItem = ({ section, go }) => {
  if (!section) {
    return (
      <div className="one-whole grid__item">
        <div className="rounded ratio--landscape">
          <div className="ratio__item"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="one-whole soft-half-left grid__item push-half-bottom">
      <Link
        to={section.link}
        className="plain"
        onClick={go}
      >
        <div
          id={section.id}
          className="overlay--solid-medium background--fill background--dark-tertiary rounded ratio--thin floating--bottom floating--left"
          style={{backgroundImage: `url(${section.image})`}}
          >
          <div className="overlay__item floating__item ratio__item">
            <h6 className="text-light-primary soft-left">{section.text}</h6>
          </div>
        </div>
      </Link>
    </div>
  )
}

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
    <div className="one-half soft-half-left grid__item push-half-bottom">
      <Link
        to={section.link}
        className="plain"
        onClick={go}
      >
        <div
          id={section.id}
          className="overlay--gradient background--fill background--dark-tertiary rounded ratio--square floating--bottom floating--left"
          style={{backgroundImage: `url(${section.image})`}}
          >
          <div className="overlay__item floating__item ratio__item">
            <h6 className="text-light-primary soft-left">{section.text}</h6>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default class SectionItem extends Component {

  static propTypes = {
    sections: PropTypes.array,
    hide: PropTypes.func.isRequired
  }

  state = {
    section: null
  }

  expandOrGo = (e) => {
    const { id } = e.target

    for (let section of this.props.sections) {
      if (Number(section.id) === Number(id) && section.children.length) {
        e.preventDefault()

        // if a section is open and a different section is clicked
        // then change the opened section to the one clicked
        if (this.state.section != null && Number(this.state.section.id) !== Number(id)) {
          this.setState({ section: null });
          setTimeout(() => {
            this.setState({ section: section });
          },400);
        }

        // if a section is open and that section is clicked
        // then close the section clicked
        else if (this.state.section != null && Number(section.id) === Number(id)) {
          this.setState({ section: null })
        }

        // else nothing is open
        // and open the section clicked
        else {
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
      <div className="soft-half-right soft-left soft-top background--dark-primary push-bottom">
        {/* <h4 className="soft-half-bottom text-light-primary text-center">{section.text}</h4>*/}
        <div className="grid ">

          {children.map((sectionItem, i) => (
            <ChildItem section={sectionItem} key={i} go={this.expandOrGo} />
          ))}

        </div>
      </div>

    )

  }

  render () {

    const { sections } = this.props

    return (
      <div>
        <div className="soft-half-right soft-left">
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
