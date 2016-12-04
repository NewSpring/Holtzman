# SmallButton

## Usage

```
<SmallButton
  linkUrl=""
  onClick={() => alert("Hello World")}
  text="See All"
  className="my-class another"
  style={{cursor: "pointer"}}
/>
```

## Properties

- **text**:string! - The text to show on the button
- **disabled**:boolean? - Toggles the disabled state of the button (doesn't need a value)
- **linkUrl**:string? - if present, the button will link to this URL.
- **onClick**:Function? - if present, clicking the button will call this function.
- **className**:string? - The classes to pass to the button
- **style**:Object? - Any additional styled passed as a React Styles Object