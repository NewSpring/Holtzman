# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Fixed
- Fixed an issue in iOS that was causing schedules to not be created.
- Fixed the toggle import in the `/following` section on profile causing component not to render.
- Fixed an issue with the devotionals auto scrolling about half way down the page in the app on first render.
- Fixed: The tag gallery would revert back to system color when the selected button wasn't "actively pressed". Added a "nohover" class to fix this.

### Changed
- UI for joining a group
  - changed join group button to say `Contact`
  - Groups: changed join group modal title to say `Contact`
  - changed default message for joining a group

## [1.2.3] - 2017-01-09
### Added
- `index.js` files for folders with collections of components
- A `Progress` primitive
- Support future entries for studies

### Changed
- File structure changed to a more easily navigable version.
- Dropping of the `series.SingleItem` style file naming on non-deprecated files
- changed giving dashboards to use progress primitive
- removed READMEs that had nothing useful in them
- changed some strange naming (`switch > toggle` and `toggle > tabs`) to be clearer
- support of studies/devotionals in menu

### Fixed
- fixed discover page not showing additional featured items
- fixed giving dashboard year giving review select color on windows
- fixed live formatting of add to cart inputs when adding less than a dollar
- fixed schedule date to be correct based on utc time
- fixed issue when scheduling using custom frequency
- fixed reseting of schedule on giving add to cart form
