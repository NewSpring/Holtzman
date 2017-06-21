# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [5.2.2] UNRELEASED
### Updated
- Updated the personal settings so that if someone updates
their email address it will also update their user login to
use that email address.

## [5.2.2] UNRELEASED
### Added
### Fixed
- Fixed the live page to have a meta title for analytics.
### Updated

## [5.2.1]
### Updated
- Updated the app with new splash screen images for summer.
- Changed ... on group finder to filter
- Changed group leader button to manage groups
- Change discover to use feed item cards
- Remove ooyala for live and only use jwplayer (commit and page says wowza)
### Fixed
- Speed up home feed by not require any MSSQL data for initial home feed

## [5.2.0]
### Updated
- Updated the feed card to remove the time stamp.
- Updated the home feed to no longer have the first card be a hero card. It's now
a regular card just like everything else.
- Updated numbers on financial report and added button to detailed pdf
- Removed auto-like after login
### Added
- Added a "Prompt Modal" to prompt users of necessary information.
- Push notifications!
- Support for dynamic links
### Fixed
- Fixed an issue with the createDataChannel not existing which caused the app
to break on the latest Microsoft Edge releases.
- Fixed a bug when changing credit cards during a one time gift on iOS
- Fixed a bug with the user likes list not displaying likes when the data being returned had a null item.

## [5.1.0]
### Fixed
- fixed cc exp date validation
- Unpredictable custom tag in give/now with schedules
- Start/End date tags being active when they shouldn't in giving history
- Users were previously able to submit a contribution before campus info was loaded.
- fixed blurred images for album likes on profile feed
### Added
- Added back the ability to save payments without a transaction.
- Platform and version headers to api requests


## [5.0.22]
### Fixed
- Giving statements filtered by all time only printing YTD
- Giving history filters not allowing switching from one to another
- issue with siteLinks erroring out, causing content to never load
- Unpredictable custom tag in give/now with schedules
### Added
- danger for PR's, with support for meteor build
- unit cost for each transaction will be piped through to NMI.

## [5.0.20]
### Added
- redirect on signin with person guid for work workflows.

### Fixed
- Navigation inside of group profile not linking to the sections page
- Group profile title not changing from previous page
- Liked stories not showing the proper images in likes lists
- Give Campaign pages not loading

### Changed
- Removed the content prop the `MiniCard` component

## [5.0.19] - 2017-03-17
### Fixed
- Fixed the GA code for production app [CI]
- Login on groups join page failing

### Added
- A day of week filter for group finder.

### Fixed
- Ellipses on last tag of group finder results being hidden with long lists of tags

## [5.0.17] - 2017-03-08
### Added
- NewSpring Now!
- A new channel in EE (NS: Now) will allow staff members to create entries to show on Sunday's.
- The channel entries will appear in the home feed alongside the rest of the home feed items.
- Tapping on an Event entry will take you to a page that has the live feed (or on-demand video if not Sunday) along with other relevant information.
- This feature is wrapped by an awesome new ability to test features based on security role. You'll have to have the beta tester role in order to see and use this new feature.Added the ability for the home feed to pull items from the NS: Now channel in EE. These items link to internal entry pages.
- Ability to share a group
- LikesList shared component
- Hero UI Primitive
- recent likes section in discover page.

### Fixed
- Fixed an issue in iOS that was causing schedules to not be created.
- Fixed the toggle import in the `/following` section on profile causing component not to render.
- Fixed an issue with the devotionals auto scrolling about half way down the page in the app on first render.
- Fixed: The tag gallery would revert back to system color when the selected button wasn't "actively pressed". Added a "nohover" class to fix this.
- Feature: Added ability to save a payment during a transaction on iOS
- Fixed the "Home" tab on Giving to now say "Dashboard". Because clarity.
- Fixed a typo on the Annual Report. The KidSpring section story now spells "among" correctly.
- Fixed the security enhancer so that it correctly shows the home feed if you are not signed in.
- Fixed schedule tags breaking in giving when changed from one tag to another
- Fixed the home feed so that it will only show you all of the basic topics if you are signed out.
- Removed recently liked section on web.
- Discover hero not linking out
- Fixed currency wrapping in review checkout on $1000+ transactions
- Contact group modal now shows phone number field if needed
- recently liked not getting some data causes MiniCards not to render

### Changed
- Changed the text on the individual transaction entry pages to more closely align with our church's vision.
- Changed the giving history filters to show a "Last Year" option
- Changed the text on the giving dashboard, schedule detail, and adding a payment type during a schedule to bring clarity to our amazing people.
- Changed the group sign up to be a request for information. Updated the UI to have text that speaks to requesting information and not joining the group. Allow the person signing up to choose their communication preference based on the choices in Rock. Allow the person to add a phone number if they do not have one in the database.
- Giving summary file name no longer includes year
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
