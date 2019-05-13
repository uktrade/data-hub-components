import React from 'react'
import {
  Checkbox,
  Details,
  Select,
  Label,
  Link,
  GridRow,
  GridCol,
} from 'govuk-react'

export default class ActivityFeedFilters extends React.Component {
	render() {
    return (
      <Details summary="Filter and sort activity" style={{fontSize: '100%'}}>
        <form>
          <GridRow>
            <GridCol>Show me</GridCol>
            <GridCol>
              <Checkbox>My activity</Checkbox>
              <Checkbox>My team's activity</Checkbox>
            </GridCol>
            <GridCol>
              <Label>Activity types</Label>
              <Select>
                <option>All activity</option>
              </Select>
            </GridCol>
            <GridCol>
              <Link href="#">All filters</Link>
            </GridCol>
          </GridRow>
        </form>
      </Details>
    )
  }
}
