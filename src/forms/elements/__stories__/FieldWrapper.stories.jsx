import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { H1, H2, H3 } from '@govuk-react/heading'
import Button from '@govuk-react/button'

import FormStateful from '../FormStateful'
import FieldWrapper from '../FieldWrapper'
import FieldInput from '../FieldInput'

addDecorator(withKnobs)

const testInput = (
  <FieldInput name="testField" type="text" required="Some error" />
)

storiesOf('Forms', module)
  .add('FieldWrapper - Label', () => (
    <FormStateful>
      {(form) => (
        <>
          <FieldWrapper
            label="Text"
            name="testField"
            hint="Some hint"
            error={form.errors.testField}
          >
            {testInput}
          </FieldWrapper>

          <Button>Click to show error</Button>
        </>
      )}
    </FormStateful>
  ))
  .add('FieldWrapper - Legend', () => (
    <FormStateful>
      {(form) => (
        <>
          <FieldWrapper
            legend="Legend as text"
            name="testField"
            hint="Some hint"
            error={form.errors.testField}
          >
            {testInput}
          </FieldWrapper>

          <FieldWrapper
            legend={<H1>Legend as H1</H1>}
            name="testField"
            hint="Some hint"
            error={form.errors.testField}
          >
            {testInput}
          </FieldWrapper>

          <FieldWrapper
            legend={<H2>Legend as H2</H2>}
            name="testField"
            hint="Some hint"
            error={form.errors.testField}
          >
            {testInput}
          </FieldWrapper>

          <FieldWrapper
            legend={<H3>Legend as H3</H3>}
            name="testField"
            hint="Some hint"
            error={form.errors.testField}
          >
            {testInput}
          </FieldWrapper>

          <Button>Click to show error</Button>
        </>
      )}
    </FormStateful>
  ))
