export const SOURCE_TYPES = {
  external: 'externalDataSource',
}

export const ACTIVITY_TYPE = {
  CompaniesHouseAccount: ['dit:Accounts'],
  CompaniesHouseCompany: ['dit:Company'],
  HmrcExporter: ['dit:Export'],
  Interaction: ['dit:Interaction', 'dit:ServiceDelivery'],
  InvestmentProject: ['dit:InvestmentProject'],
  Omis: ['dit:OMISOrder'],
}

/**
 * To disable the Basic Activity Type filter, just return an empty array
 * ACTIVITY_TYPE_FILTERS = []
 */
export const ACTIVITY_TYPE_FILTERS = [
  {
    label: 'All Data Hub & external activity',
    value: 'all',
  },
  {
    label: 'My activity',
    value: ['my-activity'],
  },
  {
    label: 'All external activity',
    value: [].concat(
      ...[
        ACTIVITY_TYPE.CompaniesHouseAccount,
        ACTIVITY_TYPE.CompaniesHouseCompany,
        ACTIVITY_TYPE.HmrcExporter,
      ]
    ),
  },
  {
    label: 'All Data Hub activity',
    value: [].concat(
      ...[
        ACTIVITY_TYPE.Interaction,
        ACTIVITY_TYPE.InvestmentProject,
        ACTIVITY_TYPE.Omis,
      ]
    ),
  },
]

export default {
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_FILTERS,
  SOURCE_TYPES,
}
