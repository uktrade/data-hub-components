import React from 'react'
import { mount } from 'enzyme'
import HintText from '@govuk-react/hint-text'
import Label from '@govuk-react/label'
import ErrorText from '@govuk-react/error-text'

import FieldDate from '../FieldDate'
import FieldWrapper from '../FieldWrapper'
import FormStateful from '../FormStateful'

const assertDefaultAttributes = (input, key) => {
  expect(input.prop('id')).toEqual(`date.${key}`)
  expect(input.prop('name')).toEqual(`date.${key}`)
  expect(input.prop('error')).toEqual(undefined)
  expect(input.prop('type')).toEqual('number')
  expect(input.prop('value')).toEqual('')
  expect(input.prop('onBlur')).toBeInstanceOf(Function)
  expect(input.prop('onChange')).toBeInstanceOf(Function)
}

describe('FieldDate', () => {
  let wrapper

  describe('when the date is mounted', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate name="date" />
        </FormStateful>
      )
    })

    test('should contain 3 inputs', () => {
      const input = wrapper.find('input[type="number"]')
      expect(input.length).toEqual(3)
    })

    test('should set the default attributes on the "day" input', () => {
      const dayInput = wrapper.find('input[type="number"]').at(0)
      assertDefaultAttributes(dayInput, 'day')
    })

    test('should set the default attributes on the "month" input', () => {
      const dayInput = wrapper.find('input[type="number"]').at(1)
      assertDefaultAttributes(dayInput, 'month')
    })

    test('should set the default attributes on the "year" input', () => {
      const dayInput = wrapper.find('input[type="number"]').at(2)
      assertDefaultAttributes(dayInput, 'year')
    })
  })

  describe('when the date specifies a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate name="date" label="What is your DOB?" />
        </FormStateful>
      )
    })

    test('should render the date with a label', () => {
      const label = wrapper.find(Label).at(0)
      expect(label.text()).toEqual('What is your DOB?')
    })
  })

  describe('when the date does not specify a label', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate name="testField" />
        </FormStateful>
      )
    })

    test('should render the date without a label', () => {
      const label = wrapper.find(Label).at(0)
      expect(label.text()).not.toEqual('What is your DOB?')
    })
  })

  describe('when the date labels are all defaults', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate name="date" />
        </FormStateful>
      )
    })

    test('should render the day label', () => {
      const label = wrapper.find(Label).at(0)
      expect(label.text()).toEqual('Day')
    })

    test('should render the month label', () => {
      const label = wrapper.find(Label).at(1)
      expect(label.text()).toEqual('Month')
    })

    test('should render the year label', () => {
      const label = wrapper.find(Label).at(2)
      expect(label.text()).toEqual('Year')
    })
  })

  describe('when the date labels are user defined', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate
            name="date"
            labels={{ day: 'DD', month: 'MM', year: 'YYYY' }}
          />
        </FormStateful>
      )
    })

    test('should render the day label', () => {
      const label = wrapper.find(Label).at(0)
      expect(label.text()).toEqual('DD')
    })

    test('should render the month label', () => {
      const label = wrapper.find(Label).at(1)
      expect(label.text()).toEqual('MM')
    })

    test('should render the year label', () => {
      const label = wrapper.find(Label).at(2)
      expect(label.text()).toEqual('YYYY')
    })
  })

  describe('when the date specifies a hint', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate name="date" hint="For example, 01 09 2019" />
        </FormStateful>
      )
    })

    test('should render the date with a hint', () => {
      expect(wrapper.find(HintText).text()).toEqual('For example, 01 09 2019')
    })
  })

  describe('when the field does not specify a hint', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate name="date" />
        </FormStateful>
      )
    })

    test('should not render a hint', () => {
      expect(wrapper.find(HintText).exists()).toBe(false)
    })
  })

  describe('when custom validation passes', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate
            name="date"
            // eslint-disable-next-line no-unused-vars
            validate={(date) => {
              // Validate the date by returning null
              return null
            }}
          />
        </FormStateful>
      )
      wrapper.find('form').simulate('submit')
    })

    test('should not render an error message', () => {
      expect(wrapper.find(ErrorText).exists()).toBe(false)
    })
  })

  describe('when custom validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate
            name="date"
            // eslint-disable-next-line no-unused-vars
            validate={(date) => {
              // Invalidate the date by returning an error String
              return 'Enter a valid date (custom)'
            }}
          />
        </FormStateful>
      )
      wrapper.find('form').simulate('submit')
    })

    test('should render an error message', () => {
      expect(wrapper.find(ErrorText).text()).toEqual(
        'Enter a valid date (custom)'
      )
    })

    test('should render error styles', () => {
      const inputWrapper = wrapper
        .find(FieldWrapper)
        .find('div')
        .at(1)
      expect(inputWrapper).toHaveStyleRule('border-left', '4px solid #b10e1e')
      expect(inputWrapper).toHaveStyleRule('margin-right', '15px')
      expect(inputWrapper).toHaveStyleRule('padding-left', '10px')
    })
  })

  describe('when default validation fails', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          <FieldDate name="date" />
        </FormStateful>
      )

      const dayInput = wrapper.find('input[type="number"]').at(0)
      const monthInput = wrapper.find('input[type="number"]').at(1)
      const yearInput = wrapper.find('input[type="number"]').at(2)

      dayInput.simulate('change', { target: { value: '29' } })
      monthInput.simulate('change', { target: { value: '02' } })
      yearInput.simulate('change', { target: { value: '2019' } })

      wrapper.find('form').simulate('submit')
    })

    test('should render an error message', () => {
      expect(wrapper.find(ErrorText).text()).toEqual('Enter a valid date')
    })
  })

  describe('when Day, Month and Year is typed into the date fields', () => {
    beforeAll(() => {
      wrapper = mount(
        <FormStateful>
          {(state) => (
            <>
              <FieldDate name="date" />
              <div id="values">{JSON.stringify(state.values.date)}</div>
            </>
          )}
        </FormStateful>
      )

      const dayInput = wrapper.find('input[type="number"]').at(0)
      const monthInput = wrapper.find('input[type="number"]').at(1)
      const yearInput = wrapper.find('input[type="number"]').at(2)

      dayInput.simulate('change', { target: { value: '01' } })
      monthInput.simulate('change', { target: { value: '25' } })
      yearInput.simulate('change', { target: { value: '2019' } })
    })

    test('should update the day value', () => {
      const dayInput = wrapper.find('input[type="number"]').at(0)
      expect(dayInput.prop('value')).toEqual('01')
    })

    test('should update the month value', () => {
      const monthInput = wrapper.find('input[type="number"]').at(1)
      expect(monthInput.prop('value')).toEqual('25')
    })

    test('should update year value', () => {
      const yearInput = wrapper.find('input[type="number"]').at(2)
      expect(yearInput.prop('value')).toEqual('2019')
    })

    test('should update value in form state', () => {
      const values = wrapper.find('#values')
      const date = JSON.parse(values.text())
      expect(date).toEqual({
        day: '01',
        month: '25',
        year: '2019',
      })
    })
  })

  describe('when the date format is short', () => {
    describe('when the date is mounted', () => {
      beforeAll(() => {
        wrapper = mount(
          <FormStateful>
            <FieldDate name="date" format="short" />
          </FormStateful>
        )
      })

      test('should contain 2 inputs', () => {
        const input = wrapper.find('input[type="number"]')
        expect(input.length).toEqual(2)
      })

      test('should set the default attributes on the "month" input', () => {
        const dayInput = wrapper.find('input[type="number"]').at(0)
        assertDefaultAttributes(dayInput, 'month')
      })

      test('should set the default attributes on the "year" input', () => {
        const dayInput = wrapper.find('input[type="number"]').at(1)
        assertDefaultAttributes(dayInput, 'year')
      })
    })

    describe('when the date labels are user defined', () => {
      beforeAll(() => {
        wrapper = mount(
          <FormStateful>
            <FieldDate
              name="date"
              format="short"
              labels={{ month: 'MM', year: 'YYYY' }}
            />
          </FormStateful>
        )
      })

      test('should render the month label', () => {
        const label = wrapper.find(Label).at(0)
        expect(label.text()).toEqual('MM')
      })

      test('should render the year label', () => {
        const label = wrapper.find(Label).at(1)
        expect(label.text()).toEqual('YYYY')
      })
    })

    describe('when custom validation passes', () => {
      beforeAll(() => {
        wrapper = mount(
          <FormStateful>
            <FieldDate
              format="short"
              name="date"
              // eslint-disable-next-line no-unused-vars
              validate={(date) => {
                // Validate the date by returning null
                return null
              }}
            />
          </FormStateful>
        )
        wrapper.find('form').simulate('submit')
      })

      test('should not render an error message', () => {
        expect(wrapper.find(ErrorText).exists()).toBe(false)
      })
    })

    describe('when custom validation fails', () => {
      beforeAll(() => {
        wrapper = mount(
          <FormStateful>
            <FieldDate
              format="short"
              name="date"
              // eslint-disable-next-line no-unused-vars
              validate={(date) => {
                // Invalidate the date by returning an error String
                return 'Enter a valid date (custom)'
              }}
            />
          </FormStateful>
        )
        wrapper.find('form').simulate('submit')
      })

      test('should render an error message', () => {
        expect(wrapper.find(ErrorText).text()).toEqual(
          'Enter a valid date (custom)'
        )
      })

      test('should render error styles', () => {
        const inputWrapper = wrapper
          .find(FieldWrapper)
          .find('div')
          .at(1)
        expect(inputWrapper).toHaveStyleRule('border-left', '4px solid #b10e1e')
        expect(inputWrapper).toHaveStyleRule('margin-right', '15px')
        expect(inputWrapper).toHaveStyleRule('padding-left', '10px')
      })
    })

    describe('when default validation fails', () => {
      beforeAll(() => {
        wrapper = mount(
          <FormStateful>
            <FieldDate name="date" format="short" />
          </FormStateful>
        )

        const monthInput = wrapper.find('input[type="number"]').at(0)
        const yearInput = wrapper.find('input[type="number"]').at(1)

        monthInput.simulate('change', { target: { value: '13' } })
        yearInput.simulate('change', { target: { value: '2019' } })

        wrapper.find('form').simulate('submit')
      })

      test('should render an error message', () => {
        expect(wrapper.find(ErrorText).text()).toEqual('Enter a valid date')
      })
    })

    describe('when Month and Year is typed into the date fields', () => {
      beforeAll(() => {
        wrapper = mount(
          <FormStateful>
            {(state) => (
              <>
                <FieldDate name="date" format="short" />
                <div id="values">{JSON.stringify(state.values.date)}</div>
              </>
            )}
          </FormStateful>
        )

        const monthInput = wrapper.find('input[type="number"]').at(0)
        const yearInput = wrapper.find('input[type="number"]').at(1)

        monthInput.simulate('change', { target: { value: '6' } })
        yearInput.simulate('change', { target: { value: '2019' } })
      })

      test('should update the month value', () => {
        const monthInput = wrapper.find('input[type="number"]').at(0)
        expect(monthInput.prop('value')).toEqual('6')
      })

      test('should update year value', () => {
        const yearInput = wrapper.find('input[type="number"]').at(1)
        expect(yearInput.prop('value')).toEqual('2019')
      })

      test('should update value in form state', () => {
        const values = wrapper.find('#values')
        const date = JSON.parse(values.text())
        expect(date).toEqual({
          month: '6',
          year: '2019',
        })
      })
    })

    describe('when default validation passes', () => {
      beforeAll(() => {
        wrapper = mount(
          <FormStateful>
            <FieldDate format="short" name="date" />
          </FormStateful>
        )

        const monthInput = wrapper.find('input[type="number"]').at(0)
        const yearInput = wrapper.find('input[type="number"]').at(1)

        monthInput.simulate('change', { target: { value: '09' } })
        yearInput.simulate('change', { target: { value: '2019' } })
        wrapper.find('form').simulate('submit')
      })

      test('should not render an error message', () => {
        expect(wrapper.find(ErrorText).exists()).toEqual(false)
      })
    })
  })
})

