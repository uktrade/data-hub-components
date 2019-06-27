import { RED, GREEN, BLUE } from 'govuk-colours'
import moment from 'moment'

import InteractionUtils from './InteractionUtils'

describe('InteractionUtils.js', () => {
  describe('#transform', () => {
    describe('when the interaction is a draft and archived', () => {
      test('should set the badge as "Cancelled interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:Interaction',
            'dit:status': 'draft',
            'dit:archived': true,
          },
        })

        expect(actual).toEqual({
          typeText: 'interaction',
          isUpcoming: false,
          badge: {
            text: 'Cancelled interaction',
            borderColour: RED,
          },
        })
      })
    })

    describe('when the interaction is a draft and in the future', () => {
      test('should set the badge as "Upcoming interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:Interaction',
            'dit:status': 'draft',
            startTime: moment().add(1, 'days').toISOString(),
          },
        })

        expect(actual).toEqual({
          typeText: 'interaction',
          isUpcoming: true,
          badge: {
            text: 'Upcoming interaction',
            borderColour: BLUE,
          },
        })
      })
    })

    describe('when the interaction is a draft and in the past', () => {
      test('should set the badge as "Upcoming interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:Interaction',
            'dit:status': 'draft',
            startTime: moment().subtract(1, 'days').toISOString(),
          },
        })

        expect(actual).toEqual({
          typeText: 'interaction',
          isUpcoming: false,
          badge: {
            text: 'Incomplete interaction',
            borderColour: BLUE,
          },
        })
      })
    })

    describe('when the interaction is complete', () => {
      test('should set the badge as "Completed interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:Interaction',
            'dit:status': 'complete',
          },
        })

        expect(actual).toEqual({
          typeText: 'interaction',
          isUpcoming: false,
          badge: {
            text: 'Interaction',
            borderColour: GREEN,
          },
        })
      })
    })

    describe('when the service delivery is complete', () => {
      test('should set the badge as "Completed service delivery"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:ServiceDelivery',
            'dit:status': 'complete',
          },
        })

        expect(actual).toEqual({
          typeText: 'service delivery',
          isUpcoming: false,
          badge: {
            text: 'Service delivery',
            borderColour: GREEN,
          },
        })
      })
    })
  })
})
