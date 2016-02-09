

function style(disabled){
  if (disabled) {
    return {
      cursor: "inherit"
    }
  }

  return {}
}


const Label = ({ labelFor, labelName, disabled }) => (
  <label htmlFor={labelFor} style={style(disabled)} >
    {labelName}
  </label>
)

export default Label;
