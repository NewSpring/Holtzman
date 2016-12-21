# Contributing to Holtzman

Holtzman is NewSpring's open sourced project to build apps for web, iOS, and Android.
This project is under heavy active development, and it currently being used in production
for [my.newspring.cc](https://my.newspring.cc) and [our current apps](https://newspring.cc/apps).
We're currently in the process of making this project easy to contribute to.
Hopefully, this document sheds some light into our processes, and how you can contribute.

**Table of Contents**

[How we work](#how-we-work)
  * [master is unsafe](#master-is-unsafe)
  * [Pull Requests](#pull-requests)

[How can I contribute?](#how-can-i-contribute)
  * [Where to find known issues](#where-to-find-known-issues)
  * [Reporting new issues](#reporting-new-issues)
  * [How can I recommend new features](#how-can-i-recommend-new-features)
  * [Pull requests](#pull-requests)

[Style Guide](#style-guide)
  * [Git](#git)
  * [Code](#code)

[How to get in touch](#how-to-get-in-touch)

[License](#license)

## How we work

Our team works 100% off of Github, and it should always remain updated with what is currently
in active development.

### `master` is unsafe

Our team works off of individual feature branches which eventually get merged into
`master` before being deployed. Since this is the case, the `master` branch may at
some times contain bugs or API changes that haven't been fully communicated or tested,
and may break older versions of the app.

We will do our best to keep `master` in working order, with all tests passing. For
a stable release of the app, you can always explore our past and current [releases](https://github.com/NewSpring/Holtzman/releases)

### Pull Requests

We work off of pull requests pretty heavily, and therefore we monitor for new PR's.
When considering pull requests, we may require more than one person to sign off,
so these can sometimes take a day or two.

## How can I contribute?

One way you can contribute is by tackling some known issues.

### Where to Find Known Issues

We are using [GitHub Issues](https://github.com/NewSpring/holtman/issues)
for our public bugs. We keep a close eye on this and try to make it clear when
we have an internal fix in progress. Before filing a new task, try to make sure
your problem doesn't already exist.

### Reporting New Issues

The best way to get a bug fixed is to provide an example case of where the problem
is occurring. Images or videos of the failure occurring is beneficial where
applicable. If you think you have a solution to a bug and would like to fix it,
let us know. We can hopefully provide recommendations, as well as let you know
if the bug is in fact intended behavior.

### How can I recommend new features?

We track feature requests using Github Issues. If you would like to begin
a discussion about a new or improved feature, open a new issue.

### Pull requests

When working to fix bugs or add features, we recommend opening a pull request early
so we can comment on it or request any changes early on. It is also recommended that
you work off of open issues, and let us know on them what you will be working on for
the same reason.

**Please submit your pull request on the `master` branch**.

*Before* submitting a pull request, please make sure the following is done…

1. Fork the repo and create your branch from `master`.
2. **Describe your test plan in your commit.** If you've added code that should be tested, add tests in `__tests__` subfolders
3. If the changes you are making are visual or involve new components, please also
add a react storybook test. These are found in `__stories__` subfolders.
4. Ensure tests pass on Travis and Coveralls. These automatically run when opening a
pull request.
5. Make sure your code lints (`yarn lint`).
6. Make sure your code is typed using flow (`yarn flow`).
7. Rebase your code to master (`git rebase`). Stating one-line intentions along
with each commit helps the reviewer to understand what you're changing.

## Style Guide

### Git

#### Issues
- Above all, pay attention to the template shown when creating issues.
- Before opening an issue, search existing issues and closed issues for any current or past discussion about your topic.

#### Commits and commit messages
- Try to limit each commit to one change.
- Commits messages should be short and clear.
- Feel free to reference issues and pull requests in commit messages.

#### Pull Requests
- Refer to the [above instructions](#pull-requests) on what to do before opening a pull request.
- Follow instructions on the pull request template shown when opening a new pull request.

### Code

#### General

* **Most important: Look around.** Match the style you see used in the rest of the project. This includes formatting, naming things in code, naming things in documentation.
* Add trailing commas,
* 2 spaces for indentation (no tabs)
* "Attractive"

#### JavaScript

* Use semicolons;
* Prefer `"` over `'`
* 100 character line length

#### JSX

* Prefer `"` over `'` for string literal props
* When wrapping opening tags over multiple lines, place one prop per line
* `{}` of props should hug their values (no spaces)
* Place the closing `>` of opening tags on the same line as the last prop
* Place the closing `/>` of self-closing tags on their own line and left-align them with the opening `<`


## How to Get in Touch

* [Twitter](https://twitter.com/newspringweb)

## License

By contributing to Holtzman, you agree that your contributions will be licensed under its MIT license.
