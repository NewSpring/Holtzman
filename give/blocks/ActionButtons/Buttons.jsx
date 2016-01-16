
const PrimaryButton = ({ disabled, classes, onClick, text, icon }) => (

  <button className={classes} onClick={onClick} disabled={disabled}>
    {text} {icon}
  </button>

)

const SecondaryButton = ({ disabled, authorized, onClick }) => {

  let classes = [
    "btn--thin",
    "btn--small",
    "display-inline-block",
    "push-left@lap-and-up",
    "push-half-left@handheld"
  ]
  let style = {}

  if (disabled) {
    classes.push("btn--disabled")
    // this should be fixed in junction
    style = {
      backgroundColor: "transparent !important" // handle hover :(
    }
  } else {
    classes.push("btn--dark-tertiary")
  }


  if (!authorized) {
    return (
      <button
        style={style}
        disabled={disabled}
        className={classes.join(" ")}
        onClick={onClick}
      >
        Register
      </button>
    )
  }

  return null
}

const Guest = ({ authorized, disabled, onClick }) => {
  let classes = [
    "outlined--bottom",
    "outlined--light"
  ]

  let style = {
    display: "inline"
  }

  if (disabled) {
    classes.push("text-light-tertiary")
    style = {...style, ...{ cursor: "text" } }
  } else {
    classes.push("text-dark-tertiary")
    style = {...style, ...{ cursor: "pointer" } }
  }

  if (!authorized){
    return (
      <div className="display-block soft-half-top">
        <h6 className={classes.join(" ")} style={style} onClick={onClick}>
          Give as Guest
        </h6>
      </div>

    )
  }

  return null
}

export default {
  PrimaryButton,
  SecondaryButton,
  Guest
}
