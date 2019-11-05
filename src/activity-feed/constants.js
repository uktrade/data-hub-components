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
    value: [
      ...ACTIVITY_TYPE.CompaniesHouseAccount,
      ...ACTIVITY_TYPE.CompaniesHouseCompany,
      ...ACTIVITY_TYPE.HmrcExporter,
      ...ACTIVITY_TYPE.Interaction,
      ...ACTIVITY_TYPE.InvestmentProject,
      ...ACTIVITY_TYPE.Omis,
    ],
  },
  myActivity: {
    label: 'My activity',
    value: 'dit:DataHubAdviser:123-456',
  },
  externalActivity: {
    label: 'All external activity',
    value: [
      ...ACTIVITY_TYPE.CompaniesHouseAccount,
      ...ACTIVITY_TYPE.CompaniesHouseCompany,
      ...ACTIVITY_TYPE.HmrcExporter,
    ],
  },
  dataHubActivity: {
    label: 'All Data Hub activity',
    value: [
      ...ACTIVITY_TYPE.Interaction,
      ...ACTIVITY_TYPE.InvestmentProject,
      ...ACTIVITY_TYPE.Omis,
    ],
  },
}

export default {
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_FILTERS,
  SOURCE_TYPES,
}
