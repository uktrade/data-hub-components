import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { RED } from 'govuk-colours'
import { padStart, parseInt } from 'lodash'

import useFormContext from '../core/useFormContext'

const DATE_FORMAT = 'YYYY-MM-DD'
const DAY = 'day'
const MONTH = 'month'
const YEAR = 'year'

const FieldDate = ({ name, label, validate }) => {
  const { setFieldValue } = useFormContext()
  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [day, setDay] = useState()
  const [errorDay, setErrorDay] = useState()
  const [errorMonth, setErrorMonth] = useState()
  const [errorYear, setErrorYear] = useState()

  const padZero = dayOrMonth => padStart(dayOrMonth, 2, '0')

  const isDay = () => (day >= 1 && day <= 31)
  const isMonth = () => (month >= 1 && month <= 12)
  const isYear = () => (year >= 1 && year <= 9999)

  const formatDate = () => {
    const date = moment(`${year}-${padZero(month)}-${padZero(day)}`, DATE_FORMAT, true)
    return date.isValid() ? date.format(DATE_FORMAT) : null
  }

  const getDate = () => {
    return {
      date: {
        day,
        month,
        year,
      },
      formattedDate: formatDate(),
    }
  }

  const validateDay = () => {
    const date = getDate()
    if (!isDay()) {
      date.error = DAY
    }
    setErrorDay(validate(date))
  }

  const validateMonth = () => {
    const date = getDate()
    if (!isMonth()) {
      date.error = MONTH
    }
    setErrorMonth(validate(date))
  }

  const validateYear = () => {
    const date = getDate()
    if (!isYear()) {
      date.error = YEAR
    }
    setErrorYear(validate(date))
  }

  useEffect(() => {
    setFieldValue(name, formatDate())
  }, [day, month, year])

  return (
    <fieldset>
      {label && <legend>{label}</legend>}
      <div>
        <label htmlFor="day">
          Day
          <input
            id="day"
            type="number"
            pattern="[0-9]*"
            onBlur={validateDay}
            onChange={e => setDay(parseInt(e.target.value))}
            style={errorDay ? { border: `solid 1px ${RED}` } : null}
          />
        </label>
        {errorDay && <small style={{ color: RED }}>{errorDay}</small>}
      </div>
      <div>
        <label htmlFor="month">
          Month
          <input
            id="month"
            type="number"
            pattern="[0-9]*"
            onBlur={validateMonth}
            onChange={e => setMonth(parseInt(e.target.value))}
            style={errorMonth ? { border: `solid 1px ${RED}` } : null}
          />
        </label>
        {errorMonth && <small style={{ color: RED }}>{errorMonth}</small>}
      </div>
      <div>
        <label htmlFor="year">
          Year
          <input
            id="year"
            type="number"
            pattern="[0-9]*"
            onBlur={validateYear}
            onChange={e => setYear(parseInt(e.target.value))}
            style={errorYear ? { border: `solid 1px ${RED}` } : null}
          />
        </label>
        {errorYear && <small style={{ color: RED }}>{errorYear}</small>}
      </div>
    </fieldset>
  )
}

FieldDate.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validate: PropTypes.func,
}

FieldDate.defaultProps = {
  label: null,
  validate: null,
}

export default FieldDate
