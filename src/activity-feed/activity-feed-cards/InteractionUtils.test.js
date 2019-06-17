import moment from 'moment'

import InteractionUtils from './InteractionUtils'

describe('InteractionUtils.js', () => {
  describe('#transform', () => {
    describe('when the interaction is a draft and archived', () => {
      test('should set the badge as "Cancelled interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            'dit:status': 'draft',
            'dit:archived': true,
          }
        })

        expect(actual).toEqual({
          badge: 'Cancelled interaction',
          isUpcoming: false,
        })
      })
    })

    describe('when the interaction is a draft and in the future', () => {
      test('should set the badge as "Upcoming interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            'dit:status': 'draft',
            'startTime': moment().add(1, 'days').toISOString(),
          }
        })

        expect(actual).toEqual({
          badge: 'Upcoming interaction',
          isUpcoming: true,
        })
      })
    })

    describe('when the interaction is a draft and in the past', () => {
      test('should set the badge as "Upcoming interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            'dit:status': 'draft',
            'startTime': moment().subtract(1, 'days').toISOString(),
          }
        })

        expect(actual).toEqual({
          badge: 'Incomplete interaction',
          isUpcoming: false,
        })
      })
    })

    describe('when the interaction is complete', () => {
      test('should set the badge as "Completed interaction"', () => {
        const actual = InteractionUtils.transform({
          object: {
            'dit:status': 'complete',
          }
        })

        expect(actual).toEqual({
          badge: 'Completed interaction',
          isUpcoming: false,
        })
      })
    })
  })
})
