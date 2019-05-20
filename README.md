# Data Hub Components

It's a set of React Components used by the Data Hub platform.

This component library makes heavy use of the [govuk-react](https://github.com/govuk-react/govuk-react) project.

## Install dependencies

```bash
yarn
```

## Start Storybook

```bash
yarn start
```

## Testing

### Run tests

```bash
yarn test
```

### Update Jest snapshots

```bash
jest --updateSnapshot
```

## Notes

* `react-markdown` is required only temporary to resolve dependency issue with [@govuk-react/paragraph](https://github.com/govuk-react/govuk-react/tree/master/components/paragraph), see issue on the [govuk-react](https://github.com/govuk-react/govuk-react/issues/425) project.
