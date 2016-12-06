# SectionHeader

## Usage

```
<SectionHeader
  title="Activity"
  link={
    <SmallButton
      className="floating__item btn--dark-primary flush"
      text="See All"
    />
  }
/>
```

## Properties

- **title**:string? - The text to show on the left side
- **link**:Object? - react component to show on the right
  - _note:_ The Link component will need to have no top/bottom padding or margin to be vertially centered