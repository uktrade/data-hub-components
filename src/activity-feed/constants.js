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

export const ACTIVITY_TYPE_FILTERS = {
  allActivity: {
    label: 'All Data Hub & external activity',
    value: 'all',
  },
  myActivity: {
    label: 'My activity',
    value: 'my-activity',
  },
  externalActivity: {
    label: 'All external activity',
    value: 'external-activity',
  },
  dataHubActivity: {
    label: 'All Data Hub activity',
    value: 'datahub-activity',
  },
}

export default {
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_FILTERS,
  SOURCE_TYPES,
}
