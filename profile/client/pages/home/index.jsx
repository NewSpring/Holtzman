import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Link } from "react-router"

import { Split, Left, Right } from "../../../../core/client/layouts/split"
import { OnBoard } from "../../../../core/client/blocks"
import { modal } from "../../../../core/client/actions"

import { People } from "../../../../rock/lib/collections"

const map = (state) => ({auth: state.onBoard.authorized})

@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Home extends Component {

  componentWillMount(){
    console.log(this.props.auth)
    if (!this.props.auth) {
      this.props.dispatch(modal.render(OnBoard))
    }
  }

  getMeteorData() {
    let person = null
    const user = Meteor.user()
    if (user) {
      Meteor.subscribe("people")
      person = People.findOne()
    }

    return {
      person
    }
  }

  render () {

    let person = {
      Campus: {},
      Home: {}
    }

    if (this.data.person) {
      person = this.data.person
    }
    console.log(person)
    const { PhotoUrl } = person


    let photo = PhotoUrl ? `//stock-rock.newspring.cc/${PhotoUrl}` : null


    return (
      <Split nav={true}>

        <Right
          mobile={true}
          classes={["floating", "overlay--solid-dark"]}
          ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
          background={photo}
        >
          <div className="soft one-whole">
            <div
              className="background--fill ratio--square round two-fifths display-inline-block"
              style={{ backgroundImage: `url(${photo})`}}
            ></div>
          <h3 className="text-light-primary soft-half-top hard-bottom">{person.FirstName} {person.LastName}</h3>
          <h5 className="text-light-primary italic">{person.Home.City}</h5>
        </div>

        </Right>

        <Left scroll={true} >
          <div className="soft soft-double@lap-and-up push-double@lap-wide-and-up">


          </div>
        </Left>

      </Split>

    )
  }
}
