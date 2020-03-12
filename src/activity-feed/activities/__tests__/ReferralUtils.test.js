import outstandingReferral from '../../__fixtures__/referrals/outstandingReferral'
import completeReferral from '../../__fixtures__/referrals/completeReferral.json'
import ReferralUtils from '../ReferralUtils'

describe('ReferralUtils.js', () => {
  describe('#getStatus', () => {
    describe('when the referral is completed', () => {
      test('should set the badge as "Completed referral"', () => {
        const status = ReferralUtils.getStatus(completeReferral)
        expect(status).toEqual({
          text: 'Completed referral',
          borderColour: '#006435',
        })
      })
    })
    describe('when the referral is outstanding', () => {
      test('should set the badge as "Outstanding referral"', () => {
        const status = ReferralUtils.getStatus(outstandingReferral)
        expect(status).toEqual({
          text: 'Outstanding referral',
          borderColour: '#1d70b8',
        })
      })
    })
  })
  describe('#transformReferral', () => {
    test('should transform', () => {
      const actual = ReferralUtils.transformReferral(completeReferral)
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
