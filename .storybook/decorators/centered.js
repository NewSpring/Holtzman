export default story => (
  <div className="floating locked-sides locked-ends scrollable">
    <div className="floating__item one-whole text-left soft">
      {story()}
    </div>
  </div>
);
