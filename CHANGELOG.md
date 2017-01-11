# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 2017-01-10
- Fixed an issue in iOS that was causing schedules to not be created.

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
