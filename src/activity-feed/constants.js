export const SOURCE_TYPES = {
  external: 'externalDataSource',
}

export const ACTIVITY_TYPE_FILTERS = [
  {
    label: 'All Data Hub & external activity',
    value: null,
  },
  {
    label: 'My activity',
    value: 'my-activity',
  },
  {
    label: 'All external activity',
    value: ['dit:Accounts', 'dit:Company', 'dit:Export'],
  },
  {
    label: 'All Data Hub activity',
    value: [
      'dit:Interaction',
      'dit:ServiceDelivery',
      'dit:InvestmentProject',
      'dit:OMISOrder',
    ],
  },
]

export const ACTIVITY_TYPE = {
  CompaniesHouseAccount: ['dit:Accounts'],
  CompaniesHouseCompany: ['dit:Company'],
  HmrcExporter: ['dit:Export'],
  Interaction: ['dit:Interaction', 'dit:ServiceDelivery'],
  InvestmentProject: ['dit:InvestmentProject'],
  Omis: ['dit:OMISOrder'],
}

export default {
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_FILTERS,
  SOURCE_TYPES,
}
