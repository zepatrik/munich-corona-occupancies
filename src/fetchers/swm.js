const fetch = require('node-fetch')
const swmMapping = require('../helpers/swm_mapping')

const fetcher = () => {
  const params = new URLSearchParams(
    Object.keys(swmMapping).map((k) => ['organizationUnitIds', k])
  )

  return fetch(
    `https://functions.api.ticos-systems.cloud/api/gates/counter?${params.toString()}`,
    {
      headers: {
        'Abp-TenantId': 69,
        'Abp.TenantId': 69
      }
    }
  )
    .then((resp) => resp.json())
    .then((data) =>
      data.map(({ personCount, maxPersonCount, organizationUnitId }) => ({
        count: personCount,
        maximum: maxPersonCount,
        percent: Math.round((personCount / maxPersonCount) * 100),
        swmId: organizationUnitId
      }))
    )
}
module.exports = fetcher
