
const K_SIZE = 30;

const base = {
  // initially any map object has left top corner at lat lng coordinates
  // it"s on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: "5px solid #6bac43",
  borderRadius: K_SIZE,
  backgroundColor: "white",
  textAlign: "center",
  color: "#1c683e",
  fontSize: 16,
  fontWeight: "bold",
  padding: 4,
  cursor: "pointer"
};

const hover = {
  ...base,
  border: "5px solid #1c683e",
  color: "#6bac43"
};

const active = {
  ...base,
  color: "#6bac43",
  backgroundColor: "#6bac43"
};


export {base, hover, active, K_SIZE};
