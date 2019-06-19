# Data Hub Components

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

**Update Jest snapshots**

```bash
yarn test:update
```

**Create a release**

Caution: Remember to be on the latest master, yarn will increase the version number in `package.json` and will create a tag and a commit message including the new version.

```bash
yarn release
git push
```

## Notes

* `react-markdown` is required only temporary to resolve dependency issue with [@govuk-react/paragraph](https://github.com/govuk-react/govuk-react/tree/master/components/paragraph), see issue on the [govuk-react](https://github.com/govuk-react/govuk-react/issues/425) project.
