# Data Hub Components

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]

[![Build Status][circleci-image]][circleci-url]
[![LGTM Alerts][lgtm-alerts-image]][lgtm-alerts-url]
[![LGTM Grade][lgtm-grade-image]][lgtm-grade-url]
[![Coverage][codecov-image]][codecov-url]

[npm-url]: https://npmjs.org/package/data-hub-components
[npm-downloads-image]: https://badgen.net/npm/dm/data-hub-components
[npm-version-image]: https://badgen.net/npm/v/data-hub-components
[circleci-image]: https://circleci.com/gh/uktrade/data-hub-components.svg?style=svg
[circleci-url]: https://circleci.com/gh/uktrade/data-hub-components
[lgtm-alerts-image]: https://img.shields.io/lgtm/alerts/g/uktrade/data-hub-components.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/uktrade/data-hub-components/alerts/
[lgtm-grade-image]: https://img.shields.io/lgtm/grade/javascript/g/uktrade/data-hub-components.svg?logo=lgtm&logoWidth=18
[lgtm-grade-url]: https://lgtm.com/projects/g/uktrade/data-hub-components/context:javascript
[codecov-image]: https://codecov.io/gh/uktrade/data-hub-components/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/uktrade/data-hub-components

Collection of React Components used by the Data Hub platform.

This component library makes heavy use of the [govuk-react](https://github.com/govuk-react/govuk-react) project.

## Usage

```bash
create-react-app demo-app
yarn add data-hub-components react react-dom
```

```jsx
import { ActivityFeed } from 'data-hub-components'

const activities = []
<ActivityFeed activities={activities} />
```

## Development

**Install dependencies**

Recommended Node.js version: `10.16.0`

Recommended Yarn version: `1.16.0`

```bash
nvm use # 10.16.0 from .nvmrc will be used
npm i -g yarn@1.16.0
yarn
```

**Start Storybook**

```bash
yarn start
```

**Run tests**

```bash
yarn test
```

Optionally, you can execute the CircleCI tests locally:

```bash
curl -fLSs https://circle.ci/cli | bash # Install CircleCI CLI
circleci local execute --job build
```

**Update Jest snapshots**

```bash
yarn test:update
```

**Create a release**

This project is using [Semantic Release](https://github.com/semantic-release/semantic-release).

When committing please always use the following pattern for you messages (scope, body and footer are optional):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

| Commit message types (tags)                                                                                        | Release type              | Example                                                  |
|--------------------------------------------------------------------------------------------------------------------|---------------------------|----------------------------------------------------------|
| **feat**: A new feature                                                                                            | Minor release (0.**1**.0) | `feat: Add "Investment project" activity card`           |
| **fix**: A bug fix                                                                                                 | Patch release (0.0.**1**) | `fix: Remove default activity card`                      |
| **docs**: Documentation only changes                                                                               | None                      | `docs(README): Add testing instructions`                 |
| **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)  | None                      | `style: Use tabs instead of spaces`                      |
| **refactor**: A code change that neither fixes a bug nor adds a feature                                            | None                      | `refactor: Add missing props validation to ActivityFeed` |
| **perf**: A code change that improves performance                                                                  | None                      | `perf: Improve rendering speed of ActivityFeed`          |
| **test**: Adding missing or correcting existing tests                                                              | None                      | `test: Add integration tests to ActivityFeedCard`        |
| **build** Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)      | None                      | `build: Update webpack config`                           |
| **ci** Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) | None                      | `ci: Update CircleCI config`                             |
| **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation          | None                      | `chore: Update CircleCI config`                          |

To create a major/breaking (**1**.0.0) release, please add `BREAKING CHANGE` to the commit message body with some explanation, example message:

```
fix: Remove ActivityFeedApp component

BREAKING CHANGE: This components is no longer used so we removed it.
Optionally add more info in the second line of your message.
```

To ease the process, [commitizen](https://github.com/commitizen/cz-cli) was added to the project to help creating properly formatted commit messages.

Command `git cz` supports the same arguments as `git commit` and should be used as its replacement, example:

```
git add .
git cz
```

## Release process

1. Create a new branch based on `master`.
2. Commit code to the newly created branch following conventions specified by `semantic-release` above.
3. Create a PR to the `master` branch.
4. Wait for PR to pass tests and get the required number of approvals.
5. Once there are no outstanding comments the PR is merged.
6. Once again tests are being run on `master` branch.
7. If tests pass, a [NPM release](https://www.npmjs.com/package/data-hub-components) is created using version number determined by commit messages.
8. The Git repo is tagged using the same version.
9. Storybook is built and published to the `gh-pages` branch which will be available on [GitHub Pages](https://uktrade.github.io/data-hub-components).
10. A GitHub release is created using the commit messages as the changelog.
11. A new comment is added to the previously merged PR with information about the release.
12. A tag `released` is added to the PR.

## Notes

* `react-markdown` is required only temporary to resolve dependency issue with [@govuk-react/paragraph](https://github.com/govuk-react/govuk-react/tree/master/components/paragraph), see issue on the [govuk-react](https://github.com/govuk-react/govuk-react/issues/425) project.
