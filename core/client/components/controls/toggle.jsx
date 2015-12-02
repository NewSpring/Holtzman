import React, { PropTypes } from 'react'

class Toggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: true
    }
  }

  toggle = (event) => {
    const active = event.target.dataset.toggle;
    if (active != this.state.active) {
      if (typeof(this.props.toggle) === "function") {
        this.props.toggle(!this.state.active);
      }

      this.setState({active: !this.state.active});
    }
  }

  toggleClasses = (main) => {
    let classes = [
      "transition",
      "one-half",
      "text-center",
      "toggle__item"
    ]

    if ((this.state.active && main) || (!this.state.active && !main)) {
      classes.push("toggle__item--active")
    }
    return classes.join(" ")
  }

  arrowStyle = () => {
    if (!this.state.active) {
      return {
        marginLeft: "50%"
      }
    }

    return {}
  }

  render () {
    return (
      <div className="toggle push-bottom soft-sides">
        <div data-toggle="true" className={this.toggleClasses(true)} onClick={this.toggle}>
          {this.props.items[0].label}
        </div>

        <div data-toggle="false" className={this.toggleClasses(false)} onClick={this.toggle}>
          {this.props.items[1].label}
        </div>

        <div className="grid text-left toggle-arrow soft-sides">

          <div className="transition grid__item hard one-half toggle-arrow__item" style={this.arrowStyle()}>
          </div>

        </div>

      </div>
    )
  }
}

export default Toggle;
