import React from 'react'
import {
  Checkbox,
  Details,
  Fieldset,
  FormGroup,
  GridRow,
  GridCol,
} from 'govuk-react'

export default class ActivityFeedFilters extends React.Component {
	render() {
    return (
      <Details summary="Filter and sort activity" style={{fontSize: '100%', marginBottom: 0}}>
        <form>
          <Fieldset>
            <Fieldset.Legend>Show me</Fieldset.Legend>
            <GridRow>
              <GridCol>
                <FormGroup>
                  <Checkbox>My activity</Checkbox>
                  <Checkbox>My team's activity</Checkbox>
                </FormGroup>
              </GridCol>
            </GridRow>
          </Fieldset>
        </form>
      </Details>
    )
  }
}
