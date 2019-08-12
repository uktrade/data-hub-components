module.exports = [
  require('./companies_house/accounts_are_due'),
  require('./companies_house/incorporated'),
  require('./hmrc/export_of_goods'),
  require('./interactions/interaction'),
  require('./interactions/investment_project'),
  require('./interactions/service_delivery'),
  require('./investment_projects/project_added_fdi'),
  require('./investment_projects/project_added_non_fdi'),
  require('./investment_projects/project_added_cti'),
  require('./omis/order_added'),
]
