const defaultColors = [
  { name: "light-primary", value: "#ffffff", default: true } ,
  { name: "light-secondary", value: "#f7f7f7" },
  { name: "light-tertiary", value: "#dddddd" },
  { name: "dark-primary", value: "#303030" },
  { name: "dark-secondary", value: "#505050" },
  { name: "dark-tertiary", value: "#858585" },
  { name: "primary", value: "#6bac43" },
  { name: "secondary", value: "#1c683e" },
  { name: "tertiary", value: "#2a4930" },
  { name: "alert", value: "#c64f55" },
];

export default (...colors) => {
  if (!colors) return [...defaultColors];
  return [...defaultColors]
    .filter(x => colors.indexOf(x.name) > -1);
};
