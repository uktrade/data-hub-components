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
          }
        })

        expect(actual).toEqual({
          badge: 'Cancelled interaction',
          isUpcoming: false,
          typeText: 'interaction',
        })
      })
    })

    describe('when the interaction is a draft and in the future', () => {
      test('should set the badge as "Upcoming interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:Interaction',
            'dit:status': 'draft',
            'startTime': moment().add(1, 'days').toISOString(),
          }
        })

        expect(actual).toEqual({
          badge: 'Upcoming interaction',
          isUpcoming: true,
          typeText: 'interaction',
        })
      })
    })

    describe('when the interaction is a draft and in the past', () => {
      test('should set the badge as "Upcoming interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:Interaction',
            'dit:status': 'draft',
            'startTime': moment().subtract(1, 'days').toISOString(),
          }
        })

        expect(actual).toEqual({
          badge: 'Incomplete interaction',
          isUpcoming: false,
          typeText: 'interaction',
        })
      })
    })

    describe('when the interaction is complete', () => {
      test('should set the badge as "Completed interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:Interaction',
            'dit:status': 'complete',
          }
        })

        expect(actual).toEqual({
          badge: 'Completed interaction',
          isUpcoming: false,
          typeText: 'interaction',
        })
      })
    })

    describe('when the service delivery is complete', () => {
      test('should set the badge as "Completed service delivery"', () => {
        const actual = InteractionUtils.transform({
          object: {
            type: 'dit:ServiceDelivery',
            'dit:status': 'complete',
          }
        })

        expect(actual).toEqual({
          badge: 'Completed service delivery',
          isUpcoming: false,
          typeText: 'service delivery',
        })
      })
    })
  })
})
