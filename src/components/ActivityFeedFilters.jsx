import React from 'react'
import {
  Checkbox,
  Select,
  Label,
  Link,
  GridRow,
  GridCol,
} from 'govuk-react'

export default class ActivityFeedFilters extends React.Component {
	render() {
    return (
      <form>
        <GridRow style={{ display: 'none' }}>
          <GridCol>Show me</GridCol>
          <GridCol>
            <Checkbox>My activity</Checkbox>
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
    )
  }
}
