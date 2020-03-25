/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import Table from '@govuk-react/table'
import styled from 'styled-components'
import { SPACING, MEDIA_QUERIES } from '@govuk-react/constants'

const GovUkTable = styled(Table)`
  ${MEDIA_QUERIES.TABLET} {
    margin-bottom: ${({ isWideCard }) => (isWideCard ? '0' : SPACING.SCALE_2)};
  }

  th {
    width: ${({ isWideCard }) => (isWideCard ? '284px' : '270px')};
  }

  th,
  td {
    font-weight: normal;
    border: 0;
    padding: ${SPACING.SCALE_2};
    font-size: 16px;
    vertical-align: top;
  }
`

class DetailsRow extends React.PureComponent {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { header, children } = this.props

    if (!children) {
      return null
    }

    return (
      <Table.Row>
        <Table.CellHeader style={{ fontWeight: 'normal', border: 0 }}>
          {header}
        </Table.CellHeader>
        <Table.Cell style={{ border: 0 }}>{children}</Table.Cell>
      </Table.Row>
    )
  }
}

export default class CardTable extends React.Component {
  static propTypes = {
    isWideCard: PropTypes.bool,
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string,
        content: PropTypes.node,
      })
    ).isRequired,
  }

  static defaultProps = {
    isWideCard: false,
  }

  render() {
    const { rows, isWideCard } = this.props
    return (
      <GovUkTable isWideCard={isWideCard}>
        {rows.map(({ header, content }) => (
          <DetailsRow header={header} key={header}>
            {content}
          </DetailsRow>
        ))}
      </GovUkTable>
    )
  }
}
