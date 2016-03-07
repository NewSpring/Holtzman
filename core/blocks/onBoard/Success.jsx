
import { Link } from "react-router"

const Success = ({ person, onExit }) => (

  <div className="soft soft-double-ends one-whole text-center">

    <h4 className="text-center push-ends">
      Welcome{person.nickName ? " " + (person.nickName || person.firstName) : ""}!
    </h4>

    <p className="text-left">
      Congratulations on setting up your NewSpring account!
      This account will help us to serve you better in your walk with Jesus.
      To help us make sure the information we have is accurate and up to date, we would love if you could complete your profile.
    </p>

    <Link to="/profile/settings/personal-details" className="one-whole btn push-ends" >
      Complete Profile Now
    </Link>

    <button className="btn--thin btn--small btn--dark-tertiary one-whole " onClick={onExit}>
      Complete Later
    </button>

  </div>
)


export default Success
