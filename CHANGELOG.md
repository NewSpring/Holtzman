# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- NewSpring Now!
- A new channel in EE (NS: Now) will allow staff members to create entries to show on Sunday's.
- The channel entries will appear in the home feed alongside the rest of the home feed items.
- Tapping on an Event entry will take you to a page that has the live feed (or on-demand video if not Sunday) along with other relevant information.
- This feature is wrapped by an awesome new ability to test features based on security role. You'll have to have the beta tester role in order to see and use this new feature.Added the ability for the home feed to pull items from the NS: Now channel in EE. These items link to internal entry pages.
### Fixed
- Fixed an issue in iOS that was causing schedules to not be created.
- Fixed the toggle import in the `/following` section on profile causing component not to render.
- Fixed an issue with the devotionals auto scrolling about half way down the page in the app on first render.
- Fixed: The tag gallery would revert back to system color when the selected button wasn't "actively pressed". Added a "nohover" class to fix this.
- Feature: Added ability to save a payment during a transaction on iOS
- Fixed the "Home" tab on Giving to now say "Dashboard". Because clarity.
- Fixed a typo on the Annual Report. The KidSpring section story now spells "among" correctly.

### Changed
- Changed the text on the individual transaction entry pages to more closely align with our church's vision.
- Changed the giving history filters to show a "Last Year" option
- Changed the text on the giving dashboard, schedule detail, and adding a payment type during a schedule to bring clarity to our amazing people.

### Changed

### Added
- LikesList shared component
- Hero UI Primitive
- recent likes section in discover page.

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
