
const K_SIZE = 30;

const base = {
  // initially any map object has left top corner at lat lng coordinates
  // it"s on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_SIZE - 8,
  height: K_SIZE - 8,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: "3px solid white",
  borderRadius: K_SIZE,
  backgroundColor: "#2a4930",
  textAlign: "center",
  color: "#1c683e",
  fontSize: 16,
  fontWeight: "bold",
  padding: 4,
  cursor: "pointer",
  boxShadow: "0px 1px 2px #858585",
};

const hover = {
  ...base,
  color: "#6bac43",
  backgroundColor: "#6bac43",
};

const active = {
  ...base,
  color: "#6bac43",
  backgroundColor: "#6bac43"
};


export {base, hover, active, K_SIZE};
