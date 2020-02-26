import CardUtils from '../CardUtils'
import completeReferral from '../../../__fixtures__/referrals/completeReferral'

describe('CardUtils.js', () => {
  describe('#canRenderByTypes', () => {
    describe('when the type exists', () => {
      test('should return true', () => {
        const actual = CardUtils.canRenderByTypes(
          {
            object: {
              type: ['Event', 'dit:Interaction'],
            },
          },
          ['dit:Interaction']
        )

        expect(actual).toBeTruthy()
      })
    })

    describe('when the type does not exist', () => {
      test('should return false', () => {
        const actual = CardUtils.canRenderByTypes(
          {
            object: {
              type: ['Event', 'dit:Interaction'],
            },
          },
          ['dit:InvestmentProject']
        )

        expect(actual).toBeFalsy()
      })
    })
  })

  describe('#transform', () => {
    test('should transform', () => {
      const actual = CardUtils.transform({
        object: {
          url: 'url',
          'dit:subject': 'subject',
          'dit:service': {
            name: 'service',
          },
          startTime: '2019-06-17T15:44:27.298Z',
        },
      })

      expect(actual).toEqual({
        url: 'url',
        subject: 'subject',
        service: 'service',
        startTime: '2019-06-17T15:44:27.298Z',
      })
    })
  })
  describe('#transformReferral', () => {
    test('should transform', () => {
      const actual = CardUtils.transformReferral(completeReferral)
      expect(actual).toEqual({
        id:
          'dit:DataHubCompanyReferral:74755dbd-c394-4c09-885b-1ca90ace5fcf:Announce',
        startTime: '2020-02-18T15:52:58.713189Z',
        subject: 'A complete referral',
        status: 'complete',
        sender: {
          name: 'Danny Scott',
          email: 'smithdonald@yahoo.com',
          team: 'Team 12',
        },
        recipient: {
          name: 'David Parry',
          email: 'richardsonlinda@baker.com',
          team: 'Team 11',
        },
        completedOn: '2020-01-27T06:34:16Z',
      })
    })
  })
})
