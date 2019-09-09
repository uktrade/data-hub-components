import styled from 'styled-components'
import { MEDIA_QUERIES, SPACING } from '@govuk-react/constants'

const FormActions = styled('div')`
  * + * {
    margin-top: ${SPACING.SCALE_4};
  }
    
  ${MEDIA_QUERIES.TABLET} {
    * {
      display: inline-block;
      vertical-align: baseline;
    }

    * + * {
      margin-top: 0;
      margin-left: ${SPACING.SCALE_4};
    }
  }`

export default FormActions
