## SmallButton

### Usage

```js
import SmallButton from "/imports/components/@primitives/UI/buttons/smallButton";

<SmallButton
  className="my-class another"
  // disabled
  linkUrl=""
  onClick={() => alert("Hello World")}
  style={{cursor: "pointer"}}
  text="See All"
/>
```

### Properties

- **className**:string? - The classes to pass to the button
- **disabled**:boolean? - Toggles the disabled state of the button (doesn't need a value)
- **linkUrl**:string? - if present, the button will link to this URL.
- **onClick**:Function? - if present, clicking the button will call this function.
- **style**:Object? - Any additional styled passed as a React Styles Object
- **text**:string! - The text to show on the button

### Purpose

We use small buttons in places like the upper right hand corner of the giving dashboard to take you to your giving history or to create a new schedule. They are just small unobtrusive action buttons.