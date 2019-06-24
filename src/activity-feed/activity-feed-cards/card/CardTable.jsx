/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'govuk-react'
import styled from 'styled-components'
import { SPACING } from '@govuk-react/constants'

const GovUkTable = styled(Table)`
  margin-bottom: ${SPACING.SCALE_2};
  
  & > tbody > tr > th, td  {
    font-weight: normal;
    border: 0;
    padding: ${SPACING.SCALE_2};
    font-size: 14px;
  }
`

class DetailsRow extends React.Component {
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
        <Table.CellHeader style={{ fontWeight: 'normal', border: 0 }}>{header}</Table.CellHeader>
        <Table.Cell style={{ border: 0 }}>{children}</Table.Cell>
      </Table.Row>
    )
  }
}

export default class CardTable extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({
      header: PropTypes.string,
      content: PropTypes.node,
    })).isRequired,
  }

  render() {
    const { rows } = this.props

    return (
      <GovUkTable>
        {rows.map(({ header, content }) => (
          <DetailsRow header={header} key={header}>
            {content}
          </DetailsRow>
        ))}
      </GovUkTable>
    )
  }
}
