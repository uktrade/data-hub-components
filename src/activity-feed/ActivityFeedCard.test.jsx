import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import { set } from 'lodash'

import ActivityFeedCard from './ActivityFeedCard'
import interactionActivityFixture from '../../fixtures/activity_feed/interactions/interaction'
import serviceDeliveryActivityFixture from '../../fixtures/activity_feed/interactions/service_delivery'
import investmentProjectsCTIFixture from '../../fixtures/activity_feed/investment_projects/project_added_cti'
import investmentProjectsFDIFixture from '../../fixtures/activity_feed/investment_projects/project_added_fdi'
import investmentProjectsNonFDIFixture from '../../fixtures/activity_feed/investment_projects/project_added_non_fdi'
import orderAddedFixture from '../../fixtures/activity_feed/omis/order_added'

import MockDate from 'mockdate'

// Lock the date so moment's relative date doesn't break our deterministic tests.
MockDate.set(1559750582706)

describe('ActivityFeedCard', () => {
  describe('when the interaction is empty', () => {
    test('should render null', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={{}}/>)
        .toJSON()
      expect(tree).toBeNull()
    })
  })

  describe('when there is an interaction', () => {
    test('should render interaction activity', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={interactionActivityFixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft in the past', () => {
    test('should render interaction activity with "Incomplete interaction" badge', () => {
      const fixture = { ...interactionActivityFixture };
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.startTime', moment().subtract(1, 'years').toISOString())
      const tree = renderer
        .create(<ActivityFeedCard activity={fixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft and upcoming', () => {
    test('should render interaction activity with "Upcoming interaction" badge', () => {
      const fixture = { ...interactionActivityFixture };
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.startTime', moment().add(1, 'days').toISOString())
      const tree = renderer
        .create(<ActivityFeedCard activity={fixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft and archived', () => {
    test('should render interaction activity with "Cancelled interaction" badge', () => {
      const fixture = { ...interactionActivityFixture };
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.dit:archived', true)
      const tree = renderer
        .create(<ActivityFeedCard activity={fixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is complete', () => {
    test('should render interaction activity with "Completed interaction" badge', () => {
      const fixture = { ...interactionActivityFixture };
      set(fixture, 'object.dit:status', 'complete')
      const tree = renderer
        .create(<ActivityFeedCard activity={fixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a service delivery', () => {
    test('should render service delivery activity', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={serviceDeliveryActivityFixture} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is an activity item of arbitrary type', () => {
    test('should render default activity', () => {
      const tree = renderer
        .create(<ActivityFeedCard activity={{
          object: {
            'dit:subject': 'subject',
          }
        }}/>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is an interaction without any people involved', () => {
    test('should render interaction activity without advisers nor contacts', () => {
      const interactionWithNoPeople = { ...interactionActivityFixture }
      set(interactionWithNoPeople,
        'object.attributedTo',
        interactionActivityFixture.object.attributedTo.filter(a => !a.type.includes('Person'))
      )

      const tree = renderer
        .create(<ActivityFeedCard activity={interactionWithNoPeople} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction does not have a service', () => {
    test('should render interaction activity without services', () => {
      const interactionWithoutService = { ...interactionActivityFixture }
      set(interactionWithoutService, 'object.dit:service', null)

      const tree = renderer
        .create(<ActivityFeedCard activity={interactionWithoutService} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when an investment project is CTI', () => {
    test('should render the CTI investment project activity card', () => {
      const commitmentToInvest = { ...investmentProjectsCTIFixture }
      const tree = renderer
        .create(<ActivityFeedCard activity={commitmentToInvest} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when an investment project is FDI', () => {
    test('should render the FDI investment project activity card', () => {
      const foreignDirectInvestment = { ...investmentProjectsFDIFixture }
      const tree = renderer
        .create(<ActivityFeedCard activity={foreignDirectInvestment} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when an investment project is Non-FDI', () => {
    test('should render the Non-FDI investment project activity card', () => {
      const nonForeignDirectInvestment = { ...investmentProjectsNonFDIFixture }
      const tree = renderer
        .create(<ActivityFeedCard activity={nonForeignDirectInvestment} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when a New OMIS order is added', () => {
    test('should render an activity card', () => {
      const orderAdded = { ...orderAddedFixture }
      const tree = renderer
        .create(<ActivityFeedCard activity={orderAdded} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})




