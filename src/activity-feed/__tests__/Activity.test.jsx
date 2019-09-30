import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import { set } from 'lodash'
import MockDate from 'mockdate'

import Activity from '../Activity'

import companiesHouseAccountsDueFixture from '../__fixtures__/companies_house/accounts_are_due'
import companiesHouseCompaniesFixture from '../__fixtures__/companies_house/incorporated'
import hmrcExportersFixture from '../__fixtures__/hmrc/export_of_goods'
import interactionActivityFixture from '../__fixtures__/interactions/interaction'
import serviceDeliveryActivityFixture from '../__fixtures__/interactions/service_delivery'
import investmentProjectsCTIFixture from '../__fixtures__/investment_projects/project_added_cti'
import investmentProjectsFDIFixture from '../__fixtures__/investment_projects/project_added_fdi'
import investmentProjectsNonFDIFixture from '../__fixtures__/investment_projects/project_added_non_fdi'
import orderAddedFixture from '../__fixtures__/omis/order_added'

// Lock the date so moment's relative date doesn't break our deterministic tests.
MockDate.set(1559750582706)

describe('Activity', () => {
  describe('when the interaction is empty', () => {
    test('should render null', () => {
      const tree = renderer
        .create(<Activity activity={{}} showDetails={false} />)
        .toJSON()
      expect(tree).toBeNull()
    })
  })

  describe('when there is an interaction', () => {
    test('should render interaction activity', () => {
      const tree = renderer
        .create(<Activity activity={interactionActivityFixture} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft in the past', () => {
    test('should render interaction activity with "Incomplete interaction" badge', () => {
      const fixture = { ...interactionActivityFixture }
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.startTime', moment().subtract(1, 'years').toISOString())
      const tree = renderer
        .create(<Activity activity={fixture} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft and upcoming', () => {
    test('should render interaction activity with "Upcoming interaction" badge', () => {
      const fixture = { ...interactionActivityFixture }
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.startTime', moment().add(1, 'days').toISOString())
      const tree = renderer
        .create(<Activity activity={fixture} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is a draft and archived', () => {
    test('should render interaction activity with "Cancelled interaction" badge', () => {
      const fixture = { ...interactionActivityFixture }
      set(fixture, 'object.dit:status', 'draft')
      set(fixture, 'object.dit:archived', true)
      const tree = renderer
        .create(<Activity activity={fixture} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction is complete', () => {
    test('should render interaction activity with "Completed interaction" badge', () => {
      const fixture = { ...interactionActivityFixture }
      set(fixture, 'object.dit:status', 'complete')
      const tree = renderer
        .create(<Activity activity={fixture} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a service delivery', () => {
    test('should render service delivery activity', () => {
      const tree = renderer
        .create(<Activity activity={serviceDeliveryActivityFixture} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is an activity item of unknown type', () => {
    test('should not render an activity card', () => {
      const activity = {
        object: {
          'dit:subject': 'subject',
        },
      }
      const tree = renderer
        .create(<Activity activity={activity} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is an interaction without any people involved', () => {
    test('should render interaction activity without advisers nor contacts', () => {
      const interactionWithNoPeople = { ...interactionActivityFixture }
      set(interactionWithNoPeople,
        'object.attributedTo',
        interactionActivityFixture.object.attributedTo.filter(a => !a.type.includes('Person')))

      const tree = renderer
        .create(<Activity activity={interactionWithNoPeople} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when the interaction does not have a service', () => {
    test('should render interaction activity without services', () => {
      const interactionWithoutService = { ...interactionActivityFixture }
      set(interactionWithoutService, 'object.dit:service', null)

      const tree = renderer
        .create(<Activity activity={interactionWithoutService} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when an investment project is CTI', () => {
    test('should render the CTI investment project activity card', () => {
      const commitmentToInvest = { ...investmentProjectsCTIFixture }
      const tree = renderer
        .create(<Activity activity={commitmentToInvest} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when an investment project is FDI', () => {
    test('should render the FDI investment project activity card', () => {
      const foreignDirectInvestment = { ...investmentProjectsFDIFixture }
      const tree = renderer
        .create(<Activity activity={foreignDirectInvestment} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when an investment project is Non-FDI', () => {
    test('should render the Non-FDI investment project activity card', () => {
      const nonForeignDirectInvestment = { ...investmentProjectsNonFDIFixture }
      const tree = renderer
        .create(<Activity activity={nonForeignDirectInvestment} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when a New OMIS order is added', () => {
    test('should render an activity card', () => {
      const orderAdded = { ...orderAddedFixture }
      const tree = renderer
        .create(<Activity activity={orderAdded} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a Companies House Accounts record', () => {
    test('should render an activity card', () => {
      const companiesHouseAccountsDue = { ...companiesHouseAccountsDueFixture }
      const tree = renderer
        .create(<Activity activity={companiesHouseAccountsDue} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a Companies House Company incorporation record', () => {
    test('should render an activity card', () => {
      const companiesHouseCompanyIncorporated = { ...companiesHouseCompaniesFixture }
      const tree = renderer
        .create(<Activity
          activity={companiesHouseCompanyIncorporated}
          showDetails={false}
        />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when there is a HMRC Exporter record', () => {
    test('should render an activity card', () => {
      const tree = renderer
        .create(<Activity activity={hmrcExportersFixture} showDetails={false} />)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
