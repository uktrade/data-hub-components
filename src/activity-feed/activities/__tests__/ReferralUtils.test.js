import completeReferral from '../../__fixtures__/referrals/completeReferral'
import outstandingReferral from '../../__fixtures__/referrals/outstandingReferral'

import ReferralUtils from '../ReferralUtils'

describe('referralUtils.js', () => {
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
          borderColour: '#005ea5',
        })
      })
    })
  })
})
