import React from 'react'
import PropTypes from "prop-types"
import {filter, get, includes, map, some} from 'lodash'
import { Details, H3, Link, Table } from 'govuk-react'
import { SPACING } from '@govuk-react/constants'
import styled from 'styled-components'

import DateUtils from '../../utils/DateUtils'
import NumberUtils from '../../utils/NumberUtils'

const Card = styled('div')`
  border: 1px solid #c0c0c0;
  padding: ${SPACING.SCALE_3};
`

const CardHeader = styled('div')`
  H3 {
    color: #005ea5;
    font-weight: normal;
    
    & > a:link, a:visited, a:hover, a:active {
      text-decoration: none;
    }
  }
`

const CardHeaderTitle = styled('div')`
  display: flex;
  justify-content: space-between;
 
  & > H3 {
    color: white;
    padding: 2px 5px;
    font-weight: normal;    
    background-color: #005ea5; 
  }
`

const CardDetails = styled(Details)`
  font-size: 100%;
  margin-bottom: 0;
`

const TITLES = {
  add: 'New investment project added'
}

const getContacts = (activity) => {
  return map(filter(activity['object']['attributedTo'], ({type}) => {
    return includes(type, 'dit:Contact')
  }), ({id, name, 'dit:jobTitle': jobTitle}) => {
    return {
      id,
      name,
      jobTitle,
    }
  })
}

class DetailsRow extends React.Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { header, children } = this.props

    if (!children) {
      return null
    }

    return (
      <Table.Row>
        <Table.CellHeader style={{fontWeight: 'normal', border: 0}}>{header}</Table.CellHeader>
        <Table.Cell style={{border: 0}}>{children}</Table.Cell>
      </Table.Row>
    )
  }
}

export default class InvestmentProject extends React.Component {
  static canRender(activity) {
    const types = get(activity, 'object.type')
    return some([ 'dit:InvestmentProject' ], (type) => {
      return includes(types, type)
    })
  }

  render() {
    const { activity } = this.props

    const type = get(activity, 'type')
    const title = TITLES[type.toLowerCase()]
    const published = get(activity, 'published')
    const publishedTime = DateUtils.format(published)
    const name = get(activity, 'object.name')
    const investmentType = get(activity, 'object.dit:investmentType.name')

    const contacts = getContacts(activity)
    const contactsList = contacts.map(({id, name, jobTitle}) => (
      <span key={id}>
        <Link href="#">{name}</Link> ({jobTitle})
      </span>
    ))

    const estimatedLandDate = DateUtils.format(get(activity, 'object.dit:estimatedLandDate'))
    const totalInvestment = NumberUtils.currency(get(activity, 'object.dit:totalInvestment'))
    const foreignEquityInvestment = NumberUtils.currency(get(activity, 'object.dit:foreignEquityInvestment'))
    const grossValueAdded = NumberUtils.currency(get(activity, 'object.dit:grossValueAdded'))
    const numberNewJobs = NumberUtils.decimal(get(activity, 'object.dit:numberNewJobs'))
    const url = get(activity, 'object.url')

    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>
            <H3>{title} - {investmentType}</H3>
            <span>{publishedTime}</span>
          </CardHeaderTitle>
          <H3>
            <Link href={url}>{name}</Link>
          </H3>
        </CardHeader>
        <CardDetails summary="Key details and people for this project">
          <Table>
            <DetailsRow header="Investment Type">{investmentType}</DetailsRow>
            <DetailsRow header="Estimated land date">{estimatedLandDate}</DetailsRow>
            <DetailsRow header="Company contact(s)">{contactsList}</DetailsRow>
            <DetailsRow header="Total Investment">{totalInvestment}</DetailsRow>
            <DetailsRow header="Capital expenditure value">{foreignEquityInvestment}</DetailsRow>
            <DetailsRow header="Gross value added (GVA)">{grossValueAdded}</DetailsRow>
            <DetailsRow header="Number of new jobs">{numberNewJobs}</DetailsRow>
          </Table>
          <Link href={url}>Go to the investment project detail page</Link>
        </CardDetails>
      </Card>
    )
  }
}