describe('normalising FieldDate value', () => {
  let fieldDate

  function setUpComponent(wrapper, long = true) {
    const dayInput = long && wrapper.find('input[type="number"]').at(0)
    const monthInput = wrapper.find('input[type="number"]').at(long ? 1 : 0)
    const yearInput = wrapper.find('input[type="number"]').at(long ? 2 : 1)
    return {
      day(value) {
        dayInput.simulate('change', { target: { value } })
      },
      month(value) {
        monthInput.simulate('change', { target: { value } })
      },
      year(value) {
        yearInput.simulate('change', { target: { value } })
      },
      submit() {
        wrapper.find('form').simulate('submit')
      },
      wrapper,
    }
  }
  describe('normalising long date formats', () => {
    beforeAll(() => {
      const wrapper = mount(
        <FormStateful>
          <FieldDate name="date" />
        </FormStateful>
      )
      fieldDate = setUpComponent(wrapper)
    })

    test('without leading 0 should not render an error message', () => {
      fieldDate.day('9')
      fieldDate.month('9')
      fieldDate.year('2019')
      fieldDate.submit()
      expect(fieldDate.wrapper.find(ErrorText).exists()).toEqual(false)
    })

    test('with leading 0 should not render an error message', () => {
      fieldDate.day('09')
      fieldDate.month('09')
      fieldDate.year('2019')
      fieldDate.submit()
      expect(fieldDate.wrapper.find(ErrorText).exists()).toEqual(false)
    })
  })

  describe('normalising short date formats', () => {
    beforeAll(() => {
      const wrapper = mount(
        <FormStateful>
          <FieldDate name="date" format="short" />
        </FormStateful>
      )
      fieldDate = setUpComponent(wrapper, false)
    })

    test('without leading 0 should not render an error message', () => {
      fieldDate.month('9')
      fieldDate.year('2019')
      fieldDate.submit()
      expect(fieldDate.wrapper.find(ErrorText).exists()).toEqual(false)
    })

    test('with leading 0 should not render an error message', () => {
      fieldDate.month('09')
      fieldDate.year('2019')
      fieldDate.submit()
      expect(fieldDate.wrapper.find(ErrorText).exists()).toEqual(false)
    })
  })
})
