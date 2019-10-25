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
  values: [
    {
      label: 'All Data Hub & external activity',
      value: 'all',
    },
    {
      label: 'My activity',
      value: 'dit:DataHubAdviser:8415301d-756b-4bf9-8826-cfdbf9e9a4e2',
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
  ],
  default: {
    label: 'All Data Hub activity',
    value: [].concat(
      ...[
        ACTIVITY_TYPE.Interaction,
        ACTIVITY_TYPE.InvestmentProject,
        ACTIVITY_TYPE.Omis,
      ]
    ),
  },
}

export default {
  ACTIVITY_TYPE,
  ACTIVITY_TYPE_FILTERS,
  SOURCE_TYPES,
}
