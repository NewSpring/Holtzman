# ProgressBar

## Usage

```
<ProgressBar
  title="My Fund"
  total="100"
  percentDone=50
  theme="light"
  style={{backgroundColor: "#cccccc"}}
/>
```

## Properties

- **title**:string! - The fund title to show on the left
- **total**:string! - The amount contributed to show on the right
- **percentDone**:number - Percent of the goal (or total)
- **theme**:string? = "light" || "dark" - The type of background to display on
  - default if not provided: `dark`
- **style**:Object? - Any additional styled passed as a React Styles Object
